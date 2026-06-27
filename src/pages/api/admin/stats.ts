import type { NextApiRequest, NextApiResponse } from "next";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { getWritablePath } from "@/lib/db-fallback";
import fs from "fs";

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
    const stats = {
      totalLeads: 0,
      leadsThisMonth: 0,
      conversionRate: 0,
      byService: {} as Record<string, number>,
      byStatus: {} as Record<string, number>,
    };

    if (isSupabaseConfigured && supabase) {
      // 1. Total Leads
      const { count: total, error: totalErr } = await supabase
        .from("leads")
        .select("*", { count: "exact", head: true });
      if (totalErr) throw totalErr;
      stats.totalLeads = total || 0;

      // 2. Leads this month
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      const { count: monthly, error: monthlyErr } = await supabase
        .from("leads")
        .select("*", { count: "exact", head: true })
        .gte("created_at", startOfMonth.toISOString());
      if (monthlyErr) throw monthlyErr;
      stats.leadsThisMonth = monthly || 0;

      // 3. Conversion (status = closed / resolved / qualified)
      const { count: closed, error: closedErr } = await supabase
        .from("leads")
        .select("*", { count: "exact", head: true })
        .in("status", ["closed", "resolved", "qualified"]);
      if (closedErr) throw closedErr;

      stats.conversionRate = stats.totalLeads > 0
        ? Math.round(((closed || 0) / stats.totalLeads) * 100)
        : 0;

      // 4. Group by Service
      const { data: serviceData } = await supabase
        .from("leads")
        .select("service");
      
      (serviceData || []).forEach((row) => {
        stats.byService[row.service] = (stats.byService[row.service] || 0) + 1;
      });

      // 5. Group by Status
      const { data: statusData } = await supabase
        .from("leads")
        .select("status");
      
      (statusData || []).forEach((row) => {
        const s = row.status || "new";
        stats.byStatus[s] = (stats.byStatus[s] || 0) + 1;
      });
    } else {
      // Local Fallback Calculations
      const filePath = getWritablePath("leads_captured.json");
      let leads = [];

      if (fs.existsSync(filePath)) {
        try {
          leads = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        } catch {
          leads = [];
        }
      }

      stats.totalLeads = leads.length;

      const now = new Date();
      const thisMonth = now.getMonth();
      const thisYear = now.getFullYear();

      let closedCount = 0;

      leads.forEach((lead: { created_at: string; service: string; status?: string }) => {
        // Monthly checks
        const leadDate = new Date(lead.created_at);
        if (leadDate.getMonth() === thisMonth && leadDate.getFullYear() === thisYear) {
          stats.leadsThisMonth++;
        }

        // Status checks
        const status = (lead.status || "new").toLowerCase();
        if (["closed", "resolved", "qualified"].includes(status)) {
          closedCount++;
        }

        // Breakdowns
        stats.byService[lead.service] = (stats.byService[lead.service] || 0) + 1;
        stats.byStatus[lead.status || "New"] = (stats.byStatus[lead.status || "New"] || 0) + 1;
      });

      stats.conversionRate = stats.totalLeads > 0
        ? Math.round((closedCount / stats.totalLeads) * 100)
        : 0;
    }

    return res.status(200).json(stats);
  } catch (error) {
    console.error("Stats API error:", error);
    return res.status(500).json({ message: "Failed to compile stats analytics" });
  }
}
