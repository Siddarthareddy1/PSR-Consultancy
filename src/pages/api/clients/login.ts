import type { NextApiRequest, NextApiResponse } from "next";
import { getWritablePath } from "@/lib/db-fallback";
import fs from "fs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { token } = req.query;

  if (!token || typeof token !== "string") {
    return res.status(400).json({ message: "Token parameter is required" });
  }

  try {
    const tokensPath = getWritablePath("auth_tokens.json");
    if (!fs.existsSync(tokensPath)) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const tokens = JSON.parse(fs.readFileSync(tokensPath, "utf-8"));
    const email = tokens[token];

    if (!email) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Clean up used token
    delete tokens[token];
    fs.writeFileSync(tokensPath, JSON.stringify(tokens, null, 2));

    // Set cookie to establish local mock session
    res.setHeader(
      "Set-Cookie",
      `psr_portal_email=${encodeURIComponent(email)}; Path=/; Max-Age=86400; SameSite=Lax`
    );

    // Redirect to client dashboard
    return res.redirect(302, "/client/dashboard");
  } catch (error) {
    console.error("Magic link login error:", error);
    return res.status(500).json({ message: "Failed to verify login token" });
  }
}
