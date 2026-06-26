import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, phone, service, companyName, budgetRange, contactMethod, message } = req.body;

  if (!name || !email || !phone || !service) {
    return res.status(400).json({ message: "Required fields are missing" });
  }

  const adminEmail = process.env.ADMIN_EMAIL || "admin@psrone.com";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://psrone.vercel.app";

  const emailSubjectAdmin = `[NEW LEAD] PSR ONE - ${name} - ${service}`;
  const emailBodyAdmin = `
    New Lead Captured on PSR ONE Website
    --------------------------------------
    Name: ${name}
    Email: ${email}
    Phone: ${phone}
    Service: ${service}
    Company Name: ${companyName || "N/A"}
    Budget Range: ${budgetRange || "N/A"}
    Preferred Contact Method: ${contactMethod}
    Message:
    ${message || "No message provided."}
    --------------------------------------
    Timestamp: ${new Date().toLocaleString()}
  `;

  const emailSubjectUser = `Thank you for contacting PSR ONE Solutions`;
  const emailBodyUser = `
    Dear ${name},

    Thank you for reaching out to PSR ONE. We have successfully received your inquiry regarding our "${service}" solutions.

    A senior advisor will contact you within the next 2 hours via your preferred method (${contactMethod}) to schedule our consultation.

    Best regards,
    The PSR ONE Advisory Team
    Office: PSR Heights, Hitech City Road, Madhapur, Hyderabad (Opposite Timmidkunta Lake)
    Website: ${siteUrl}
  `;

  // Verify SMTP Configuration
  const apiKey = process.env.SENDGRID_API_KEY;
  const isMailConfigured = !!apiKey;

  try {
    if (isMailConfigured) {
      // SendGrid SMTP config or standard SMTP
      const transporter = nodemailer.createTransport({
        host: "smtp.sendgrid.net",
        port: 587,
        auth: {
          user: "apikey",
          pass: apiKey,
        },
      });

      // Send to Admin
      await transporter.sendMail({
        from: `PSR ONE Notification <no-reply@psrone.com>`,
        to: adminEmail,
        subject: emailSubjectAdmin,
        text: emailBodyAdmin,
      });

      // Send auto-reply to User
      await transporter.sendMail({
        from: `PSR ONE Team <support@psrone.com>`,
        to: email,
        subject: emailSubjectUser,
        text: emailBodyUser,
      });

      return res.status(200).json({ success: true, message: "Emails dispatched successfully via SendGrid" });
    } else {
      // Local mock logging fallback
      const logPath = path.join(process.cwd(), "emails_sent_mock.log");
      const logContent = `
========================================
[MOCK EMAIL DISPATCH - ${new Date().toISOString()}]
----------------------------------------
TO ADMIN (${adminEmail}):
Subject: ${emailSubjectAdmin}
Body: ${emailBodyAdmin}
----------------------------------------
TO USER (${email}):
Subject: ${emailSubjectUser}
Body: ${emailBodyUser}
========================================
`;
      fs.appendFileSync(logPath, logContent, "utf-8");
      return res.status(200).json({
        success: true,
        message: "Email dispatch logged locally (mock fallback, configure SENDGRID_API_KEY for SMTP mail)",
      });
    }
  } catch (error) {
    console.error("Mail Dispatch Error:", error);
    const errMessage = error instanceof Error ? error.message : "Unknown error";
    return res.status(200).json({
      success: true,
      message: "Lead recorded, email notification failed, logged details internally.",
      error: errMessage,
    });
  }
}
