import type { NextApiRequest, NextApiResponse } from "next";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { getWritablePath } from "@/lib/db-fallback";
import fs from "fs";

const DEFAULT_SETTINGS = {
  phone: "+91 9110326887",
  email: "sandeepsunnycool7@gmail.com",
  address: "3rd Floor, PSR Heights, Near Hitech City Junction, Hitech City Road, Madhapur, Hyderabad, Telangana, 500081 (Opposite Timmidkunta Lake)",
  hours: "Open 24 Hours",
  instagram: "https://www.instagram.com/psrconsultancy_hyderabad",
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const filePath = getWritablePath("site_settings.json");

  if (req.method === "GET") {
    try {
      if (isSupabaseConfigured && supabase) {
        // Try fetching from Supabase site_settings table
        const { data, error } = await supabase
          .from("site_settings")
          .select("*")
          .eq("id", 1)
          .maybeSingle();
        
        const isMailConfigured = !!process.env.SENDGRID_API_KEY;
        if (!error && data) {
          return res.status(200).json({
            phone: data.phone,
            email: data.email,
            address: data.address,
            hours: data.hours,
            instagram: data.instagram,
            isDatabaseConnected: true,
            isMailConfigured,
          });
        }
        // If table doesn't exist or is empty, we fall back
        console.warn("Supabase site_settings fetch error or empty, trying local file fallback:", error);
      }

      const isMailConfigured = !!process.env.SENDGRID_API_KEY;

      // Local file fallback
      if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, "utf-8");
        const parsed = JSON.parse(fileData);
        return res.status(200).json({
          ...parsed,
          isDatabaseConnected: isSupabaseConfigured,
          isMailConfigured,
        });
      }

      // Default fallback
      return res.status(200).json({
        ...DEFAULT_SETTINGS,
        isDatabaseConnected: isSupabaseConfigured,
        isMailConfigured,
      });
    } catch (err) {
      console.error("Settings GET error:", err);
      return res.status(200).json(DEFAULT_SETTINGS);
    }
  } else if (req.method === "POST") {
    // Authenticate
    const passcode = req.headers["x-admin-passcode"];
    if (passcode !== "PSRadmin2026") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { phone, email, address, hours, instagram } = req.body;
    if (!phone || !email || !address || !hours || !instagram) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newSettings = { phone, email, address, hours, instagram };

    try {
      if (isSupabaseConfigured && supabase) {
        // Try upserting in Supabase
        const { error } = await supabase
          .from("site_settings")
          .upsert([{ id: 1, ...newSettings }]);
        
        if (!error) {
          return res.status(200).json({ success: true, message: "Settings saved to Supabase" });
        }
        console.warn("Supabase site_settings upsert error, falling back to local file:", error);
      }

      // Local file fallback
      fs.writeFileSync(filePath, JSON.stringify(newSettings, null, 2));
      return res.status(200).json({ success: true, message: "Settings saved locally" });
    } catch (err) {
      console.error("Settings POST error:", err);
      return res.status(500).json({ message: "Failed to save settings" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
