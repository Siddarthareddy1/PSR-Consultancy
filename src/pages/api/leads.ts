import type { NextApiRequest, NextApiResponse } from "next";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { getWritablePath } from "@/lib/db-fallback";
import fs from "fs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { name, email, phone, service, companyName, budgetRange, contactMethod, message } = req.body;

    if (!name || !email || !phone || !service) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const leadId = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    const leadData = {
      id: leadId,
      name,
      email,
      phone,
      service,
      company_name: companyName || "",
      budget_range: budgetRange || "",
      contact_method: contactMethod || "phone",
      message: message || "",
      status: "New",
      created_at: new Date().toISOString(),
    };

    try {
      if (isSupabaseConfigured && supabase) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...supabaseData } = leadData;
        const { error } = await supabase.from("leads").insert([supabaseData]);
        if (error) throw error;
        return res.status(200).json({ success: true, message: "Lead captured to Supabase" });
      } else {
        // Fallback: append to local file
        const filePath = getWritablePath("leads_captured.json");
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

  // Admin authentication required for PUT and DELETE
  const passcode = req.headers["x-admin-passcode"];
  if (passcode !== "PSRadmin2026") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.method === "PUT") {
    const { id, status, admin_notes } = req.body;
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    try {
      const updateData: Record<string, unknown> = {};
      if (status) updateData.status = status;
      if (admin_notes !== undefined) updateData.admin_notes = admin_notes;
      updateData.updated_at = new Date().toISOString();

      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase
          .from("leads")
          .update(updateData)
          .eq("id", id);
        if (error) throw error;
        return res.status(200).json({ success: true, message: "Lead updated in Supabase" });
      } else {
        const filePath = getWritablePath("leads_captured.json");
        if (fs.existsSync(filePath)) {
          const fileData = fs.readFileSync(filePath, "utf-8");
          const leads = JSON.parse(fileData);
          const index = leads.findIndex((l: { id: string }) => String(l.id) === String(id));
          if (index !== -1) {
            if (status) leads[index].status = status;
            if (admin_notes !== undefined) leads[index].admin_notes = admin_notes;
            leads[index].updated_at = new Date().toISOString();
            fs.writeFileSync(filePath, JSON.stringify(leads, null, 2));
            return res.status(200).json({ success: true, message: "Lead updated locally" });
          }
        }
        return res.status(404).json({ message: "Lead not found" });
      }
    } catch (error) {
      console.error("Leads API PUT Error:", error);
      return res.status(500).json({ message: "Failed to update lead" });
    }
  }

  if (req.method === "DELETE") {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    try {
      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase
          .from("leads")
          .delete()
          .eq("id", id);
        if (error) throw error;
        return res.status(200).json({ success: true, message: "Lead deleted from Supabase" });
      } else {
        const filePath = getWritablePath("leads_captured.json");
        if (fs.existsSync(filePath)) {
          const fileData = fs.readFileSync(filePath, "utf-8");
          const leads = JSON.parse(fileData);
          const updatedLeads = leads.filter((l: { id: string }) => String(l.id) !== String(id));
          fs.writeFileSync(filePath, JSON.stringify(updatedLeads, null, 2));
          return res.status(200).json({ success: true, message: "Lead deleted locally" });
        }
        return res.status(404).json({ message: "Lead file not found" });
      }
    } catch (error) {
      console.error("Leads API DELETE Error:", error);
      return res.status(500).json({ message: "Failed to delete lead" });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
