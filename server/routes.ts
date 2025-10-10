import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAppointmentSchema, insertSubscriberSchema, insertAssessmentSchema, type Insight } from "@shared/schema";
import { Resend } from "resend";
import Parser from "rss-parser";

// Initialize Resend only if API key is available
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

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

  // POST /api/subscribe - Add new subscriber
  app.post("/api/subscribe", async (req, res) => {
    try {
      // Validate request body
      const validatedData = insertSubscriberSchema.parse(req.body);

      // Check if email already subscribed
      const existing = await storage.getSubscriberByEmail(validatedData.email);
      if (existing) {
        return res.status(400).json({
          success: false,
          message: "This email is already subscribed.",
        });
      }

      // Create subscriber in storage
      const subscriber = await storage.createSubscriber(validatedData);

      // Send welcome email
      if (resend) {
        try {
          await resend.emails.send({
            from: "Chetan Gabhane <contact@chetangabhane.in>",
            to: subscriber.email,
            subject: "Welcome to My Newsletter!",
            html: `
              <h2>Thank You for Subscribing!</h2>
              <p>Welcome to my newsletter where I share insights on:</p>
              <ul>
                ${subscriber.interests.map(interest => `<li>${interest}</li>`).join('')}
              </ul>
              <p>You'll receive updates directly in your inbox whenever I publish new content on these topics.</p>
              <p>Best regards,<br><strong>Chetan Gabhane</strong><br>Cloud & AI Evangelist<br><a href="mailto:contact@chetangabhane.in">contact@chetangabhane.in</a></p>
            `,
          });
          console.log(`✓ Welcome email sent to ${subscriber.email}`);
        } catch (emailError) {
          console.error(`✗ Failed to send welcome email to ${subscriber.email}:`, emailError);
        }
      }

      res.json({
        success: true,
        message: "Successfully subscribed! Check your email for confirmation.",
      });
    } catch (error: any) {
      console.error("Subscription error:", error);
      
      if (error.name === "ZodError") {
        return res.status(400).json({
          success: false,
          message: "Please check your input and try again.",
          errors: error.errors,
        });
      }

      if (error.message === "Email already subscribed") {
        return res.status(400).json({
          success: false,
          message: "This email is already subscribed.",
        });
      }

      res.status(500).json({
        success: false,
        message: "Unable to process your subscription. Please try again later.",
      });
    }
  });

  // GET /api/subscribers - Get all subscribers (for admin view)
  app.get("/api/subscribers", async (_req, res) => {
    try {
      const subscribers = await storage.getSubscribers();
      res.json(subscribers);
    } catch (error) {
      console.error("Error fetching subscribers:", error);
      res.status(500).json({
        success: false,
        message: "Unable to fetch subscribers.",
      });
    }
  });

  // POST /api/assessments - Save assessment results and send email
  app.post("/api/assessments", async (req, res) => {
    try {
      // Validate request body
      const validatedData = insertAssessmentSchema.parse(req.body);

      // Create assessment in storage
      const assessment = await storage.createAssessment(validatedData);

      // Parse score breakdown
      const scoreBreakdown = JSON.parse(validatedData.score);
      
      // Calculate percentage
      const percentage = Math.round((scoreBreakdown.total / 60) * 100);

      // Define skill levels for email content
      const skillLevelContent: { [key: string]: { title: string; description: string; nextSteps: string[] } } = {
        foundation: {
          title: "Foundation Builder",
          description: "You're at the beginning of your Cloud/AI journey with room to grow.",
          nextSteps: [
            "Learn cloud fundamentals (AWS/Azure basics)",
            "Complete AI/ML intro courses",
            "Build 2-3 personal projects"
          ]
        },
        emerging: {
          title: "Emerging Professional",
          description: "You have foundational knowledge and are building practical skills.",
          nextSteps: [
            "Get cloud certification (AWS SAA, Azure AZ-104)",
            "Build production-ready AI project",
            "Contribute to open source"
          ]
        },
        skilled: {
          title: "Skilled Practitioner",
          description: "You have solid mid-level skills across cloud and AI technologies.",
          nextSteps: [
            "Specialize: AI Ops OR Cloud Architecture",
            "Lead a migration project",
            "Mentor junior engineers"
          ]
        },
        expert: {
          title: "Expert Architect",
          description: "You have senior-level expertise in cloud and AI systems.",
          nextSteps: [
            "Design enterprise architectures",
            "Drive AI strategy initiatives",
            "Speak at conferences"
          ]
        },
        leader: {
          title: "Industry Leader",
          description: "You're operating at the highest level with deep expertise.",
          nextSteps: [
            "CTO/VP Engineering track",
            "Independent consulting",
            "Thought leadership & writing"
          ]
        }
      };

      const levelContent = skillLevelContent[validatedData.level];

      // Send results email if email is provided
      if (validatedData.email && resend) {
        try {
          await resend.emails.send({
            from: "Chetan Gabhane <contact@chetangabhane.in>",
            to: validatedData.email,
            subject: `Your CloudAI PathFinder Results: ${levelContent.title}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h1 style="color: #1e3a8a;">Your CloudAI PathFinder Results</h1>
                
                <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h2 style="margin-top: 0;">Your Score: ${percentage}%</h2>
                  <h3 style="color: #1e3a8a;">${levelContent.title}</h3>
                  <p>${levelContent.description}</p>
                </div>

                <h3>Your Skill Breakdown:</h3>
                <ul style="list-style: none; padding: 0;">
                  <li><strong>☁️ Cloud Fundamentals:</strong> ${scoreBreakdown.cloud}/12</li>
                  <li><strong>🤖 AI/ML Basics:</strong> ${scoreBreakdown.ai}/12</li>
                  <li><strong>⚙️ DevOps & Automation:</strong> ${scoreBreakdown.devops}/12</li>
                  <li><strong>🛡️ Security & Compliance:</strong> ${scoreBreakdown.security}/12</li>
                  <li><strong>🚀 Real-World Application:</strong> ${scoreBreakdown.realworld}/12</li>
                </ul>

                <h3>Your Next Steps:</h3>
                <ol>
                  ${levelContent.nextSteps.map(step => `<li>${step}</li>`).join('')}
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
          });
          console.log(`✓ Assessment results sent to ${validatedData.email}`);
        } catch (emailError) {
          console.error(`✗ Failed to send assessment results to ${validatedData.email}:`, emailError);
        }
      }

      res.json({
        success: true,
        message: "Assessment results saved successfully!",
        assessmentId: assessment.id,
      });
    } catch (error: any) {
      console.error("Assessment save error:", error);
      
      if (error.name === "ZodError") {
        return res.status(400).json({
          success: false,
          message: "Please check your input and try again.",
          errors: error.errors,
        });
      }

      res.status(500).json({
        success: false,
        message: "Unable to save your results. Please try again later.",
      });
    }
  });

  // POST /api/appointments - Create new appointment and send email notifications
  app.post("/api/appointments", async (req, res) => {
    try {
      // Validate request body
      const validatedData = insertAppointmentSchema.parse(req.body);

      // Create appointment in storage
      const appointment = await storage.createAppointment(validatedData);

      // Format session type for display
      const sessionTypeDisplay = {
        consulting: "Strategic Guidance Session",
        mentoring: "Mentoring Session",
        guidance: "Advisory Consultation"
      }[validatedData.sessionType];

      // Try to send email notifications (non-blocking, independent sends)
      if (resend) {
        // Send notification email to Chetan (independent of visitor email)
        try {
          await resend.emails.send({
            from: "Knowledge Exchange <contact@chetangabhane.in>",
            to: "contact@chetangabhane.in",
            subject: `New ${sessionTypeDisplay} Request`,
            html: `
              <h2>New Knowledge Exchange Request</h2>
              <p>You have a new appointment request:</p>
              <ul>
                <li><strong>Name:</strong> ${validatedData.name}</li>
                <li><strong>Email:</strong> ${validatedData.email}</li>
                <li><strong>Session Type:</strong> ${sessionTypeDisplay}</li>
                <li><strong>Date:</strong> ${validatedData.date}</li>
                <li><strong>Time:</strong> ${validatedData.time}</li>
                ${validatedData.message ? `<li><strong>Message:</strong> ${validatedData.message}</li>` : ""}
              </ul>
              <p>Appointment ID: ${appointment.id}</p>
            `,
          });
          console.log(`✓ Notification email sent to contact@chetangabhane.in for appointment ${appointment.id}`);
        } catch (notificationError) {
          console.error(`✗ Failed to send notification email to contact@chetangabhane.in:`, notificationError);
        }

        // Send confirmation email to visitor (independent of notification email)
        try {
          await resend.emails.send({
            from: "Chetan Gabhane <contact@chetangabhane.in>",
            to: validatedData.email,
            subject: "Your Knowledge Exchange Session Request Has Been Received",
            html: `
              <h2>Thank You for Your Request</h2>
              <p>Dear ${validatedData.name},</p>
              <p>Your request for a <strong>${sessionTypeDisplay}</strong> has been successfully received. I will review your request and get back to you within 24 hours to confirm the appointment details.</p>
              <h3>Your Booking Details:</h3>
              <ul>
                <li><strong>Session Type:</strong> ${sessionTypeDisplay}</li>
                <li><strong>Requested Date:</strong> ${validatedData.date}</li>
                <li><strong>Requested Time:</strong> ${validatedData.time}</li>
              </ul>
              ${validatedData.message ? `<p><strong>Your Message:</strong><br>${validatedData.message}</p>` : ""}
              <p>I look forward to our conversation about cloud transformation, AI innovation, and strategic technology leadership. You will receive a confirmation email with the meeting link once the appointment is confirmed.</p>
              <p>Best regards,<br><strong>Chetan Gabhane</strong><br>Cloud & AI Evangelist<br><a href="mailto:contact@chetangabhane.in">contact@chetangabhane.in</a></p>
            `,
          });
          console.log(`✓ Confirmation email sent to ${validatedData.email} for appointment ${appointment.id}`);
        } catch (confirmationError) {
          console.error(`✗ Failed to send confirmation email to ${validatedData.email}:`, confirmationError);
        }
      } else {
        console.warn("RESEND_API_KEY not configured - skipping email notifications");
      }

      res.json({
        success: true,
        message: "Appointment request received! Check your email for confirmation.",
        appointmentId: appointment.id,
      });
    } catch (error: any) {
      console.error("Appointment booking error:", error);
      
      if (error.name === "ZodError") {
        return res.status(400).json({
          success: false,
          message: "Please check your input and try again.",
          errors: error.errors,
        });
      }

      res.status(500).json({
        success: false,
        message: "Unable to process your request. Please try again later.",
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
