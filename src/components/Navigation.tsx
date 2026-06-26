import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChevronDown } from "lucide-react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on page change
  useEffect(() => {
    setIsOpen(false);
    setServicesDropdown(false);
  }, [router.asPath]);

  const services = [
    { name: "Franchise Investment", href: "/services/franchise" },
    { name: "Loans & Financing", href: "/services/loans" },
    { name: "Insurance Solutions", href: "/services/insurance" },
    { name: "Real Estate Consulting", href: "/services/real-estate" },
    { name: "Business Advisory", href: "/services/business-advisory" },
  ];

  const isActive = (path: string) => router.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "glassmorphism shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <span className="h-10 w-10 rounded-lg gradient-primary flex items-center justify-center text-white font-bold text-lg shadow-md border border-secondary/30">
                P1
              </span>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight font-display text-primary">
                  PSR <span className="text-secondary">ONE</span>
                </span>
                <span className="text-[10px] uppercase tracking-widest text-neutralDark/70 font-semibold -mt-1">
                  Business Solutions
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`font-semibold transition-colors hover:text-primary ${
                isActive("/") ? "text-primary border-b-2 border-secondary" : "text-neutralDark/80"
              }`}
            >
              Home
            </Link>

            {/* Services Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setServicesDropdown(true)}
                onClick={() => setServicesDropdown(!servicesDropdown)}
                className={`flex items-center font-semibold transition-colors hover:text-primary focus:outline-none ${
                  router.pathname.startsWith("/services")
                    ? "text-primary"
                    : "text-neutralDark/80"
                }`}
              >
                Services <ChevronDown className="ml-1 h-4 w-4" />
              </button>

              {servicesDropdown && (
                <div
                  onMouseLeave={() => setServicesDropdown(false)}
                  className="absolute left-0 mt-2 w-64 rounded-xl shadow-xl bg-white border border-slate-100 py-2 ring-1 ring-black ring-opacity-5 focus:outline-none transition-all duration-200"
                >
                  {services.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`block px-4 py-3 text-sm hover:bg-slate-50 transition-colors ${
                        isActive(item.href)
                          ? "text-primary font-bold bg-slate-50"
                          : "text-neutralDark/80 hover:text-primary"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/about"
              className={`font-semibold transition-colors hover:text-primary ${
                isActive("/about") ? "text-primary border-b-2 border-secondary" : "text-neutralDark/80"
              }`}
            >
              About Us
            </Link>

            <Link
              href="/blog"
              className={`font-semibold transition-colors hover:text-primary ${
                isActive("/blog") ? "text-primary border-b-2 border-secondary" : "text-neutralDark/80"
              }`}
            >
              Blog
            </Link>

            <Link
              href="/contact"
              className={`font-semibold transition-colors hover:text-primary ${
                isActive("/contact") ? "text-primary border-b-2 border-secondary" : "text-neutralDark/80"
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/contact?service=consultation"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-bold text-white gradient-primary hover:opacity-90 shadow-md card-hover border border-secondary/20"
            >
              Schedule Consultation
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-neutralDark hover:text-primary hover:bg-slate-100 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <span className="text-xl font-bold font-heading">✕</span> : <span className="text-xl font-bold font-heading">☰</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className={`block px-3 py-3 rounded-lg text-base font-semibold ${
                isActive("/") ? "bg-slate-100 text-primary font-bold" : "text-neutralDark/85 hover:bg-slate-50"
              }`}
            >
              Home
            </Link>

            {/* Services Group */}
            <div className="space-y-1">
              <span className="block px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                Our Services
              </span>
              {services.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block pl-6 pr-3 py-2.5 rounded-lg text-sm font-semibold ${
                    isActive(item.href)
                      ? "bg-slate-100 text-primary font-bold"
                      : "text-neutralDark/75 hover:bg-slate-50"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <Link
              href="/about"
              className={`block px-3 py-3 rounded-lg text-base font-semibold ${
                isActive("/about") ? "bg-slate-100 text-primary font-bold" : "text-neutralDark/85 hover:bg-slate-50"
              }`}
            >
              About Us
            </Link>

            <Link
              href="/blog"
              className={`block px-3 py-3 rounded-lg text-base font-semibold ${
                isActive("/blog") ? "bg-slate-100 text-primary font-bold" : "text-neutralDark/85 hover:bg-slate-50"
              }`}
            >
              Blog
            </Link>

            <Link
              href="/contact"
              className={`block px-3 py-3 rounded-lg text-base font-semibold ${
                isActive("/contact") ? "bg-slate-100 text-primary font-bold" : "text-neutralDark/85 hover:bg-slate-50"
              }`}
            >
              Contact
            </Link>

            <div className="pt-4 pb-2 px-3">
              <Link
                href="/contact?service=consultation"
                className="w-full inline-flex items-center justify-center px-4 py-3 rounded-lg text-base font-bold text-white gradient-primary hover:opacity-90 shadow-md"
              >
                Schedule Consultation
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
