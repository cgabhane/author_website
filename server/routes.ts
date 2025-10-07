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

      // Try to send email notifications (non-blocking)
      if (resend) {
        try {
          // Send notification email to Chetan
          await resend.emails.send({
            from: "Knowledge Exchange <onboarding@resend.dev>",
            to: "genious.c123@gmail.com",
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

          // Send confirmation email to visitor
          await resend.emails.send({
            from: "Chetan Gabhane <onboarding@resend.dev>",
            to: validatedData.email,
            subject: "Knowledge Exchange Request Received",
            html: `
              <h2>Thank You for Your Interest</h2>
              <p>Dear ${validatedData.name},</p>
              <p>I've received your request for a <strong>${sessionTypeDisplay}</strong> and will be in touch shortly to confirm the details.</p>
              <h3>Requested Details:</h3>
              <ul>
                <li><strong>Session Type:</strong> ${sessionTypeDisplay}</li>
                <li><strong>Preferred Date:</strong> ${validatedData.date}</li>
                <li><strong>Preferred Time:</strong> ${validatedData.time}</li>
              </ul>
              ${validatedData.message ? `<p><strong>Your message:</strong> ${validatedData.message}</p>` : ""}
              <p>I look forward to our conversation about cloud transformation, AI innovation, and strategic technology leadership.</p>
              <p>Best regards,<br>Chetan Gabhane<br>Cloud & AI Evangelist</p>
            `,
          });
        } catch (emailError) {
          // Log email errors but don't fail the booking
          console.error("Email notification failed (booking still saved):", emailError);
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
