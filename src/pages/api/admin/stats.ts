import type { NextApiRequest, NextApiResponse } from "next";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
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

    let leads: { created_at: string; service: string; status?: string }[] = [];
    let isConnected = false;

    if (isFirebaseConfigured && db) {
      try {
        const leadsSnap = await getDocs(collection(db, "leads"));
        leads = leadsSnap.docs.map((doc) => doc.data() as { created_at: string; service: string; status?: string });
        isConnected = true;
      } catch (err) {
        console.error("Firestore stats fetch error, checking local fallback:", err);
      }
    }

    if (!isConnected) {
      // Local Fallback Calculations
      const filePath = getWritablePath("leads_captured.json");
      if (fs.existsSync(filePath)) {
        try {
          leads = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        } catch {
          leads = [];
        }
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

    return res.status(200).json(stats);
  } catch (error) {
    console.error("Stats API error:", error);
    return res.status(500).json({ message: "Failed to compile stats analytics" });
  }
}
