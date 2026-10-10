import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { type Appointment, type Insight } from "@shared/schema";
import Parser from "rss-parser";
import { sendEmail } from "./mailer";
import { RateLimiter, limitByIp } from "./rateLimit";
import { escapeHtml, escapeIcsText, sanitizeIcsParam } from "./security";
import { INVALID_INPUT, SESSION_TYPES, appointmentSchema, assessmentSchema, subscribeSchema } from "./validation";

// Initialize RSS parser
const parser = new Parser();

// Cache for RSS feed (1 hour TTL)
let insightsCache: { data: Insight[], timestamp: number } | null = null;
const CACHE_TTL = 60 * 60 * 1000; // 1 hour in milliseconds

// Fallback mock data
const MOCK_INSIGHTS: Insight[] = [
  {
    id: "1",
    title: "Why Most Cloud Migrations Fail – and How to Fix It",
    url: "https://www.linkedin.com/in/chetangabhane",
    category: "Cloud Strategy"
  },
  {
    id: "2",
    title: "The Rise of AI Agents in Cloud Operations",
    url: "https://www.linkedin.com/in/chetangabhane",
    category: "AI Operations"
  },
  {
    id: "3",
    title: "Sovereign Cloud: Balancing Compliance and Innovation",
    url: "https://www.linkedin.com/in/chetangabhane",
    category: "Compliance"
  }
];

export async function registerRoutes(app: Express): Promise<Server> {
  // GET /api/health - Health check endpoint for Docker/Coolify
  app.get("/api/health", (_req, res) => {
    res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // GET /api/insights - Fetch latest insights from Substack RSS
  app.get("/api/insights", async (_req, res) => {
    try {
      // Check cache first
      if (insightsCache && Date.now() - insightsCache.timestamp < CACHE_TTL) {
        console.log("✓ Returning cached insights");
        return res.json(insightsCache.data);
      }

      // Fetch from Substack RSS feed
      const SUBSTACK_RSS_URL = "https://chetangabhane.substack.com/feed";
      console.log(`Fetching insights from Substack: ${SUBSTACK_RSS_URL}`);
      
      const feed = await parser.parseURL(SUBSTACK_RSS_URL);
      
      // Transform RSS items to Insight type (limit to 5 latest posts)
      const insights: Insight[] = feed.items.slice(0, 5).map((item, index) => ({
        id: item.guid || `insight-${index}`,
        title: item.title || "Untitled",
        url: item.link || "",
        pubDate: item.pubDate,
        excerpt: item.contentSnippet?.substring(0, 150) || "",
        category: item.categories?.[0] || undefined
      }));

      // If no insights found in Substack, cache and return mock data
      if (insights.length === 0) {
        console.log("⚠ Substack feed is empty, caching and returning fallback mock data");
        insightsCache = {
          data: MOCK_INSIGHTS,
          timestamp: Date.now()
        };
        return res.json(MOCK_INSIGHTS);
      }

      // Update cache with real insights
      insightsCache = {
        data: insights,
        timestamp: Date.now()
      };

      console.log(`✓ Successfully fetched ${insights.length} insights from Substack`);
      res.json(insights);
    } catch (error) {
      console.error("Error fetching Substack RSS feed:", error);
      console.log("⚠ Caching and returning fallback mock data");
      
      // Cache mock data as fallback to prevent repeated failed requests
      insightsCache = {
        data: MOCK_INSIGHTS,
        timestamp: Date.now()
      };
      
      res.json(MOCK_INSIGHTS);
    }
  });

  // Abuse limits for the public forms (in-memory; see server/rateLimit.ts).
  const subscribeByIp = new RateLimiter(LIMITS.formRequestsPerIp, FIFTEEN_MINUTES);
  const assessmentByIp = new RateLimiter(LIMITS.formRequestsPerIp, FIFTEEN_MINUTES);
  const appointmentByIp = new RateLimiter(LIMITS.formRequestsPerIp, FIFTEEN_MINUTES);
  const emailsPerRecipient = new RateLimiter(LIMITS.emailsPerRecipientPerDay, ONE_DAY);
  // Global cap, independent of client IP, so the owner's inbox cannot be flooded even
  // if per-IP limits are evaded. Over the cap the booking is still stored, only the
  // notification email is skipped.
  const ownerNotifications = new RateLimiter(LIMITS.ownerNotificationsPerHour, ONE_HOUR);

  // GET /api/subscribers and the /admin/subscribers page were removed: they exposed
  // the subscriber list to anyone. There is deliberately no replacement endpoint.

  // POST /api/subscribe - Add new subscriber
  app.post("/api/subscribe", limitByIp(subscribeByIp), async (req, res) => {
    const parsed = subscribeSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json(INVALID_INPUT);
    const { email, interests } = parsed.data;

    // Same response whether or not the address is already subscribed, so the form
    // cannot be used to check who is on the list.
    const genericSuccess = {
      success: true,
      message: "Thanks! If this address is new, a welcome email is on its way.",
    };

    try {
      if (await storage.getSubscriberByEmail(email)) return res.json(genericSuccess);
      await storage.createSubscriber({ email, interests });

      if (emailsPerRecipient.allow(email)) {
        const topics = interests.map((id) => INTEREST_LABELS[id]);
        await sendEmail(
          {
            from: "Chetan Gabhane <contact@chetangabhane.in>",
            to: email,
            subject: "Welcome to My Newsletter!",
            html: `
              <h2>Thank You for Subscribing!</h2>
              <p>Welcome to my newsletter where I share insights on:</p>
              <ul>
                ${topics.map((topic) => `<li>${escapeHtml(topic)}</li>`).join("")}
              </ul>
              <p>You'll receive updates directly in your inbox whenever I publish new content on these topics.</p>
              <p>Best regards,<br><strong>Chetan Gabhane</strong><br>Cloud & AI Evangelist<br><a href="mailto:contact@chetangabhane.in">contact@chetangabhane.in</a></p>
            `,
            text: `Thank you for subscribing!\n\nYou'll receive updates on: ${topics.join(", ")}.\n\nBest regards,\nChetan Gabhane\ncontact@chetangabhane.in`,
          },
          "newsletter welcome",
        );
      }

      res.json(genericSuccess);
    } catch (error) {
      console.error(`[subscribe] failed (${error instanceof Error ? error.name : "unknown error"})`);
      res.status(500).json({
        success: false,
        message: "Unable to process your subscription. Please try again later.",
      });
    }
  });

  // POST /api/assessments - Save assessment results and send email
  app.post("/api/assessments", limitByIp(assessmentByIp), async (req, res) => {
    const parsed = assessmentSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json(INVALID_INPUT);
    const { email, score, level } = parsed.data;

    try {
      const assessment = await storage.createAssessment({ email, score: JSON.stringify(score), level });
      const levelContent = SKILL_LEVEL_CONTENT[level];
      const percentage = Math.min(100, Math.round((score.total / 60) * 100));

      if (email && emailsPerRecipient.allow(email)) {
        await sendEmail(
          {
            from: "Chetan Gabhane <contact@chetangabhane.in>",
            to: email,
            subject: `Your CloudAI PathFinder Results: ${levelContent.title}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h1 style="color: #1e3a8a;">Your CloudAI PathFinder Results</h1>

                <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h2 style="margin-top: 0;">Your Score: ${percentage}%</h2>
                  <h3 style="color: #1e3a8a;">${escapeHtml(levelContent.title)}</h3>
                  <p>${escapeHtml(levelContent.description)}</p>
                </div>

                <h3>Your Skill Breakdown:</h3>
                <ul style="list-style: none; padding: 0;">
                  <li><strong>☁️ Cloud Fundamentals:</strong> ${score.cloud}/12</li>
                  <li><strong>🤖 AI/ML Basics:</strong> ${score.ai}/12</li>
                  <li><strong>⚙️ DevOps & Automation:</strong> ${score.devops}/12</li>
                  <li><strong>🛡️ Security & Compliance:</strong> ${score.security}/12</li>
                  <li><strong>🚀 Real-World Application:</strong> ${score.realworld}/12</li>
                </ul>

                <h3>Your Next Steps:</h3>
                <ol>
                  ${levelContent.nextSteps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}
                </ol>

                <div style="background-color: #e0f2fe; padding: 15px; border-radius: 8px; margin: 20px 0;">
                  <h4 style="margin-top: 0;">📚 Recommended Resources</h4>
                  <ul>
                    <li><a href="https://chetangabhane.substack.com">Subscribe to my Substack</a> for weekly insights</li>
                    <li>Check out my books on <a href="https://chetangabhane.in">Cloud & AI Strategy</a></li>
                    <li>Book a <a href="https://chetangabhane.in/press-kit">1-on-1 consulting session</a> for personalized guidance</li>
                  </ul>
                </div>

                <p>Keep building your skills, and feel free to retake the assessment as you progress!</p>

                <p>Best regards,<br>
                <strong>Chetan Gabhane</strong><br>
                Cloud & AI Evangelist<br>
                <a href="mailto:contact@chetangabhane.in">contact@chetangabhane.in</a></p>
              </div>
            `,
            text: [
              "Your CloudAI PathFinder Results",
              `Score: ${percentage}% - ${levelContent.title}`,
              levelContent.description,
              "",
              `Cloud Fundamentals: ${score.cloud}/12`,
              `AI/ML Basics: ${score.ai}/12`,
              `DevOps & Automation: ${score.devops}/12`,
              `Security & Compliance: ${score.security}/12`,
              `Real-World Application: ${score.realworld}/12`,
              "",
              "Next steps:",
              ...levelContent.nextSteps.map((step, i) => `${i + 1}. ${step}`),
              "",
              "Best regards,",
              "Chetan Gabhane",
              "contact@chetangabhane.in",
            ].join("\n"),
          },
          "assessment results",
        );
      }

      res.json({
        success: true,
        message: "Assessment results saved successfully!",
        assessmentId: assessment.id,
      });
    } catch (error) {
      console.error(`[assessments] failed (${error instanceof Error ? error.name : "unknown error"})`);
      res.status(500).json({
        success: false,
        message: "Unable to save your results. Please try again later.",
      });
    }
  });

  // POST /api/appointments - Create new appointment and send email notifications
  app.post("/api/appointments", limitByIp(appointmentByIp), async (req, res) => {
    const parsed = appointmentSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json(INVALID_INPUT);
    const data = parsed.data;

    try {
      const appointment = await storage.createAppointment(data);
      const sessionTypeDisplay = SESSION_TYPES[data.sessionType];
      const safe = {
        name: escapeHtml(data.name),
        email: escapeHtml(data.email),
        date: escapeHtml(data.date),
        time: escapeHtml(data.time),
        message: data.message ? escapeHtml(data.message).replace(/\r?\n/g, "<br>") : "",
      };

      // Notification to Chetan. Meeting links stay out of every automatic email;
      // they are shared manually when a session is confirmed.
      if (!ownerNotifications.allow("owner")) {
        console.warn("[email] appointment notification: skipped, hourly cap reached");
      } else await sendEmail(
        {
          from: "Knowledge Exchange <contact@chetangabhane.in>",
          to: "contact@chetangabhane.in",
          subject: `New ${sessionTypeDisplay} Request`,
          html: `
            <h2>New Knowledge Exchange Request</h2>
            <p>You have a new appointment request:</p>
            <ul>
              <li><strong>Name:</strong> ${safe.name}</li>
              <li><strong>Email:</strong> ${safe.email}</li>
              <li><strong>Session Type:</strong> ${sessionTypeDisplay}</li>
              <li><strong>Date:</strong> ${safe.date}</li>
              <li><strong>Time:</strong> ${safe.time}</li>
              ${safe.message ? `<li><strong>Message:</strong> ${safe.message}</li>` : ""}
            </ul>
            <p>Reply to confirm the session and share the meeting link.</p>
            <p>Appointment ID: ${appointment.id}</p>
          `,
          text: [
            "New Knowledge Exchange Request",
            `Name: ${data.name}`,
            `Email: ${data.email}`,
            `Session Type: ${sessionTypeDisplay}`,
            `Date: ${data.date}`,
            `Time: ${data.time}`,
            data.message ? `Message: ${data.message}` : "",
            "",
            `Appointment ID: ${appointment.id}`,
          ].join("\n"),
        },
        "appointment notification",
      );

      // Confirmation to the visitor: at most 3 per recipient per day, no meeting links,
      // and no visitor-supplied text (name or message), because the address is unverified
      // and the email must not carry content written by whoever submitted the form.
      if (emailsPerRecipient.allow(data.email)) {
        await sendEmail(
          {
            from: "Chetan Gabhane <contact@chetangabhane.in>",
            to: data.email,
            subject: "Your Knowledge Exchange Session Request Has Been Received",
            html: `
              <h2>Thank You for Your Request</h2>
              <p>Hello,</p>
              <p>Your request for a <strong>${sessionTypeDisplay}</strong> has been successfully received. I will review your request and get back to you within 24 hours to confirm the appointment details.</p>

              <h3>Your Booking Details:</h3>
              <ul>
                <li><strong>Session Type:</strong> ${sessionTypeDisplay}</li>
                <li><strong>Requested Date:</strong> ${safe.date}</li>
                <li><strong>Requested Time:</strong> ${safe.time}</li>
              </ul>

              <h3>Add to Your Calendar:</h3>
              <div style="margin: 20px 0;">
                <a href="https://chetangabhane.in/api/appointments/${appointment.id}/calendar"
                   style="display: inline-block; background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600;">
                  Download Calendar Invite (.ics)
                </a>
              </div>
              <p style="color: #666; font-size: 14px; margin-top: 10px;">
                Works with Google Calendar, Outlook, Apple Calendar, and more. Includes automatic 15-minute reminder!
              </p>

              <p><strong>Next step:</strong> once I confirm your session, I'll email you the meeting link.</p>

              <p>I look forward to our conversation about cloud transformation, AI innovation, and strategic technology leadership.</p>

              <p>Best regards,<br><strong>Chetan Gabhane</strong><br>Cloud & AI Evangelist<br><a href="mailto:contact@chetangabhane.in">contact@chetangabhane.in</a></p>
            `,
            text: [
              "Thank you for your request",
              "",
              "Hello,",
              `Your request for a ${sessionTypeDisplay} has been received. I will get back to you within 24 hours to confirm the details.`,
              "",
              `Requested date: ${data.date}`,
              `Requested time: ${data.time}`,
              "",
              `Calendar invite: https://chetangabhane.in/api/appointments/${appointment.id}/calendar`,
              "",
              "Once I confirm your session, I'll email you the meeting link.",
              "",
              "Best regards,",
              "Chetan Gabhane",
              "contact@chetangabhane.in",
            ].join("\n"),
          },
          "appointment confirmation",
        );
      }

      res.json({
        success: true,
        message: "Appointment request received! Check your email for confirmation.",
        appointmentId: appointment.id,
      });
    } catch (error) {
      console.error(`[appointments] failed (${error instanceof Error ? error.name : "unknown error"})`);
      res.status(500).json({
        success: false,
        message: "Unable to process your request. Please try again later.",
      });
    }
  });

  // GET /api/appointments/:id/calendar - Download .ics calendar file
  app.get("/api/appointments/:id/calendar", async (req, res) => {
    try {
      const appointment = await storage.getAppointmentById(req.params.id);
      if (!appointment) {
        return res.status(404).json({ success: false, message: "Appointment not found" });
      }

      const sessionTypeDisplay =
        SESSION_TYPES[appointment.sessionType as keyof typeof SESSION_TYPES] ?? "Knowledge Exchange Session";
      const icsContent = generateICalendar(appointment, sessionTypeDisplay);

      res.setHeader("Content-Type", "text/calendar; charset=utf-8");
      res.setHeader("Content-Disposition", `attachment; filename="knowledge-exchange-${appointment.id}.ics"`);
      res.send(icsContent);
    } catch (error) {
      console.error(`[calendar] failed (${error instanceof Error ? error.name : "unknown error"})`);
      res.status(500).json({ success: false, message: "Unable to generate calendar file" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

const FIFTEEN_MINUTES = 15 * 60 * 1000;
const ONE_HOUR = 60 * 60 * 1000;
const ONE_DAY = 24 * ONE_HOUR;

// Read when routes are registered; tests may raise a value before creating an app.
export const LIMITS = {
  formRequestsPerIp: 5, // per form, per 15 minutes
  emailsPerRecipientPerDay: 3,
  ownerNotificationsPerHour: 20,
};

const INTEREST_LABELS: Record<string, string> = {
  cloud: "Cloud Strategy",
  ai: "AI & Innovation",
  leadership: "Tech Leadership",
  compliance: "Compliance & Governance",
};

const SKILL_LEVEL_CONTENT: Record<
  "foundation" | "emerging" | "skilled" | "expert" | "leader",
  { title: string; description: string; nextSteps: string[] }
> = {
  foundation: {
    title: "Foundation Builder",
    description: "You're at the beginning of your Cloud/AI journey with room to grow.",
    nextSteps: [
      "Learn cloud fundamentals (AWS/Azure basics)",
      "Complete AI/ML intro courses",
      "Build 2-3 personal projects",
    ],
  },
  emerging: {
    title: "Emerging Professional",
    description: "You have foundational knowledge and are building practical skills.",
    nextSteps: [
      "Get cloud certification (AWS SAA, Azure AZ-104)",
      "Build production-ready AI project",
      "Contribute to open source",
    ],
  },
  skilled: {
    title: "Skilled Practitioner",
    description: "You have solid mid-level skills across cloud and AI technologies.",
    nextSteps: [
      "Specialize: AI Ops OR Cloud Architecture",
      "Lead a migration project",
      "Mentor junior engineers",
    ],
  },
  expert: {
    title: "Expert Architect",
    description: "You have senior-level expertise in cloud and AI systems.",
    nextSteps: [
      "Design enterprise architectures",
      "Drive AI strategy initiatives",
      "Speak at conferences",
    ],
  },
  leader: {
    title: "Industry Leader",
    description: "You're operating at the highest level with deep expertise.",
    nextSteps: [
      "CTO/VP Engineering track",
      "Independent consulting",
      "Thought leadership & writing",
    ],
  },
};

// Builds the .ics file. Every appointment value is escaped so it cannot add
// calendar properties; meeting links are not included.
export function generateICalendar(appointment: Appointment, sessionTypeDisplay: string): string {
  const dateObj = new Date(appointment.date);
  if (isNaN(dateObj.getTime())) throw new Error("Invalid date format");

  const timeMatch = appointment.time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!timeMatch) throw new Error("Invalid time format");

  let hours = parseInt(timeMatch[1]);
  const minutes = parseInt(timeMatch[2]);
  const period = timeMatch[3].toUpperCase();
  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;

  const startDate = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate(), hours, minutes);
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);
  const formatICalDate = (date: Date) => date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  const description = escapeIcsText(
    `Knowledge Exchange Session with Chetan Gabhane\n\nSession Type: ${sessionTypeDisplay}\n\n` +
      "The meeting link will be emailed when the session is confirmed.",
  );

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Chetan Gabhane//Knowledge Exchange//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:REQUEST",
    "BEGIN:VEVENT",
    `UID:${appointment.id}@chetangabhane.in`,
    `DTSTAMP:${formatICalDate(new Date())}`,
    `DTSTART:${formatICalDate(startDate)}`,
    `DTEND:${formatICalDate(endDate)}`,
    `SUMMARY:${escapeIcsText(`${sessionTypeDisplay} - Chetan Gabhane`)}`,
    `DESCRIPTION:${description}`,
    "LOCATION:Online (link sent on confirmation)",
    "ORGANIZER;CN=Chetan Gabhane:mailto:contact@chetangabhane.in",
    `ATTENDEE;CN=${sanitizeIcsParam(appointment.name)}:mailto:${sanitizeIcsParam(appointment.email)}`,
    "STATUS:TENTATIVE",
    "SEQUENCE:0",
    "BEGIN:VALARM",
    "TRIGGER:-PT15M",
    "ACTION:DISPLAY",
    "DESCRIPTION:Reminder: Meeting in 15 minutes",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}
