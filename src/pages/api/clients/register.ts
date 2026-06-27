import type { NextApiRequest, NextApiResponse } from "next";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { getWritablePath } from "@/lib/db-fallback";
import fs from "fs";
import nodemailer from "nodemailer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, name, company, phone, service } = req.body;

  if (!email || !name) {
    return res.status(400).json({ message: "Email and name are required" });
  }

  const clientData = {
    email,
    name,
    company: company || "",
    phone: phone || "",
    service: service || "",
    created_at: new Date().toISOString(),
  };

  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || `http://${req.headers.host}`;

    if (isSupabaseConfigured && supabase) {
      // 1. Check if client already exists in Supabase
      const { data: existingClient } = await supabase
        .from("clients")
        .select("id")
        .eq("email", email)
        .maybeSingle();

      if (!existingClient) {
        // Create client entry
        const { error: insertError } = await supabase.from("clients").insert([clientData]);
        if (insertError) throw insertError;
      }

      // 2. Trigger Supabase magic link email
      const { error: authError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${siteUrl}/client/dashboard`,
        },
      });

      if (authError) throw authError;

      return res.status(200).json({
        success: true,
        message: "Magic link sent to your email",
      });
    } else {
      // Local Mock Fallback Mode
      const clientsPath = getWritablePath("clients.json");
      let clients = [];
      if (fs.existsSync(clientsPath)) {
        try {
          clients = JSON.parse(fs.readFileSync(clientsPath, "utf-8"));
        } catch {
          clients = [];
        }
      }

      // Upsert local client
      const idx = clients.findIndex((c: { email: string }) => c.email === email);
      if (idx !== -1) {
        clients[idx] = { ...clients[idx], ...clientData };
      } else {
        clients.push(clientData);
      }
      fs.writeFileSync(clientsPath, JSON.stringify(clients, null, 2));

      // Generate a mock auth token
      const token = Buffer.from(`${email}:${Date.now()}`).toString("base64");
      const tokensPath = getWritablePath("auth_tokens.json");
      let tokens: Record<string, string> = {};
      if (fs.existsSync(tokensPath)) {
        try {
          tokens = JSON.parse(fs.readFileSync(tokensPath, "utf-8"));
        } catch {
          tokens = {};
        }
      }
      tokens[token] = email;
      fs.writeFileSync(tokensPath, JSON.stringify(tokens, null, 2));

      const magicLink = `${magicLinkUrl(siteUrl, token)}`;

      // SendGrid fallback or Mock log email
      const apiKey = process.env.SENDGRID_API_KEY;
      if (apiKey) {
        const transporter = nodemailer.createTransport({
          host: "smtp.sendgrid.net",
          port: 587,
          auth: {
            user: "apikey",
            pass: apiKey,
          },
        });

        await transporter.sendMail({
          from: `PSR ONE Portal <sandeepsunnycool7@gmail.com>`,
          to: email,
          subject: "Sign in to PSR ONE Portal",
          text: `Hello ${name},\n\nClick the link below to sign in to the PSR ONE Client Portal:\n\n${magicLink}\n\nThis link is valid for 24 hours.\n\nBest regards,\nPSR ONE Team`,
        });
      } else {
        // Log to mock logs file
        const logPath = getWritablePath("emails_sent_mock.log");
        const logContent = `
========================================
[MOCK MAGIC LINK EMAIL - ${new Date().toISOString()}]
----------------------------------------
TO: ${email}
SUBJECT: Sign in to PSR ONE Portal
BODY: Hello ${name},
Click the link below to sign in to the PSR ONE Client Portal:

${magicLink}
========================================
`;
        fs.appendFileSync(logPath, logContent, "utf-8");
      }

      return res.status(200).json({
        success: true,
        message: "Magic link generated (local fallback mode)",
        mockLink: magicLink, // Return magic link for easy testing without active email
      });
    }
  } catch (error) {
    console.error("Portal registration error:", error);
    const msg = error instanceof Error ? error.message : "Failed to register";
    return res.status(500).json({ message: msg });
  }
}

function magicLinkUrl(siteUrl: string, token: string) {
  return `${siteUrl}/api/clients/login?token=${token}`;
}
