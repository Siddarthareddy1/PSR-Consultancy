import { useState, useEffect } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const [siteSettings, setSiteSettings] = useState({
    phone: "+91 9110326887",
    email: "sandeepsunnycool7@gmail.com",
    address: "3rd Floor, PSR Heights, Near Hitech City Junction, Madhapur, Hyderabad, Telangana, 500081 (Opposite Timmidkunta Lake)",
    hours: "Open 24 Hours",
    instagram: "https://www.instagram.com/psrconsultancy_hyderabad",
  });

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const res = await fetch("/api/settings");
        if (res.ok) {
          const data = await res.json();
          setSiteSettings(data);
          return;
        }
      } catch (err) {
        console.error("Failed to fetch site settings:", err);
      }

      const saved = localStorage.getItem("psr_site_settings");
      if (saved) {
        try {
          setSiteSettings(JSON.parse(saved));
        } catch {
          // ignore
        }
      }
    };
    loadSettings();
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setEmail("");
        setMessage("Thank you for subscribing!");
      } else {
        setStatus("error");
        setMessage(data.message || "Failed to subscribe. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("An error occurred. Please try again.");
    }
  };

  const services = [
    { name: "Franchise Investment", href: "/services/franchise" },
    { name: "Loans & Financing", href: "/services/loans" },
    { name: "Insurance Solutions", href: "/services/insurance" },
    { name: "Real Estate Consulting", href: "/services/real-estate" },
    { name: "Business Advisory", href: "/services/business-advisory" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-400 pt-20 pb-10 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="border-b border-gray-800 pb-12 mb-12 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="max-w-md">
            <h3 className="text-white text-lg font-bold font-heading mb-1.5">Stay Updated</h3>
            <p className="text-xs text-gray-500">
              Subscribe to get the latest business tax updates, commercial real estate listings, and vetted franchise lists.
            </p>
          </div>
          <div className="w-full lg:w-auto">
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full sm:w-80 px-4 py-2.5 rounded-lg bg-gray-850 border border-gray-800 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-primary transition-colors"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg text-xs font-bold text-gray-900 bg-secondary hover:bg-secondary-light transition-all shadow-sm whitespace-nowrap gap-1.5 disabled:opacity-65"
              >
                {status === "loading" ? "Subscribing..." : "Subscribe"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
            <p className="text-[10px] text-gray-650 mt-2 italic">We respect your privacy. Unsubscribe at any time.</p>
            {message && (
              <p className={`text-xs mt-2 font-bold ${status === "success" ? "text-emerald-400" : "text-rose-450"}`}>
                {message}
              </p>
            )}
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Column 1: Services */}
          <div>
            <h4 className="text-white text-xs uppercase font-extrabold tracking-widest mb-6 font-heading">
              Our Services
            </h4>
            <ul className="space-y-3">
              {services.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-gray-400 hover:text-white text-xs font-medium transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Company */}
          <div>
            <h4 className="text-white text-xs uppercase font-extrabold tracking-widest mb-6 font-heading">
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white text-xs font-medium transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white text-xs font-medium transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white text-xs font-medium transition-colors">
                  Blog Insights
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white text-xs font-medium transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/client/login" className="text-gray-400 hover:text-white text-xs font-medium transition-colors">
                  Client Portal login
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact details */}
          <div>
            <h4 className="text-white text-xs uppercase font-extrabold tracking-widest mb-6 font-heading">
              Get in Touch
            </h4>
            <ul className="space-y-4 text-xs font-medium text-gray-400">
              <li className="flex gap-2">
                <MapPin className="h-4.5 w-4.5 text-primary-light flex-shrink-0" />
                <span>Hyderabad, Telangana, India</span>
              </li>
              <li className="flex gap-2">
                <Phone className="h-4.5 w-4.5 text-primary-light flex-shrink-0" />
                <a href={`tel:${siteSettings.phone.replace(/\s+/g, "")}`} className="hover:text-white transition-colors">
                  {siteSettings.phone}
                </a>
              </li>
              <li className="flex gap-2">
                <Mail className="h-4.5 w-4.5 text-primary-light flex-shrink-0" />
                <a href={`mailto:${siteSettings.email}`} className="hover:text-white transition-colors break-all">
                  {siteSettings.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Brand & Socials */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <span className="h-9 w-9 rounded-lg gradient-primary flex items-center justify-center text-white font-bold text-base shadow border border-secondary/20">
                P1
              </span>
              <span className="text-lg font-bold tracking-tight text-white font-display">
                PSR <span className="text-primary">ONE</span>
              </span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Premium multi-service B2B financial consultancy delivering compliant advisory solutions to scale portfolios.
            </p>
            <div className="flex space-x-3.5">
              <a
                href={siteSettings.instagram}
                target="_blank"
                rel="noreferrer"
                className="h-8 w-8 rounded-lg bg-gray-850 hover:bg-primary hover:text-white flex items-center justify-center text-gray-400 transition-all"
                title="Instagram"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="h-8 w-8 rounded-lg bg-gray-850 hover:bg-primary hover:text-white flex items-center justify-center text-gray-400 transition-all"
                title="LinkedIn"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect width="4" height="12" x="2" y="9"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="h-8 w-8 rounded-lg bg-gray-850 hover:bg-primary hover:text-white flex items-center justify-center text-gray-400 transition-all"
                title="Twitter"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="h-8 w-8 rounded-lg bg-gray-850 hover:bg-primary hover:text-white flex items-center justify-center text-gray-400 transition-all"
                title="Facebook"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright and legal */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between text-xs text-gray-650 gap-4">
          <p>© {new Date().getFullYear()} PSR ONE. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
