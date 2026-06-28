import type { NextApiRequest, NextApiResponse } from "next";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
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
    let leads: Record<string, unknown>[] = [];
    let subscribers: Record<string, unknown>[] = [];

    if (isFirebaseConfigured && db) {
      try {
        // Fetch leads from Firestore
        const leadsQuery = query(collection(db, "leads"), orderBy("created_at", "desc"));
        const leadsSnap = await getDocs(leadsQuery);
        leads = leadsSnap.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        } as Record<string, unknown>));
      } catch (err) {
        console.error("Firestore leads fetch error:", err);
      }

      try {
        // Fetch subscribers from Firestore
        const subsQuery = query(collection(db, "subscribers"), orderBy("created_at", "desc"));
        const subsSnap = await getDocs(subsQuery);
        subscribers = subsSnap.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        } as Record<string, unknown>));
      } catch (err) {
        console.error("Firestore subscribers fetch error:", err);
      }
    } else {
      // Fallback: read from local files
      const leadsFilePath = getWritablePath("leads_captured.json");
      if (fs.existsSync(leadsFilePath)) {
        try {
          const fileContent = fs.readFileSync(leadsFilePath, "utf-8");
          leads = JSON.parse(fileContent);
        } catch {
          leads = [];
        }
      }

      const subsFilePath = getWritablePath("subscribers.json");
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
