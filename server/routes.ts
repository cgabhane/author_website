import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAppointmentSchema } from "@shared/schema";
import { Resend } from "resend";

// Initialize Resend only if API key is available
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function registerRoutes(app: Express): Promise<Server> {
  // GET /api/health - Health check endpoint for Docker/Coolify
  app.get("/api/health", (_req, res) => {
    res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
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
