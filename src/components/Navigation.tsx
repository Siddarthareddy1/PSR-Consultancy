import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";

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

  // Custom Underline Style class helper
  const linkClass = (path: string) => {
    const active = isActive(path);
    return `relative py-1.5 text-sm font-semibold tracking-wide transition-colors duration-200 hover:text-primary after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-primary after:transition-all after:duration-200 ${
      active ? "text-primary after:w-full" : "text-gray-650 hover:after:w-full after:w-0"
    }`;
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-md py-3.5 border-b border-gray-100"
            : "bg-transparent py-6 border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center space-x-2.5">
                <span className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center text-white font-bold text-lg shadow-md border border-secondary/20">
                  P1
                </span>
                <div className="flex flex-col">
                  <span className="text-xl font-extrabold tracking-tight font-display text-gray-900 leading-none">
                    PSR <span className="text-primary">ONE</span>
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mt-1">
                    Consultancy
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Nav Items */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className={linkClass("/")}>
                Home
              </Link>

              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setServicesDropdown(true)}
                onMouseLeave={() => setServicesDropdown(false)}
              >
                <button
                  onClick={() => setServicesDropdown(!servicesDropdown)}
                  className={`flex items-center py-1.5 text-sm font-semibold tracking-wide transition-colors duration-200 hover:text-primary focus:outline-none ${
                    router.pathname.startsWith("/services") ? "text-primary" : "text-gray-650"
                  }`}
                >
                  Services <ChevronDown className="ml-1 h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" />
                </button>

                {servicesDropdown && (
                  <div className="absolute left-0 mt-2 w-64 rounded-xl shadow-xl bg-white border border-gray-100 py-2.5 focus:outline-none transition-all duration-200 scale-in z-50">
                    {services.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`block px-4 py-3 text-xs font-bold transition-colors ${
                          isActive(item.href)
                            ? "text-primary bg-gray-50/80"
                            : "text-gray-700 hover:bg-gray-50 hover:text-primary"
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link href="/about" className={linkClass("/about")}>
                About Us
              </Link>

              <Link href="/blog" className={linkClass("/blog")}>
                Blog
              </Link>

              <Link href="/contact" className={linkClass("/contact")}>
                Contact
              </Link>
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                href="/contact?service=consultation"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-xs font-bold text-white bg-primary hover:bg-primary-dark transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
              >
                Schedule Consultation
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:text-primary hover:bg-gray-100 focus:outline-none transition-colors"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer (Left Slide-in) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden md:hidden">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity duration-300 fade-in"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Panel */}
          <div className="fixed inset-y-0 left-0 max-w-full flex">
            <div className="w-screen max-w-sm bg-white shadow-2xl flex flex-col slide-in-left">
              {/* Drawer Header */}
              <div className="px-5 py-6 border-b border-gray-100 flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                  <span className="h-9 w-9 rounded-lg gradient-primary flex items-center justify-center text-white font-bold text-base shadow">
                    P1
                  </span>
                  <span className="text-lg font-extrabold tracking-tight font-display text-gray-900">
                    PSR <span className="text-primary">ONE</span>
                  </span>
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                >
                  <X className="h-5.5 w-5.5" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 py-6 px-5 overflow-y-auto space-y-6">
                <div className="flex flex-col space-y-4">
                  <Link
                    href="/"
                    className={`text-base font-bold px-3 py-2 rounded-lg transition-colors ${
                      isActive("/") ? "bg-primary-light/40 text-primary" : "text-gray-800 hover:bg-gray-50"
                    }`}
                  >
                    Home
                  </Link>

                  <div className="space-y-2">
                    <span className="block px-3 text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                      Core Services
                    </span>
                    {services.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`block pl-6 pr-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                          isActive(item.href) ? "bg-primary-light/20 text-primary font-bold" : "text-gray-650 hover:bg-gray-50"
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>

                  <Link
                    href="/about"
                    className={`text-base font-bold px-3 py-2 rounded-lg transition-colors ${
                      isActive("/about") ? "bg-primary-light/40 text-primary" : "text-gray-800 hover:bg-gray-50"
                    }`}
                  >
                    About Us
                  </Link>

                  <Link
                    href="/blog"
                    className={`text-base font-bold px-3 py-2 rounded-lg transition-colors ${
                      isActive("/blog") ? "bg-primary-light/40 text-primary" : "text-gray-800 hover:bg-gray-50"
                    }`}
                  >
                    Blog
                  </Link>

                  <Link
                    href="/contact"
                    className={`text-base font-bold px-3 py-2 rounded-lg transition-colors ${
                      isActive("/contact") ? "bg-primary-light/40 text-primary" : "text-gray-800 hover:bg-gray-50"
                    }`}
                  >
                    Contact
                  </Link>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="p-5 border-t border-gray-100 bg-gray-50">
                <Link
                  href="/contact?service=consultation"
                  className="w-full inline-flex items-center justify-center px-4 py-3 rounded-lg text-sm font-bold text-white bg-primary hover:bg-primary-dark transition-colors shadow-md"
                >
                  Schedule Consultation <ArrowRight className="ml-1.5 h-4.5 w-4.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
