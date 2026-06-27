import { useState, useEffect } from "react";
import Head from "next/head";
import {
  Lock,
  Users,
  Mail,
  Settings,
  Download,
  Save,
  CheckCircle,
  FileText,
} from "lucide-react";

interface Lead {
  name: string;
  email: string;
  phone: string;
  service: string;
  company_name?: string;
  budget_range?: string;
  contact_method: string;
  message?: string;
  created_at: string;
}

interface Subscriber {
  email: string;
  created_at: string;
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<"leads" | "subscribers" | "settings" | "content">("leads");

  // Content Editor States
  const [selectedPage, setSelectedPage] = useState("home");
  const [pageContent, setPageContent] = useState<Record<string, string>>({});
  const [contentLoading, setContentLoading] = useState(false);
  const [contentSuccess, setContentSuccess] = useState(false);
  const [isDatabaseConnected, setIsDatabaseConnected] = useState<boolean | null>(null);
  const [isMailConfigured, setIsMailConfigured] = useState<boolean | null>(null);

  // Admin Data states
  const [leads, setLeads] = useState<Lead[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(false);

  // Site Settings state (dynamically linked to localStorage)
  const [siteSettings, setSiteSettings] = useState({
    phone: "+91 9110326887",
    email: "sandeepsunnycool7@gmail.com",
    address: "3rd Floor, PSR Heights, Near Hitech City Junction, Hitech City Road, Madhapur, Hyderabad, Telangana, 500081 (Opposite Timmidkunta Lake)",
    hours: "Open 24 Hours",
    instagram: "https://www.instagram.com/psrconsultancy_hyderabad",
  });

  const [settingsSuccess, setSettingsSuccess] = useState(false);

  // Check login passcode
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default secure passcode
    if (passcode === "PSRadmin2026") {
      setIsAuthenticated(true);
      setLoginError("");
      loadDashboardData(passcode);
    } else {
      setLoginError("Invalid passcode. Please try again.");
    }
  };

  // Load leads and subscribers from local JSON fallbacks/APIs
  const loadDashboardData = async (currentPasscode = passcode) => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/data", {
        headers: {
          "x-admin-passcode": currentPasscode,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setLeads(data.leads || []);
        setSubscribers(data.subscribers || []);
      } else {
        throw new Error("Failed to load admin data");
      }
    } catch (err) {
      console.error("Failed to load admin logs, using fallback data:", err);
      // Fallback
      setLeads([
        {
          name: "Rahul Nair",
          email: "rahul@example.com",
          phone: "+91 9876543210",
          service: "loans",
          company_name: "Nair Logistics",
          budget_range: "50l-2cr",
          contact_method: "phone",
          message: "Need funding for commercial truck expansion.",
          created_at: new Date().toISOString(),
        },
      ]);
      setSubscribers([
        {
          email: "partner@example.com",
          created_at: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Load custom site settings from dynamic API with local storage fallback
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const res = await fetch("/api/settings");
        if (res.ok) {
          const data = await res.json();
          setSiteSettings({
            phone: data.phone,
            email: data.email,
            address: data.address,
            hours: data.hours,
            instagram: data.instagram,
          });
          setIsDatabaseConnected(data.isDatabaseConnected ?? false);
          setIsMailConfigured(data.isMailConfigured ?? false);
          return;
        }
      } catch (err) {
        console.error("Failed to fetch settings in admin:", err);
      }

      const saved = localStorage.getItem("psr_site_settings");
      if (saved) {
        try {
          setSiteSettings(JSON.parse(saved));
        } catch {
          // ignore
        }
      }
      setIsDatabaseConnected(false);
      setIsMailConfigured(false);
    };
    loadSettings();
  }, []);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-passcode": passcode,
        },
        body: JSON.stringify(siteSettings),
      });

      if (res.ok) {
        localStorage.setItem("psr_site_settings", JSON.stringify(siteSettings));
        setSettingsSuccess(true);
        setTimeout(() => setSettingsSuccess(false), 3000);
      } else {
        const errData = await res.json();
        alert(errData.message || "Failed to save settings.");
      }
    } catch (err) {
      console.error("Save settings error:", err);
      alert("An error occurred while saving settings.");
    } finally {
      setLoading(false);
    }
  };

  const loadPageContent = async (pageName: string) => {
    setContentLoading(true);
    try {
      const res = await fetch(`/api/content?page=${pageName}`);
      if (res.ok) {
        const data = await res.json();
        setPageContent(data);
      }
    } catch (err) {
      console.error("Failed to load page content:", err);
    } finally {
      setContentLoading(false);
    }
  };

  const handleSaveContent = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-passcode": passcode,
        },
        body: JSON.stringify({
          page: selectedPage,
          content: pageContent,
        }),
      });

      if (res.ok) {
        setContentSuccess(true);
        setTimeout(() => setContentSuccess(false), 3000);
      } else {
        const errData = await res.json();
        alert(errData.message || "Failed to save page content.");
      }
    } catch (err) {
      console.error("Save content error:", err);
      alert("An error occurred while saving content.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "content" && isAuthenticated) {
      loadPageContent(selectedPage);
    }
  }, [activeTab, selectedPage, isAuthenticated]);

  // CSV Export utility
  const exportToCSV = (data: Record<string, unknown>[], fileName: string) => {
    if (data.length === 0) return;
    const headers = Object.keys(data[0]).join(",");
    const rows = data.map((row) =>
      Object.values(row)
        .map((val) => `"${String(val).replace(/"/g, '""')}"`)
        .join(",")
    );
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${fileName}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) {
    return (
      <>
        <Head>
          <title>Admin Login | PSR ONE Portal</title>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-4">
          <div className="max-w-md w-full bg-white rounded-3xl border border-slate-150 p-8 shadow-sm">
            <div className="text-center mb-8">
              <div className="h-12 w-12 rounded-xl bg-blue-50 text-primary flex items-center justify-center mx-auto mb-4">
                <Lock className="h-6 w-6" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900 font-heading">
                PSR ONE Admin Portal
              </h1>
              <p className="text-slate-500 text-xs sm:text-sm mt-1">
                Enter your administrative passcode to configure site parameters.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {loginError && (
                <div className="p-3.5 rounded-lg bg-rose-50 text-rose-600 text-xs font-semibold">
                  {loginError}
                </div>
              )}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Security Passcode
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-primary text-slate-800 bg-slate-50"
                />
                <span className="text-[10px] text-slate-400 block mt-2">
                  *Default passcode is: <code className="bg-slate-100 px-1 py-0.5 rounded">PSRadmin2026</code>
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg text-sm font-bold text-white gradient-primary hover:opacity-90 transition-opacity"
              >
                Authenticate Portal
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Admin Dashboard Portal | PSR ONE</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <section className="py-12 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-display font-extrabold">Admin Control Panel</h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              View leads, download subscriber metrics, or adjust live phone and address configurations.
            </p>
          </div>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-4 py-2 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
          >
            Lock Dashboard
          </button>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Navigation Sidebar */}
          <aside className="lg:col-span-3 bg-white rounded-2xl border border-slate-150 p-4 shadow-sm space-y-2">
            <button
              onClick={() => setActiveTab("leads")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-bold transition-all ${activeTab === "leads"
                  ? "bg-primary text-white"
                  : "text-slate-600 hover:bg-slate-50"
                }`}
            >
              <Users className="h-5 w-5" />
              <span>Captured Leads ({leads.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("subscribers")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-bold transition-all ${activeTab === "subscribers"
                  ? "bg-primary text-white"
                  : "text-slate-600 hover:bg-slate-50"
                }`}
            >
              <Mail className="h-5 w-5" />
              <span>Newsletter Signups ({subscribers.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("settings")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-bold transition-all ${activeTab === "settings"
                  ? "bg-primary text-white"
                  : "text-slate-600 hover:bg-slate-50"
                }`}
            >
              <Settings className="h-5 w-5" />
              <span>Live Site Settings</span>
            </button>

            <button
              onClick={() => setActiveTab("content")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-bold transition-all ${activeTab === "content"
                  ? "bg-primary text-white"
                  : "text-slate-600 hover:bg-slate-50"
                }`}
            >
              <FileText className="h-5 w-5" />
              <span>Page Content Editor</span>
            </button>
          </aside>

          {/* Main Dashboard Workspace */}
          <main className="lg:col-span-9 bg-white rounded-2xl border border-slate-150 p-6 sm:p-8 shadow-sm min-h-[50vh]">
            {isDatabaseConnected === false && (
              <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs sm:text-sm font-semibold flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <span className="h-6 w-6 rounded-full bg-amber-200 flex items-center justify-center text-amber-800 font-bold flex-shrink-0 font-display">!</span>
                <div>
                  <p className="font-bold text-amber-950">Database Connection Not Configured</p>
                  <p className="text-amber-700/95 mt-0.5 font-normal leading-relaxed">
                    The application is running in **Local Fallback Mode**. Edits will only persist temporarily on the server instance cache (<code className="bg-amber-100 px-1 py-0.5 rounded font-mono">/tmp</code>). To enable permanent settings storage across all users, configure the <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">SUPABASE_URL</code> and <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">SUPABASE_ANON_KEY</code> environment variables in Vercel.
                  </p>
                </div>
              </div>
            )}
            {isMailConfigured === false && (
              <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm font-semibold flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <span className="h-6 w-6 rounded-full bg-rose-200 flex items-center justify-center text-rose-800 font-bold flex-shrink-0 font-display">!</span>
                <div>
                  <p className="font-bold text-rose-950">Email Service Not Configured</p>
                  <p className="text-rose-700/95 mt-0.5 font-normal leading-relaxed">
                    Lead submissions will NOT be emailed to <code className="bg-rose-100 px-1 py-0.5 rounded font-mono">sandeepsunnycool7@gmail.com</code>. Configure the <code className="bg-rose-100 px-1 py-0.5 rounded font-mono">SENDGRID_API_KEY</code> environment variable in Vercel to enable live email dispatch.
                  </p>
                </div>
              </div>
            )}
            {activeTab === "leads" && (
              <div>
                <div className="flex items-center justify-between border-b pb-4 mb-6">
                  <h2 className="text-xl font-bold text-slate-900 font-heading">
                    Form Leads Captured
                  </h2>
                  <button
                    onClick={() => exportToCSV(leads as unknown as Record<string, unknown>[], "psr_one_leads")}
                    disabled={leads.length === 0}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-50 hover:bg-slate-100 border text-slate-700 disabled:opacity-50"
                  >
                    <Download className="h-4 w-4" /> Export CSV
                  </button>
                </div>

                {loading ? (
                  <p className="text-slate-500 text-sm">Loading records...</p>
                ) : leads.length === 0 ? (
                  <p className="text-slate-500 text-sm">No leads captured yet.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-150 text-slate-500 font-bold uppercase tracking-wider">
                          <th className="p-3">Name</th>
                          <th className="p-3">Contact</th>
                          <th className="p-3">Inquiry</th>
                          <th className="p-3">Message</th>
                          <th className="p-3">Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {leads.map((lead, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/50">
                            <td className="p-3 font-bold text-slate-800">{lead.name}</td>
                            <td className="p-3 text-slate-600">
                              <span className="block">{lead.email}</span>
                              <span className="block mt-0.5 text-[10px] text-slate-400">{lead.phone}</span>
                            </td>
                            <td className="p-3">
                              <span className="inline-block px-2 py-0.5 rounded bg-blue-50 text-primary text-[10px] font-semibold uppercase">
                                {lead.service}
                              </span>
                              {lead.company_name && (
                                <span className="block mt-1 text-[10px] text-slate-400">{lead.company_name}</span>
                              )}
                            </td>
                            <td className="p-3 text-slate-500 max-w-xs truncate" title={lead.message}>
                              {lead.message || "N/A"}
                            </td>
                            <td className="p-3 text-slate-400 text-[10px]">
                              {new Date(lead.created_at).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeTab === "subscribers" && (
              <div>
                <div className="flex items-center justify-between border-b pb-4 mb-6">
                  <h2 className="text-xl font-bold text-slate-900 font-heading">
                    Newsletter Subscribers
                  </h2>
                  <button
                    onClick={() => exportToCSV(subscribers as unknown as Record<string, unknown>[], "psr_one_subscribers")}
                    disabled={subscribers.length === 0}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-50 hover:bg-slate-100 border text-slate-700 disabled:opacity-50"
                  >
                    <Download className="h-4 w-4" /> Export CSV
                  </button>
                </div>

                {loading ? (
                  <p className="text-slate-500 text-sm">Loading records...</p>
                ) : subscribers.length === 0 ? (
                  <p className="text-slate-500 text-sm">No subscribers registered yet.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-150 text-slate-500 font-bold uppercase tracking-wider">
                          <th className="p-3">Subscriber Email</th>
                          <th className="p-3">Signup Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {subscribers.map((sub, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/50">
                            <td className="p-3 font-semibold text-slate-800">{sub.email}</td>
                            <td className="p-3 text-slate-400">
                              {new Date(sub.created_at).toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeTab === "settings" && (
              <div>
                <div className="border-b pb-4 mb-6">
                  <h2 className="text-xl font-bold text-slate-900 font-heading">
                    Adjust Live Site Configurations
                  </h2>
                  <p className="text-slate-500 text-xs mt-1">
                    Update core contact credentials. Live changes will save to local store settings immediately.
                  </p>
                </div>

                {settingsSuccess && (
                  <div className="mb-6 p-3.5 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs font-semibold flex items-center gap-1.5">
                    <CheckCircle className="h-4.5 w-4.5" />
                    <span>Site settings saved successfully. Reload page to see live updates.</span>
                  </div>
                )}

                <form onSubmit={handleSaveSettings} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                        Contact Phone / WhatsApp
                      </label>
                      <input
                        type="text"
                        required
                        value={siteSettings.phone}
                        onChange={(e) => setSiteSettings({ ...siteSettings, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-primary text-slate-800 bg-slate-50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                        Contact Email
                      </label>
                      <input
                        type="email"
                        required
                        value={siteSettings.email}
                        onChange={(e) => setSiteSettings({ ...siteSettings, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-primary text-slate-800 bg-slate-50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Office Address & Landmarks
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={siteSettings.address}
                      onChange={(e) => setSiteSettings({ ...siteSettings, address: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-primary text-slate-800 bg-slate-50"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                        Operating Timings
                      </label>
                      <input
                        type="text"
                        required
                        value={siteSettings.hours}
                        onChange={(e) => setSiteSettings({ ...siteSettings, hours: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-primary text-slate-800 bg-slate-50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                        Instagram Profile Link
                      </label>
                      <input
                        type="text"
                        required
                        value={siteSettings.instagram}
                        onChange={(e) => setSiteSettings({ ...siteSettings, instagram: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-primary text-slate-800 bg-slate-50"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-6 py-3 rounded-lg text-sm font-bold text-white gradient-primary hover:opacity-90 transition-opacity"
                  >
                    <Save className="h-4.5 w-4.5" /> Save Site Configurations
                  </button>
                </form>
              </div>
            )}

            {activeTab === "content" && (
              <div>
                <div className="border-b pb-4 mb-6">
                  <h2 className="text-xl font-bold text-slate-900 font-heading">
                    Page Content Editor
                  </h2>
                  <p className="text-slate-500 text-xs mt-1">
                    Select a page and customize headings, paragraphs, and labels. Changes save to the database immediately.
                  </p>
                </div>

                <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Select Page:
                  </label>
                  <select
                    value={selectedPage}
                    onChange={(e) => setSelectedPage(e.target.value)}
                    className="px-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-primary text-slate-800 bg-slate-50 font-semibold"
                  >
                    <option value="home">Home Page</option>
                    <option value="about">About Us Page</option>
                    <option value="franchise">Franchise Page</option>
                    <option value="loans">Loans Page</option>
                    <option value="insurance">Insurance Page</option>
                    <option value="real_estate">Real Estate Page</option>
                    <option value="business_advisory">Business Advisory Page</option>
                  </select>
                </div>

                {contentSuccess && (
                  <div className="mb-6 p-3.5 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs font-semibold flex items-center gap-1.5">
                    <CheckCircle className="h-4.5 w-4.5" />
                    <span>Page content updated successfully. Live site changes are saved!</span>
                  </div>
                )}

                {contentLoading ? (
                  <p className="text-slate-500 text-sm">Loading page content...</p>
                ) : (
                  <form onSubmit={handleSaveContent} className="space-y-6">
                    <div className="space-y-6 border border-slate-100 rounded-2xl p-6 bg-slate-50/50">
                      {Object.keys(pageContent).length === 0 ? (
                        <p className="text-slate-400 text-xs italic">No content blocks found for this page.</p>
                      ) : (
                        Object.entries(pageContent).map(([key, val]) => {
                          const label = keyLabels[key] || key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
                          const isTextarea = val.length > 60 || key.includes("desc") || key.includes("subtitle");

                          return (
                            <div key={key}>
                              <label className="block text-xs font-bold text-slate-700 mb-1.5 capitalize font-heading">
                                {label}
                              </label>
                              {isTextarea ? (
                                <textarea
                                  required
                                  rows={3}
                                  value={val}
                                  onChange={(e) => setPageContent({ ...pageContent, [key]: e.target.value })}
                                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-primary text-slate-800 bg-white"
                                />
                              ) : (
                                <input
                                  type="text"
                                  required
                                  value={val}
                                  onChange={(e) => setPageContent({ ...pageContent, [key]: e.target.value })}
                                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-primary text-slate-800 bg-white"
                                />
                              )}
                              <span className="text-[10px] text-slate-400 mt-1 block">Key identifier: <code className="bg-slate-100 px-1 py-0.5 rounded">{key}</code></span>
                            </div>
                          );
                        })
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center gap-1.5 px-6 py-3 rounded-lg text-sm font-bold text-white gradient-primary hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      <Save className="h-4.5 w-4.5" /> Save Page Content
                    </button>
                  </form>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}

const keyLabels: Record<string, string> = {
  hero_title_prefix: "Hero Title Prefix",
  hero_title_accent: "Hero Title Highlight (Accent Text)",
  hero_title: "Hero Main Title",
  hero_subtitle: "Hero Subtitle Paragraph",
  cta_explore: "CTA Explore Button Text",
  cta_schedule: "CTA Schedule Button Text",
  mission_title: "Mission Header Title",
  mission_desc: "Mission Description Text",
  vision_title: "Vision Header Title",
  vision_desc: "Vision Description Text",
  values_title: "Core Values Section Title",
  values_subtitle: "Core Values Section Subtitle",
};
