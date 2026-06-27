import type { NextApiRequest, NextApiResponse } from "next";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { getWritablePath } from "@/lib/db-fallback";
import fs from "fs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email } = req.body;

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ message: "Please provide a valid email address" });
  }

  const subscriberData = {
    email,
    created_at: new Date().toISOString(),
  };

  try {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from("subscribers").insert([subscriberData]);
      if (error) throw error;
      return res.status(200).json({ success: true, message: "Email subscribed to newsletter" });
    } else {
      // Fallback: append to local file
      const filePath = getWritablePath("subscribers.json");
      let subscribers = [];
      if (fs.existsSync(filePath)) {
        try {
          const fileData = fs.readFileSync(filePath, "utf-8");
          subscribers = JSON.parse(fileData);
        } catch {
          subscribers = [];
        }
      }
      // Check if already subscribed
      if (!subscribers.some((sub: { email: string }) => sub.email === email)) {
        subscribers.push(subscriberData);
        fs.writeFileSync(filePath, JSON.stringify(subscribers, null, 2));
      }
      return res.status(200).json({
        success: true,
        message: "Email subscribed successfully (local fallback)",
      });
    }
  } catch (error) {
    console.error("Newsletter API Error:", error);
    const errMessage = error instanceof Error ? error.message : "Failed to subscribe";
    return res.status(500).json({ message: errMessage });
  }
}
