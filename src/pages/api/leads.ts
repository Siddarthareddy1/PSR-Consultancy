import type { NextApiRequest, NextApiResponse } from "next";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
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

  const leadData = {
    name,
    email,
    phone,
    service,
    company_name: companyName || "",
    budget_range: budgetRange || "",
    contact_method: contactMethod || "phone",
    message: message || "",
    created_at: new Date().toISOString(),
  };

  try {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from("leads").insert([leadData]);
      if (error) throw error;
      return res.status(200).json({ success: true, message: "Lead captured to Supabase" });
    } else {
      // Fallback: append to local file
      const filePath = path.join(process.cwd(), "leads_captured.json");
      let leads = [];
      if (fs.existsSync(filePath)) {
        try {
          const fileData = fs.readFileSync(filePath, "utf-8");
          leads = JSON.parse(fileData);
        } catch {
          leads = [];
        }
      }
      leads.push(leadData);
      fs.writeFileSync(filePath, JSON.stringify(leads, null, 2));
      return res.status(200).json({
        success: true,
        message: "Lead captured successfully (local fallback)",
      });
    }
  } catch (error) {
    console.error("Leads API Error:", error);
    const errMessage = error instanceof Error ? error.message : "Failed to save lead";
    return res.status(500).json({ message: errMessage });
  }
}
