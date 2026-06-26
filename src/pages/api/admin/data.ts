import type { NextApiRequest, NextApiResponse } from "next";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import fs from "fs";
import path from "path";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Authenticate
  const passcode = req.headers["x-admin-passcode"];
  if (passcode !== "PSRadmin2026") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    let leads = [];
    let subscribers = [];

    if (isSupabaseConfigured && supabase) {
      // Fetch leads from Supabase
      const { data: leadsData, error: leadsError } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (leadsError) {
        console.error("Error fetching leads from Supabase:", leadsError);
      } else {
        leads = leadsData || [];
      }

      // Fetch subscribers from Supabase
      const { data: subsData, error: subsError } = await supabase
        .from("subscribers")
        .select("*")
        .order("created_at", { ascending: false });

      if (subsError) {
        console.error("Error fetching subscribers from Supabase:", subsError);
      } else {
        subscribers = subsData || [];
      }
    } else {
      // Fallback: read from local files
      const leadsFilePath = path.join(process.cwd(), "leads_captured.json");
      if (fs.existsSync(leadsFilePath)) {
        try {
          const fileContent = fs.readFileSync(leadsFilePath, "utf-8");
          leads = JSON.parse(fileContent);
        } catch {
          leads = [];
        }
      }

      const subsFilePath = path.join(process.cwd(), "subscribers.json");
      if (fs.existsSync(subsFilePath)) {
        try {
          const fileContent = fs.readFileSync(subsFilePath, "utf-8");
          subscribers = JSON.parse(fileContent);
        } catch {
          subscribers = [];
        }
      }
    }

    return res.status(200).json({
      success: true,
      leads,
      subscribers,
    });
  } catch (error) {
    console.error("Admin dashboard data API error:", error);
    const errMessage = error instanceof Error ? error.message : "Internal server error";
    return res.status(500).json({ message: errMessage });
  }
}
