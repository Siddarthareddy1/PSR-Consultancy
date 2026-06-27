import type { NextApiRequest, NextApiResponse } from "next";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { getWritablePath } from "@/lib/db-fallback";
import fs from "fs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 1. Authenticate user
  let email: string | null = null;

  if (isSupabaseConfigured && supabase) {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.replace("Bearer ", "");
    if (token) {
      const { data: { user } } = await supabase.auth.getUser(token);
      email = user?.email || null;
    }
  }

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

  // GET handler - load applications and associated data
  if (req.method === "GET") {
    try {
      if (isSupabaseConfigured && supabase) {
        // Fetch from Supabase
        const { data: client } = await supabase
          .from("clients")
          .select("id")
          .eq("email", email)
          .maybeSingle();

        if (!client) {
          return res.status(200).json([]);
        }

        const { data: apps, error } = await supabase
          .from("applications")
          .select(`
            *,
            leads (*)
          `)
          .eq("client_id", client.id);

        if (error) throw error;

        // Fetch related messages, documents, and consultations for each app
        const db = supabase;
        const fullApps = await Promise.all(
          (apps || []).map(async (app) => {
            const { data: msgs } = await db!
              .from("messages")
              .select("*")
              .eq("application_id", app.id)
              .order("created_at", { ascending: true });

            const { data: docs } = await db!
              .from("documents")
              .select("*")
              .eq("application_id", app.id)
              .order("created_at", { ascending: false });

            const { data: consults } = await db!
              .from("consultations")
              .select("*")
              .eq("application_id", app.id)
              .order("scheduled_date", { ascending: true });

            return {
              ...app,
              name: app.leads?.name || "Application",
              service: app.service,
              status: app.status,
              messages: msgs || [],
              documents: docs || [],
              consultations: consults || [],
            };
          })
        );

        return res.status(200).json(fullApps);
      } else {
        // Local fallback: retrieve leads matching user email, treat them as applications
        const leadsPath = getWritablePath("leads_captured.json");
        let leadsList = [];
        if (fs.existsSync(leadsPath)) {
          try {
            leadsList = JSON.parse(fs.readFileSync(leadsPath, "utf-8"));
          } catch {
            leadsList = [];
          }
        }

        const userLeads = leadsList.filter((l: { email: string }) => l.email === email);

        // Fetch related messages, documents, and consultations from local store files
        const messagesPath = getWritablePath("messages.json");
        const documentsPath = getWritablePath("documents.json");
        const consultationsPath = getWritablePath("consultations.json");

        let allMessages = [];
        let allDocuments = [];
        let allConsultations = [];

        try {
          if (fs.existsSync(messagesPath)) allMessages = JSON.parse(fs.readFileSync(messagesPath, "utf-8"));
          if (fs.existsSync(documentsPath)) allDocuments = JSON.parse(fs.readFileSync(documentsPath, "utf-8"));
          if (fs.existsSync(consultationsPath)) allConsultations = JSON.parse(fs.readFileSync(consultationsPath, "utf-8"));
        } catch {
          // ignore
        }

        const fallbackApps = userLeads.map((lead: { id: string; service: string; status: string }) => {
          const app_id = lead.id;
          return {
            id: app_id,
            service: lead.service,
            status: lead.status || "new",
            submitted_date: lead.id ? new Date(parseInt(lead.id.substring(0, 13)) || Date.now()).toISOString() : new Date().toISOString(),
            messages: allMessages.filter((m: { application_id: string }) => m.application_id === app_id),
            documents: allDocuments.filter((d: { application_id: string }) => d.application_id === app_id),
            consultations: allConsultations.filter((c: { application_id: string }) => c.application_id === app_id),
          };
        });

        return res.status(200).json(fallbackApps);
      }
    } catch (error) {
      console.error("Fetch applications error:", error);
      return res.status(500).json({ message: "Failed to fetch applications" });
    }
  }

  // POST handler - handle actions (message, document upload, book consultation)
  if (req.method === "POST") {
    const { action, applicationId, messageText, fileName, fileUrl, fileType, consultantName, scheduledDate, duration, type, meetingLink } = req.body;

    if (!applicationId) {
      return res.status(400).json({ message: "Application ID is required" });
    }

    try {
      if (action === "message") {
        if (!messageText) {
          return res.status(400).json({ message: "Message text is required" });
        }

        const msgData = {
          application_id: applicationId,
          from_email: email,
          from_name: email.split("@")[0],
          message: messageText,
          attachments: [],
          created_at: new Date().toISOString(),
        };

        if (isSupabaseConfigured && supabase) {
          const { error } = await supabase.from("messages").insert([msgData]);
          if (error) throw error;
        } else {
          const messagesPath = getWritablePath("messages.json");
          let messages = [];
          if (fs.existsSync(messagesPath)) {
            try {
              messages = JSON.parse(fs.readFileSync(messagesPath, "utf-8"));
            } catch {
              messages = [];
            }
          }
          messages.push(msgData);
          fs.writeFileSync(messagesPath, JSON.stringify(messages, null, 2));
        }

        return res.status(200).json({ success: true, message: "Message sent successfully", data: msgData });
      }

      if (action === "document") {
        if (!fileName || !fileUrl) {
          return res.status(400).json({ message: "File name and file URL are required" });
        }

        const docData = {
          application_id: applicationId,
          file_name: fileName,
          file_url: fileUrl,
          file_type: fileType || "PDF",
          uploaded_by: email,
          created_at: new Date().toISOString(),
        };

        if (isSupabaseConfigured && supabase) {
          const { error } = await supabase.from("documents").insert([docData]);
          if (error) throw error;
        } else {
          const documentsPath = getWritablePath("documents.json");
          let documents = [];
          if (fs.existsSync(documentsPath)) {
            try {
              documents = JSON.parse(fs.readFileSync(documentsPath, "utf-8"));
            } catch {
              documents = [];
            }
          }
          documents.push(docData);
          fs.writeFileSync(documentsPath, JSON.stringify(documents, null, 2));
        }

        return res.status(200).json({ success: true, message: "Document uploaded successfully", data: docData });
      }

      if (action === "book_consultation") {
        if (!scheduledDate) {
          return res.status(400).json({ message: "Scheduled date is required" });
        }

        const consultData = {
          application_id: applicationId,
          consultant_name: consultantName || "Senior Advisor",
          scheduled_date: scheduledDate,
          duration_minutes: duration || 60,
          type: type || "zoom",
          meeting_link: meetingLink || "https://zoom.us/j/mock-psr-one-consultation",
          status: "scheduled",
          created_at: new Date().toISOString(),
        };

        if (isSupabaseConfigured && supabase) {
          const { error } = await supabase.from("consultations").insert([consultData]);
          if (error) throw error;
        } else {
          const consultationsPath = getWritablePath("consultations.json");
          let consultations = [];
          if (fs.existsSync(consultationsPath)) {
            try {
              consultations = JSON.parse(fs.readFileSync(consultationsPath, "utf-8"));
            } catch {
              consultations = [];
            }
          }
          consultations.push(consultData);
          fs.writeFileSync(consultationsPath, JSON.stringify(consultations, null, 2));
        }

        return res.status(200).json({ success: true, message: "Consultation booked successfully", data: consultData });
      }

      return res.status(400).json({ message: "Invalid action" });
    } catch (error) {
      console.error("Portal application action error:", error);
      return res.status(500).json({ message: "Action failed" });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
