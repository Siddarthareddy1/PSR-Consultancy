import type { NextApiRequest, NextApiResponse } from "next";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
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
      if (isFirebaseConfigured && db) {
        const docRef = doc(db, "site_settings", "global");
        const docSnap = await getDoc(docRef);
        
        const isMailConfigured = !!process.env.SENDGRID_API_KEY;
        if (docSnap.exists()) {
          const data = docSnap.data();
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
        console.warn("Firebase site_settings document does not exist, trying local file fallback");
      }

      const isMailConfigured = !!process.env.SENDGRID_API_KEY;

      // Local file fallback
      if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, "utf-8");
        const parsed = JSON.parse(fileData);
        return res.status(200).json({
          ...parsed,
          isDatabaseConnected: isFirebaseConfigured,
          isMailConfigured,
        });
      }

      // Default fallback
      return res.status(200).json({
        ...DEFAULT_SETTINGS,
        isDatabaseConnected: isFirebaseConfigured,
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
      if (isFirebaseConfigured && db) {
        const docRef = doc(db, "site_settings", "global");
        await setDoc(docRef, newSettings);
        return res.status(200).json({ success: true, message: "Settings saved to Firebase" });
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
