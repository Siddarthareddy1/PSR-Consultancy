import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  User,
  LogOut,
  FileText,
  MessageSquare,
  Calendar,
  Send,
  Upload,
  Clock,
  ExternalLink,
  Loader2,
  Building,
  Target,
  Shield,
  Briefcase,
  HelpCircle,
} from "lucide-react";

interface Message {
  id?: string;
  from_name: string;
  from_email: string;
  message: string;
  created_at: string;
}

interface Document {
  id?: string;
  file_name: string;
  file_url: string;
  file_type?: string;
  created_at: string;
}

interface Consultation {
  id?: string;
  consultant_name: string;
  scheduled_date: string;
  meeting_link: string;
  status: string;
}

interface Application {
  id: string;
  service: string;
  status: string;
  submitted_date: string;
  messages: Message[];
  documents: Document[];
  consultations: Consultation[];
}

interface Profile {
  email: string;
  name: string;
  company?: string;
  phone?: string;
}

export default function ClientDashboard() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);

  // Form states
  const [newMessage, setNewMessage] = useState("");
  const [docName, setDocName] = useState("");
  const [docUrl, setDocUrl] = useState("");
  const [consultant, setConsultant] = useState("Siddharth Reddy");
  const [consultDate, setConsultDate] = useState("");
  const [consultTime, setConsultTime] = useState("10:00");

  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const fetchProfileAndApps = async () => {
    try {
      const profileRes = await fetch("/api/clients/profile");
      if (!profileRes.ok) {
        router.push("/client/login");
        return;
      }
      const profileData = await profileRes.json();
      setProfile(profileData);

      const appsRes = await fetch("/api/clients/applications");
      if (appsRes.ok) {
        const appsData = await appsRes.json();
        setApplications(appsData);
        if (appsData.length > 0) {
          setSelectedApp(appsData[0]);
        }
      }
    } catch (err) {
      console.error("Dashboard data load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileAndApps();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedApp?.messages]);

  const handleLogout = async () => {
    await fetch("/api/clients/logout");
    router.push("/client/login");
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedApp) return;

    try {
      const res = await fetch("/api/clients/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "message",
          applicationId: selectedApp.id,
          messageText: newMessage,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const updatedMessages = [...(selectedApp.messages || []), data.data];
        const updatedApp = { ...selectedApp, messages: updatedMessages };
        setApplications((prev) => prev.map((a) => (a.id === selectedApp.id ? updatedApp : a)));
        setSelectedApp(updatedApp);
        setNewMessage("");
      }
    } catch (err) {
      console.error("Send message error:", err);
    }
  };

  const handleUploadDoc = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!docName || !docUrl || !selectedApp) return;

    try {
      const res = await fetch("/api/clients/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "document",
          applicationId: selectedApp.id,
          fileName: docName,
          fileUrl: docUrl,
          fileType: "PDF",
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const updatedDocs = [data.data, ...(selectedApp.documents || [])];
        const updatedApp = { ...selectedApp, documents: updatedDocs };
        setApplications((prev) => prev.map((a) => (a.id === selectedApp.id ? updatedApp : a)));
        setSelectedApp(updatedApp);
        setDocName("");
        setDocUrl("");
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 3000);
      }
    } catch (err) {
      console.error("Upload document error:", err);
    }
  };

  const handleBookConsultation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consultDate || !selectedApp) return;

    const scheduledDate = new Date(`${consultDate}T${consultTime}:00`).toISOString();

    try {
      const res = await fetch("/api/clients/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "book_consultation",
          applicationId: selectedApp.id,
          consultantName: consultant,
          scheduledDate,
          type: "zoom",
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const updatedConsults = [...(selectedApp.consultations || []), data.data];
        const updatedApp = { ...selectedApp, consultations: updatedConsults };
        setApplications((prev) => prev.map((a) => (a.id === selectedApp.id ? updatedApp : a)));
        setSelectedApp(updatedApp);
        setBookingSuccess(true);
        setTimeout(() => setBookingSuccess(false), 3000);
      }
    } catch (err) {
      console.error("Book consultation error:", err);
    }
  };

  const getServiceIcon = (service: string) => {
    switch (service) {
      case "Franchise":
        return <Target className="h-5 w-5 text-orange-500" />;
      case "Loan":
        return <Building className="h-5 w-5 text-emerald-500" />;
      case "Insurance":
        return <Shield className="h-5 w-5 text-purple-500" />;
      case "Real Estate":
        return <Building className="h-5 w-5 text-cyan-500" />;
      case "Advisory":
        return <Briefcase className="h-5 w-5 text-amber-500" />;
      default:
        return <HelpCircle className="h-5 w-5 text-slate-500" />;
    }
  };

  const getStatusStep = (status: string) => {
    const steps = ["new", "contacted", "qualified", "proposal_sent", "closed"];
    return steps.indexOf(status.toLowerCase());
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
        <Loader2 className="h-10 w-10 text-secondary animate-spin mb-4" />
        <p className="text-slate-400 text-sm">Loading portal dashboard...</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Client Portal Dashboard | PSR ONE</title>
      </Head>

      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-body">
        {/* Navigation bar */}
        <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-white font-bold text-xl tracking-wider font-heading">
              <span className="text-secondary">PSR</span> ONE
            </span>
            <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-semibold uppercase">
              Client Portal
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-secondary/15 border border-secondary/20 flex items-center justify-center text-secondary text-xs font-bold uppercase">
                <User className="h-4 w-4" />
              </div>
              <span className="text-xs font-bold hidden sm:inline-block text-slate-300">
                {profile?.name || "Client"}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </header>

        {/* Dashboard Workspace */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">
          {/* Applications list sidebar */}
          <aside className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col gap-4">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
              Your Applications
            </h2>

            {applications.length === 0 ? (
              <div className="text-center py-8 text-slate-500 text-xs">
                No active consulting profiles found.
              </div>
            ) : (
              <div className="flex flex-col gap-2 overflow-y-auto">
                {applications.map((app) => (
                  <button
                    key={app.id}
                    onClick={() => {
                      setSelectedApp(app);
                      setBookingSuccess(false);
                    }}
                    className={`flex items-center gap-3 p-3 rounded-lg text-left border transition-all ${
                      selectedApp?.id === app.id
                        ? "bg-secondary/10 border-secondary text-white"
                        : "bg-slate-950 border-slate-850 hover:bg-slate-900 text-slate-400"
                    }`}
                  >
                    {getServiceIcon(app.service)}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold truncate">
                        {app.service} Consulting
                      </p>
                      <p className="text-[10px] text-slate-500 mt-0.5 capitalize">
                        Status: {app.status.replace("_", " ")}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </aside>

          {/* Active Application Workspace */}
          {selectedApp ? (
            <main className="lg:col-span-9 flex flex-col gap-6">
              {/* Application Header & Timeline progress */}
              <section className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 mb-6 gap-2">
                  <div>
                    <h1 className="text-xl font-bold text-white font-heading">
                      {selectedApp.service} Advisory Pipeline
                    </h1>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      Submitted on: {new Date(selectedApp.submitted_date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="self-start sm:self-center">
                    <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-secondary/15 text-secondary border border-secondary/20">
                      Application Status: {selectedApp.status.replace("_", " ")}
                    </span>
                  </div>
                </div>

                {/* Progress bar timeline */}
                <div className="relative flex items-center justify-between w-full max-w-2xl mx-auto py-4">
                  <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-800 -translate-y-1/2 z-0"></div>
                  <div
                    className="absolute top-1/2 left-0 h-0.5 bg-secondary -translate-y-1/2 z-0 transition-all duration-500"
                    style={{
                      width: `${(getStatusStep(selectedApp.status) / 4) * 100}%`,
                    }}
                  ></div>

                  {["New", "Contacted", "Qualified", "Proposal Sent", "Closed"].map((label, idx) => {
                    const activeStep = getStatusStep(selectedApp.status);
                    const isCompleted = idx <= activeStep;

                    return (
                      <div key={idx} className="relative z-10 flex flex-col items-center">
                        <div
                          className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors ${
                            isCompleted
                              ? "bg-secondary text-slate-900"
                              : "bg-slate-950 border border-slate-800 text-slate-500"
                          }`}
                        >
                          {idx + 1}
                        </div>
                        <span className="text-[10px] text-slate-400 mt-2 font-bold whitespace-nowrap">
                          {label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Chat & Resources Row */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Chatbox messages thread */}
                <section className="md:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col h-[50vh]">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5 border-b border-slate-800 pb-2">
                    <MessageSquare className="h-4 w-4 text-secondary" />
                    Discussion Thread
                  </h3>

                  {/* Messages Feed */}
                  <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4 scrollbar-thin">
                    {selectedApp.messages.length === 0 ? (
                      <div className="text-center text-xs text-slate-600 mt-12">
                        No messages in this pipeline yet. Introduce yourself to your advisory team!
                      </div>
                    ) : (
                      selectedApp.messages.map((msg, idx) => {
                        const isSelf = msg.from_email === profile?.email;
                        return (
                          <div
                            key={idx}
                            className={`flex flex-col max-w-[80%] ${
                              isSelf ? "self-end ml-auto items-end" : "self-start items-start"
                            }`}
                          >
                            <span className="text-[9px] text-slate-500 font-bold mb-1">
                              {msg.from_name} • {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            <div
                              className={`p-3 rounded-xl text-xs leading-relaxed ${
                                isSelf
                                  ? "bg-secondary text-slate-900 rounded-tr-none font-medium"
                                  : "bg-slate-950 border border-slate-850 text-slate-200 rounded-tl-none"
                              }`}
                            >
                              {msg.message}
                            </div>
                          </div>
                        );
                      })
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Send Message Input */}
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message to the advisor..."
                      className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-600 focus:outline-none focus:border-secondary transition-colors"
                    />
                    <button
                      type="submit"
                      className="p-2 bg-secondary hover:bg-secondary-dark text-slate-900 rounded-lg transition-colors"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </form>
                </section>

                {/* Documents & Schedule sidebar */}
                <div className="md:col-span-5 flex flex-col gap-6">
                  {/* Documents Manager */}
                  <section className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col gap-3">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-800 pb-2">
                      <FileText className="h-4 w-4 text-secondary" />
                      Documents Archive
                    </h3>

                    {/* Docs List */}
                    <div className="flex flex-col gap-2 max-h-[15vh] overflow-y-auto pr-1">
                      {selectedApp.documents.length === 0 ? (
                        <p className="text-[10px] text-slate-500 py-2">No documents shared yet.</p>
                      ) : (
                        selectedApp.documents.map((doc, idx) => (
                          <a
                            key={idx}
                            href={doc.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-850 hover:bg-slate-900 transition-colors"
                          >
                            <div className="min-w-0">
                              <p className="text-[10px] font-bold text-slate-350 truncate pr-2">
                                {doc.file_name}
                              </p>
                              <p className="text-[8px] text-slate-550 mt-0.5">
                                {new Date(doc.created_at).toLocaleDateString()}
                              </p>
                            </div>
                            <ExternalLink className="h-3 w-3 text-slate-500 flex-shrink-0" />
                          </a>
                        ))
                      )}
                    </div>

                    {/* Upload Doc Form */}
                    <form onSubmit={handleUploadDoc} className="space-y-2 border-t border-slate-850 pt-2">
                      <p className="text-[9px] text-slate-450 uppercase font-semibold">Upload document:</p>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          required
                          placeholder="e.g. Identity Proof"
                          value={docName}
                          onChange={(e) => setDocName(e.target.value)}
                          className="px-2 py-1.5 bg-slate-950 border border-slate-800 rounded text-[10px] text-white focus:outline-none focus:border-secondary"
                        />
                        <input
                          type="url"
                          required
                          placeholder="URL Link (mock PDF)"
                          value={docUrl}
                          onChange={(e) => setDocUrl(e.target.value)}
                          className="px-2 py-1.5 bg-slate-950 border border-slate-800 rounded text-[10px] text-white focus:outline-none focus:border-secondary"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-1 py-1.5 bg-slate-800 hover:bg-slate-705 border border-slate-700 rounded text-[10px] font-bold text-white transition-colors"
                      >
                        <Upload className="h-3 w-3" /> Save Document
                      </button>
                      {uploadSuccess && (
                        <p className="text-[9px] text-emerald-400 font-bold text-center">Document saved successfully!</p>
                      )}
                    </form>
                  </section>

                  {/* Consultation Scheduler */}
                  <section className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col gap-3">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-800 pb-2">
                      <Calendar className="h-4 w-4 text-secondary" />
                      Book Advisory Session
                    </h3>

                    {/* Next Session Display */}
                    {selectedApp.consultations.length > 0 && (
                      <div className="p-3 bg-slate-950 rounded border border-slate-850">
                        <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Booked Meeting:</p>
                        <p className="text-xs font-bold text-white mt-1">
                          {selectedApp.consultations[0].consultant_name}
                        </p>
                        <div className="flex items-center gap-1 text-[10px] text-secondary mt-1">
                          <Clock className="h-3 w-3" />
                          <span>{new Date(selectedApp.consultations[0].scheduled_date).toLocaleString()}</span>
                        </div>
                        <a
                          href={selectedApp.consultations[0].meeting_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 mt-2 text-[10px] font-bold text-cyan-400 hover:underline"
                        >
                          Join Zoom Meeting <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    )}

                    {/* Book Form */}
                    <form onSubmit={handleBookConsultation} className="space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[8px] text-slate-400 font-bold uppercase block mb-1">Advisor</label>
                          <select
                            value={consultant}
                            onChange={(e) => setConsultant(e.target.value)}
                            className="w-full px-2 py-1.5 bg-slate-950 border border-slate-800 rounded text-[10px] text-white focus:outline-none focus:border-secondary"
                          >
                            <option value="Siddharth Reddy">Siddharth Reddy</option>
                            <option value="Anjali Mehta">Anjali Mehta</option>
                            <option value="Ramesh Sharma">Ramesh Sharma</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-[8px] text-slate-400 font-bold uppercase block mb-1">Date</label>
                          <input
                            type="date"
                            required
                            value={consultDate}
                            onChange={(e) => setConsultDate(e.target.value)}
                            className="w-full px-2 py-1.5 bg-slate-950 border border-slate-800 rounded text-[10px] text-white focus:outline-none focus:border-secondary"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[8px] text-slate-400 font-bold uppercase block mb-1">Time</label>
                          <input
                            type="time"
                            required
                            value={consultTime}
                            onChange={(e) => setConsultTime(e.target.value)}
                            className="w-full px-2 py-1.5 bg-slate-950 border border-slate-800 rounded text-[10px] text-white focus:outline-none focus:border-secondary"
                          />
                        </div>

                        <div className="flex items-end">
                          <button
                            type="submit"
                            className="w-full py-1.5 bg-secondary hover:bg-secondary-dark text-slate-900 rounded text-[10px] font-bold transition-all"
                          >
                            Confirm Booking
                          </button>
                        </div>
                      </div>

                      {bookingSuccess && (
                        <p className="text-[9px] text-emerald-400 font-bold text-center">Session booked successfully!</p>
                      )}
                    </form>
                  </section>
                </div>
              </div>
            </main>
          ) : (
            <div className="lg:col-span-9 flex flex-col items-center justify-center bg-slate-900 border border-slate-800 rounded-xl p-12 text-center text-slate-500">
              <Building className="h-12 w-12 text-slate-700 mb-4 animate-pulse" />
              <p className="text-sm">No applications registered to this account.</p>
              <p className="text-xs mt-1 text-slate-650">Submit a lead query on our contact page to open an pipeline!</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
