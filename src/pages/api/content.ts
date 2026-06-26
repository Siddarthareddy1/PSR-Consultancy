import type { NextApiRequest, NextApiResponse } from "next";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import fs from "fs";
import path from "path";

export const DEFAULT_PAGE_CONTENT: Record<string, Record<string, string>> = {
  home: {
    hero_title_prefix: "Secure Your Wealth, Scale Your Business with ",
    hero_title_accent: "PSR ONE",
    hero_subtitle: "Your premium partner for Franchise Investing, Loans & Capital, Corporate Insurance, Strategic Real Estate Advisory, and Business Growth Consulting.",
    cta_explore: "Explore Our Services",
    cta_schedule: "Schedule Consultation",
  },
  about: {
    hero_title: "Unified Business & Financial Solutions",
    hero_subtitle: "Supporting entrepreneurs, investors, and families to grow assets and protect capital since 2006.",
    mission_title: "Our Mission",
    mission_desc: "To simplify corporate scaling and wealth management by offering pre-vetted investments, competitive financing options, and legal due diligence tools within a single, integrated platform.",
    vision_title: "Our Vision",
    vision_desc: "To become India's leading platform for multi-service business growth, trusted by 100,000+ partners to secure their operations and deploy capital efficiently.",
    values_title: "Our Core Values",
    values_subtitle: "The operational rules that guide every audit we conduct and term sheet we structure.",
  },
  franchise: {
    hero_title: "Invest in Vetted Brands with Confirmed ROI",
    hero_subtitle: "Skip the startup trial-and-error. Invest in verified businesses with standardized operating procedures, established customer loyalty, and consistent cash flows.",
  },
  loans: {
    hero_title: "Flexible Debt Syndication & Working Capital",
    hero_subtitle: "Secure commercial funding, land acquisition loans, and structured debt lines from India's leading banks and NBFCs with expert proposal formatting.",
  },
  insurance: {
    hero_title: "Enterprise & Family Risk Mitigation",
    hero_subtitle: "Protect your capital, shield your liability, and cover your employees. Expert corporate liability, keyman insurance, and group medical policy structuring.",
  },
  real_estate: {
    hero_title: "Vetted Commercial & Land Investments",
    hero_subtitle: "Navigate commercial properties, high-yield land investments, and residential projects with complete legal audits, RERA checks, and location yield analytics.",
  },
  business_advisory: {
    hero_title: "Scale-Ready Corporate Growth Advisory",
    hero_subtitle: "Formulate business structures, optimize operations, audit tax positions, and prepare investment proposals for successful venture funding or transition exit.",
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const filePath = path.join(process.cwd(), "site_content.json");

  if (req.method === "GET") {
    const { page } = req.query;
    if (!page || typeof page !== "string") {
      return res.status(400).json({ message: "Page parameter is required" });
    }

    const defaultContent = DEFAULT_PAGE_CONTENT[page] || {};

    try {
      if (isSupabaseConfigured && supabase) {
        // Fetch custom page content from Supabase
        const { data, error } = await supabase
          .from("site_content")
          .select("key, value")
          .eq("page", page);
        
        if (!error && data && data.length > 0) {
          const customContent: Record<string, string> = {};
          data.forEach((row: { key: string; value: string }) => {
            customContent[row.key] = row.value;
          });
          return res.status(200).json({ ...defaultContent, ...customContent });
        }
      }

      // Fallback: local JSON file
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const allData = JSON.parse(fileContent);
        const pageData = allData[page] || {};
        return res.status(200).json({ ...defaultContent, ...pageData });
      }

      return res.status(200).json(defaultContent);
    } catch (err) {
      console.error(`Error loading page content for ${page}:`, err);
      return res.status(200).json(defaultContent);
    }
  } else if (req.method === "POST") {
    // Authenticate
    const passcode = req.headers["x-admin-passcode"];
    if (passcode !== "PSRadmin2026") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { page, content } = req.body;
    if (!page || !content || typeof content !== "object") {
      return res.status(400).json({ message: "Page and content payload are required" });
    }

    try {
      if (isSupabaseConfigured && supabase) {
        // Upsert keys into Supabase site_content table
        const upsertData = Object.entries(content).map(([key, value]) => ({
          page,
          key,
          value: String(value),
        }));

        const { error } = await supabase
          .from("site_content")
          .upsert(upsertData, { onConflict: "page,key" });
        
        if (error) throw error;
        return res.status(200).json({ success: true, message: "Content updated in Supabase" });
      } else {
        // Local file fallback
        let allData: Record<string, Record<string, string>> = {};
        if (fs.existsSync(filePath)) {
          try {
            allData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
          } catch {
            allData = {};
          }
        }

        allData[page] = { ...(allData[page] || {}), ...content };
        fs.writeFileSync(filePath, JSON.stringify(allData, null, 2));

        return res.status(200).json({ success: true, message: "Content updated locally" });
      }
    } catch (err) {
      console.error(`Error saving content for ${page}:`, err);
      const errMsg = err instanceof Error ? err.message : "Failed to save content";
      return res.status(500).json({ message: errMsg });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
