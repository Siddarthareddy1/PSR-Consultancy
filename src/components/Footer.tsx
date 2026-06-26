import { useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

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
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Brand & Bio */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <span className="h-9 w-9 rounded-lg gradient-primary flex items-center justify-center text-white font-bold text-base border border-secondary/30">
                P1
              </span>
              <span className="text-lg font-bold tracking-tight text-white font-display">
                PSR <span className="text-secondary">ONE</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              One platform offering multiple enterprise and consumer business solutions: Insurance, Franchising, Real Estate, Loans, and Consulting.
            </p>
            <div className="flex space-x-4">
              {/* Social Media Link Mockups */}
              <a href="#" className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-secondary hover:bg-slate-700 transition-colors">
                <span className="text-xs font-bold">in</span>
              </a>
              <a href="#" className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-secondary hover:bg-slate-700 transition-colors">
                <span className="text-xs font-bold">tw</span>
              </a>
              <a href="#" className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-secondary hover:bg-slate-700 transition-colors">
                <span className="text-xs font-bold">fb</span>
              </a>
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-6 font-heading">
              Our Services
            </h3>
            <ul className="space-y-3">
              {services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-slate-400 hover:text-secondary text-sm transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Info */}
          <div>
            <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-6 font-heading">
              Contact Info
            </h3>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li>
                <span className="text-white font-medium">Office:</span> 3rd Floor, PSR Heights, Madhapur, Hyderabad, Telangana, India
              </li>
              <li>
                <span className="text-white font-medium">Phone:</span>{" "}
                <a href="tel:+919121395329" className="hover:text-secondary">
                  +91 9121395329
                </a>
              </li>
              <li>
                <span className="text-white font-medium">Email:</span>{" "}
                <a href="mailto:support@psrone.com" className="hover:text-secondary">
                  support@psrone.com
                </a>
              </li>
              <li>
                <span className="text-white font-medium">Hours:</span> Mon - Sat, 9:00 AM - 6:00 PM
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-6 font-heading">
              Newsletter
            </h3>
            <p className="text-slate-400 text-sm mb-4">
              Subscribe to get the latest business tips, real estate insights, and franchise opportunities.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-secondary transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full px-4 py-2.5 rounded-lg font-bold text-sm bg-secondary hover:bg-secondary-dark text-slate-900 transition-colors shadow-md disabled:opacity-65"
              >
                {status === "loading" ? "Subscribing..." : "Subscribe"}
              </button>
              {message && (
                <p
                  className={`text-xs mt-2 font-medium ${
                    status === "success" ? "text-emerald-400" : "text-rose-400"
                  }`}
                >
                  {message}
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} PSR ONE. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="hover:text-secondary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-secondary transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
