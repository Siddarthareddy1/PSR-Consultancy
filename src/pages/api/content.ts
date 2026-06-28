import type { NextApiRequest, NextApiResponse } from "next";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getWritablePath } from "@/lib/db-fallback";
import fs from "fs";

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
    value1_title: "Client-Centricity",
    value1_desc: "Our clients' milestones drive our advisory directives. We align our success with their financial security.",
    value2_title: "Fiduciary Integrity",
    value2_desc: "No conflict of interest. We deliver unbiased property legal checks and brand due diligence.",
    value3_title: "Operational Excellence",
    value3_desc: "We enforce high operational standards in every project layout we audit or debt we syndicate.",
    value4_title: "Collaborative Growth",
    value4_desc: "We empower local partnerships and build regional franchise holdings that scale ecosystems.",
    timeline1_year: "2006",
    timeline1_title: "PSR Consultancy Formed",
    timeline1_desc: "Started as a boutique regional financial consulting agency in Hyderabad.",
    timeline2_year: "2012",
    timeline2_title: "Debt Syndication Growth",
    timeline2_desc: "Expanded services into corporate loan matchmaking, funding ₹10 Cr+ capital.",
    timeline3_year: "2018",
    timeline3_title: "Franchise & Property Advisory",
    timeline3_desc: "Launched franchise match-making and property legal vetting, scaling client returns.",
    timeline4_year: "2024",
    timeline4_title: "Rebranding to PSR ONE",
    timeline4_desc: "Consolidated all 5 business verticals under a unified multi-service digital platform.",
    team1_name: "Siddharth Reddy",
    team1_role: "Founder & Managing Director",
    team1_bio: "Siddharth has over 20 years of experience in corporate debt syndication and startup capital modeling.",
    team2_name: "Anjali Mehta",
    team2_role: "Head of Risk & Insurance",
    team2_bio: "Anjali oversees corporate health portfolios and liability underwriting audits for medium businesses.",
    team3_name: "Ramesh Sharma",
    team3_role: "Lead Real Estate Counsel",
    team3_bio: "Ramesh directs commercial land vetting and property layout RERA compliance validations."
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
  const filePath = getWritablePath("site_content.json");

  if (req.method === "GET") {
    const { page } = req.query;
    if (!page || typeof page !== "string") {
      return res.status(400).json({ message: "Page parameter is required" });
    }

    const defaultContent = DEFAULT_PAGE_CONTENT[page] || {};

    try {
      if (isFirebaseConfigured && db) {
        const docRef = doc(db, "site_content", page);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const customContent = docSnap.data() as Record<string, string>;
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
      if (isFirebaseConfigured && db) {
        const docRef = doc(db, "site_content", page);
        await setDoc(docRef, content, { merge: true });
        return res.status(200).json({ success: true, message: "Content updated in Firebase" });
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
      return res.status(500).json({ message: "Failed to save content" });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
