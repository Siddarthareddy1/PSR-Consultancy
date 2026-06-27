import type { NextApiRequest, NextApiResponse } from "next";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { getWritablePath } from "@/lib/db-fallback";
import fs from "fs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    let email: string | null = null;

    if (isSupabaseConfigured && supabase) {
      // Get user from Supabase session
      const authHeader = req.headers.authorization || "";
      const token = authHeader.replace("Bearer ", "");
      if (token) {
        const {
          data: { user },
        } = await supabase.auth.getUser(token);
        email = user?.email || null;
      }
    }

    // Fallback to cookie check if not found via Supabase (or for local testing)
    if (!email) {
      const cookies = req.headers.cookie || "";
      const match = cookies.match(/psr_portal_email=([^;]+)/);
      if (match) {
        email = decodeURIComponent(match[1]);
      }
    }

    if (!email) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (isSupabaseConfigured && supabase) {
      const { data: client, error } = await supabase
        .from("clients")
        .select("*")
        .eq("email", email)
        .maybeSingle();

      if (error) throw error;
      if (client) {
        return res.status(200).json(client);
      }
    }

    // Fallback: Read client profile locally
    const clientsPath = getWritablePath("clients.json");
    if (fs.existsSync(clientsPath)) {
      const clients = JSON.parse(fs.readFileSync(clientsPath, "utf-8"));
      const client = clients.find((c: { email: string }) => c.email === email);
      if (client) {
        return res.status(200).json(client);
      }
    }

    // Create a default if profile doesn't exist but has email session
    const defaultClient = {
      email,
      name: email.split("@")[0],
      company: "",
      phone: "",
      service: "",
    };
    return res.status(200).json(defaultClient);
  } catch (error) {
    console.error("Profile API error:", error);
    return res.status(500).json({ message: "Failed to load profile" });
  }
}
