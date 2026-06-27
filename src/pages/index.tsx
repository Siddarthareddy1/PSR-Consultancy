import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Head from "next/head";
import { useContent } from "@/lib/useContent";
import {
  Award,
  Users,
  Clock,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  Shield,
  Building,
  Target,
  Wallet,
  Star,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ChevronDown,
} from "lucide-react";

// Animated Counter Component on scroll-into-view
function Counter({ to, duration = 2000, suffix = "" }: { to: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const end = to;
    const totalMs = duration;
    const incrementTime = Math.max(Math.floor(totalMs / end), 25);

    const timer = setInterval(() => {
      start += Math.ceil(end / (totalMs / incrementTime));
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [started, to, duration]);

  return (
    <span ref={elementRef} className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function Home() {
  const { content } = useContent("home", {
    hero_title_prefix: "Secure Your Wealth, Scale Your Business with ",
    hero_title_accent: "PSR ONE",
    hero_subtitle: "Your premium partner for Franchise Investing, Loans & Capital, Corporate Insurance, Strategic Real Estate Advisory, and Business Growth Consulting.",
    cta_explore: "Explore Our Services",
    cta_schedule: "Schedule Consultation",
  });

  const [currentSlide, setCurrentSlide] = useState(0);
  const [faqOpen, setFaqOpen] = useState<Record<number, boolean>>({});

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Franchise Partner, Bangalore",
      rating: 5,
      quote: "PSR ONE helped me select the right retail franchise and supported the entire financing setup. Their approach was transparent and highly professional from start to finish.",
      result: "14% Month-on-Month Revenue Growth",
    },
    {
      name: "Priya Sharma",
      role: "Founder, Zenith Logistics",
      rating: 5,
      quote: "Getting our business expansion loan was incredibly fast. PSR ONE's financial advisory team structured our proposal perfectly, ensuring ₹5 Cr funding within 10 business days.",
      result: "₹5 Cr Expansion Funding Secured",
    },
    {
      name: "Amit Patel",
      role: "Property Investor, Mumbai",
      rating: 5,
      quote: "Their real estate advisory gave us deep market insights that saved us from making a costly layout mistake. Their legal vetting is top-notch and builds immense peace of mind.",
      result: "32% ROI on Commercial Portfolio",
    },
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(slideInterval);
  }, [testimonials.length]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const toggleFaq = (index: number) => {
    setFaqOpen((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const services = [
    {
      icon: Target,
      name: "Franchise Investment",
      desc: "Unlock lucrative franchise opportunities with vetted brands, secure territorial rights, and end-to-end launch assistance.",
      href: "/services/franchise",
      color: "border-l-4 border-l-[#EA580C] hover:border-l-[#EA580C]",
      iconBg: "bg-orange-50 text-[#EA580C]",
      badge: "01",
    },
    {
      icon: Wallet,
      name: "Loans & Financing",
      desc: "Access customized business loans, mortgage financing, and working capital solutions at competitive, transparent interest rates.",
      href: "/services/loans",
      color: "border-l-4 border-l-[#16A34A] hover:border-l-[#16A34A]",
      iconBg: "bg-emerald-50 text-[#16A34A]",
      badge: "02",
    },
    {
      icon: Shield,
      name: "Insurance Solutions",
      desc: "Protect your health, wealth, and enterprise. Custom policies spanning corporate liability, life, health, and keyman insurance.",
      href: "/services/insurance",
      color: "border-l-4 border-l-[#7C3AED] hover:border-l-[#7C3AED]",
      iconBg: "bg-purple-50 text-[#7C3AED]",
      badge: "03",
    },
    {
      icon: Building,
      name: "Real Estate Consulting",
      desc: "Navigate commercial and premium residential investments with expert legal vetting, yield calculations, and location audits.",
      href: "/services/real-estate",
      color: "border-l-4 border-l-[#0891B2] hover:border-l-[#0891B2]",
      iconBg: "bg-cyan-50 text-[#0891B2]",
      badge: "04",
    },
    {
      icon: TrendingUp,
      name: "Business Advisory",
      desc: "Accelerate growth, optimize corporate structures, manage risk, and formulate scale-ready exit and fundraising strategies.",
      href: "/services/business-advisory",
      color: "border-l-4 border-l-[#D97706] hover:border-l-[#D97706]",
      iconBg: "bg-amber-50 text-[#D97706]",
      badge: "05",
    },
  ];

  const certifications = [
    { icon: Award, title: "ISO Certified", desc: "Global standards compliance" },
    { icon: ShieldCheck, title: "Licensed & Registered", desc: "Approved corporate channels" },
    { icon: Clock, title: "24/7 Support", desc: "Always here for client actions" },
    { icon: Star, title: "100% Compliant", desc: "Regulated advisory standards" },
  ];

  const faqs = [
    {
      q: "How long does the consultation process take?",
      a: "Our initial strategic assessment takes 30-45 minutes. During this session, we outline parameters, document criteria, and deliver custom pipeline proposals.",
    },
    {
      q: "What is your success rate?",
      a: "We maintain a 98% successful case rate across business loan syndications, territorial franchise acquisitions, and corporate risk underwriting.",
    },
    {
      q: "Do you offer flexible payment plans?",
      a: "Yes, we structure advisory arrangements, commission syndicates, and milestone payments based on the total capital scale of the project.",
    },
    {
      q: "Are you certified and regulated?",
      a: "Yes. PSR ONE is registered, ISO certified, and compliant with standard corporate guidelines, RBI lender circles, and IRDAI risk frameworks.",
    },
    {
      q: "What documents do I need to provide?",
      a: "Required documentation varies by service. Typically, we require basic KYC identification, company registration certificates, tax statements, or estate documents.",
    },
    {
      q: "How do I get started?",
      a: "Simply click the 'Schedule Consultation' button, fill out our 3-step wizard intake, and an advisory partner will contact you within 2 business hours.",
    },
  ];

  return (
    <>
      <Head>
        <title>PSR ONE | Premium Business & Financial Solutions Platform</title>
        <meta
          name="description"
          content="PSR ONE offers trusted multi-service solutions including Franchise Investments, Business Loans, Insurance Policies, Real Estate Consulting, and Corporate Business Advisory."
        />
        <meta name="keywords" content="PSR ONE, Business Advisory, Business Loans, Insurance, Franchise Investment, Real Estate Consultancy, Hyderabad" />
      </Head>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-950 text-white pt-28 pb-16">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4.5rem_4.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40"></div>
        
        {/* Animated colorful glows */}
        <div className="absolute top-1/4 left-1/4 w-[35rem] h-[35rem] bg-primary/20 rounded-full blur-[140px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[35rem] h-[35rem] bg-purple-900/15 rounded-full blur-[140px] animation-delay-2000"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Text & CTAs */}
            <div className="lg:col-span-7 text-left space-y-6 slide-in-left">
              <div className="inline-flex items-center space-x-2 bg-gray-900/90 backdrop-blur border border-gray-800 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider text-secondary">
                <Sparkles className="h-3.5 w-3.5" />
                <span>ONE PLATFORM, MULTIPLE BUSINESS SOLUTIONS</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-[2.75rem] font-display font-extrabold tracking-tight text-white leading-tight">
                {content.hero_title_prefix}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-amber-300">
                  {content.hero_title_accent}
                </span>
              </h1>

              <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl">
                {content.hero_subtitle}
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <Link
                  href="#services"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-lg text-xs font-bold text-gray-900 bg-secondary hover:bg-secondary-light transition-all duration-200 shadow-md transform hover:-translate-y-0.5"
                >
                  {content.cta_explore} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/contact?service=consultation"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-lg text-xs font-bold text-white bg-gray-900 hover:bg-gray-850 border border-gray-850 transition-all duration-205"
                >
                  {content.cta_schedule}
                </Link>
              </div>

              {/* Stats Counters inside Hero */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-gray-800/80">
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-secondary font-display">
                    <Counter to={20} suffix="+" />
                  </p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1">Years Experience</p>
                </div>
                <div className="border-l border-gray-800/80 pl-4">
                  <p className="text-2xl sm:text-3xl font-extrabold text-secondary font-display">
                    <Counter to={10000} suffix="+" />
                  </p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1">Clients Served</p>
                </div>
                <div className="border-l border-gray-800/80 pl-4">
                  <p className="text-2xl sm:text-3xl font-extrabold text-secondary font-display">
                    ₹<Counter to={50} suffix=" Cr+" />
                  </p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1">Capital Funded</p>
                </div>
                <div className="border-l border-gray-800/80 pl-4">
                  <p className="text-2xl sm:text-3xl font-extrabold text-secondary font-display">
                    <Counter to={98} suffix="%" />
                  </p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1">Success Rate</p>
                </div>
              </div>
            </div>

            {/* Right Column: Abstract Glassmorphic Illustration */}
            <div className="lg:col-span-5 hidden lg:flex justify-center items-center slide-in-right">
              <div className="relative w-80 h-96 bg-gray-900/30 rounded-3xl border border-gray-800 p-6 flex flex-col justify-between shadow-2xl glassmorphic overflow-hidden">
                {/* Decorative floating grids */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-secondary/15 rounded-full blur-2xl"></div>

                {/* Dashboard Header UI Mock */}
                <div className="flex items-center justify-between border-b border-gray-800/80 pb-3">
                  <div className="flex items-center space-x-2">
                    <span className="h-3 w-3 rounded-full bg-rose-500"></span>
                    <span className="h-3 w-3 rounded-full bg-amber-500"></span>
                    <span className="h-3 w-3 rounded-full bg-emerald-500"></span>
                  </div>
                  <span className="text-[9px] uppercase tracking-widest text-gray-500 font-bold">Secure Syndicate Portal</span>
                </div>

                {/* Visualization elements */}
                <div className="my-6 space-y-4">
                  <div className="p-3 bg-gray-950/65 rounded-xl border border-gray-800 flex items-center justify-between">
                    <div>
                      <p className="text-[9px] text-gray-500 uppercase font-bold tracking-wider">Advisory Pipeline</p>
                      <p className="text-xs font-bold text-white mt-0.5">Franchise Territory Acquisition</p>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[8px] font-bold uppercase">Active</span>
                  </div>

                  <div className="p-3 bg-gray-950/65 rounded-xl border border-gray-800 flex items-center justify-between">
                    <div>
                      <p className="text-[9px] text-gray-500 uppercase font-bold tracking-wider">Syndicated Funding</p>
                      <p className="text-xs font-bold text-white mt-0.5">₹2.4 Cr Term Loan approved</p>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-primary/20 text-primary-light text-[8px] font-bold uppercase">Closed</span>
                  </div>

                  {/* Abstract Graph Simulation */}
                  <div className="pt-2">
                    <div className="flex justify-between items-end h-16 gap-2">
                      <div className="bg-gray-800 w-full h-8 rounded-sm"></div>
                      <div className="bg-gray-800 w-full h-12 rounded-sm"></div>
                      <div className="bg-primary w-full h-16 rounded-sm animate-pulse"></div>
                      <div className="bg-secondary w-full h-14 rounded-sm"></div>
                      <div className="bg-gray-800 w-full h-10 rounded-sm"></div>
                    </div>
                    <div className="flex justify-between text-[8px] text-gray-500 mt-1 font-mono">
                      <span>MON</span>
                      <span>WED</span>
                      <span>FRI</span>
                    </div>
                  </div>
                </div>

                {/* Footer status bar */}
                <div className="border-t border-gray-800/80 pt-3 flex items-center justify-between text-[9px] text-gray-400 font-bold">
                  <span>Connection: SSL Secure</span>
                  <span className="text-emerald-400">● Live</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certification Badges Section */}
      <section className="relative z-20 -mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-150 p-6 sm:p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-4 p-2 transition-all hover:bg-gray-50 rounded-xl"
              >
                <div className="h-10 w-10 rounded-lg bg-gray-50 text-primary flex items-center justify-center flex-shrink-0 shadow-inner">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900 font-heading">{item.title}</h4>
                  <p className="text-[10px] text-gray-500 mt-0.5 leading-tight">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-gray-900">
              Comprehensive Corporate Solutions
            </h2>
            <p className="text-gray-550 text-sm leading-relaxed">
              Explore our core pillars of enterprise growth and financial security. We deliver custom parameters, legal vetting, and syndication resources.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  style={{ borderLeftWidth: "4px" }}
                  className={`bg-white rounded-2xl p-8 border border-gray-150 hover:shadow-xl transition-all duration-300 flex flex-col h-full relative group transform hover:-translate-y-2 ${item.color}`}
                >
                  {/* Top-Right Number Badge */}
                  <span className="absolute top-6 right-6 text-gray-200 font-extrabold text-2xl font-display group-hover:text-gray-300 transition-colors">
                    {item.badge}
                  </span>

                  <div className={`h-12 w-12 rounded-xl ${item.iconBg} flex items-center justify-center mb-6 flex-shrink-0 shadow-sm`}>
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-3 font-heading">
                    {item.name}
                  </h3>
                  
                  <p className="text-gray-500 text-xs leading-relaxed mb-6 flex-grow">
                    {item.desc}
                  </p>

                  <Link
                    href={item.href}
                    className="inline-flex items-center font-bold text-xs text-gray-900 hover:opacity-85 group/link transition-colors"
                  >
                    Learn More{" "}
                    <ArrowRight className="ml-1 h-3.5 w-3.5 transform group-hover/link:translate-x-1.5 transition-transform duration-200" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Slider */}
      <section className="py-24 bg-white border-t border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-1.5 bg-gray-50 border border-gray-150 px-3.5 py-1 rounded-full text-[10px] font-bold text-primary mb-6">
            <Users className="h-3.5 w-3.5 text-secondary" />
            <span>CLIENT SUCCESS STORIES</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-gray-900 mb-12">
            What Our Partners Say
          </h2>

          <div className="relative bg-gray-50 rounded-2xl border border-gray-150 p-8 sm:p-14 shadow-sm overflow-hidden">
            {/* Slide content */}
            <div className="min-h-[14rem] flex flex-col justify-center transition-all duration-300">
              <div className="flex justify-center space-x-1 mb-5">
                {[...Array(testimonials[currentSlide].rating)].map((_, i) => (
                  <Star key={i} className="h-4.5 w-4.5 fill-secondary text-secondary" />
                ))}
              </div>
              <p className="text-gray-800 text-base sm:text-lg italic leading-relaxed max-w-2xl mx-auto mb-6">
                &ldquo;{testimonials[currentSlide].quote}&rdquo;
              </p>
              <div>
                <h4 className="text-gray-900 font-extrabold text-sm font-heading">
                  {testimonials[currentSlide].name}
                </h4>
                <p className="text-gray-500 text-xs mt-0.5">
                  {testimonials[currentSlide].role}
                </p>
                <div className="mt-3">
                  <span className="inline-flex px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-[10px] font-bold text-emerald-600">
                    {testimonials[currentSlide].result}
                  </span>
                </div>
              </div>
            </div>

            {/* Slider Controls */}
            <div className="absolute top-1/2 -translate-y-1/2 left-3 sm:left-6">
              <button
                onClick={handlePrevSlide}
                className="p-2 rounded-lg bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 shadow-sm transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-3 sm:right-6">
              <button
                onClick={handleNextSlide}
                className="p-2 rounded-lg bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 shadow-sm transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Indicator Dots */}
            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentSlide === idx ? "w-6 bg-primary" : "w-2 bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Accordion FAQ Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-gray-900">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-500 text-sm">
              Find answers to commonly asked questions about our process, compliance guidelines, and advisory terms.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = faqOpen[idx] || false;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-gray-205 overflow-hidden transition-all shadow-sm"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none hover:bg-gray-50/50 transition-colors"
                  >
                    <span className="text-sm font-bold text-gray-900 font-heading">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`h-4.5 w-4.5 text-gray-500 transition-transform duration-250 ${
                        isOpen ? "transform rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen ? "max-h-40 border-t border-gray-100" : "max-h-0"
                    }`}
                  >
                    <div className="p-6 text-xs sm:text-sm text-gray-550 leading-relaxed bg-gray-50/30">
                      {faq.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Banner Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary to-secondary/80"></div>
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_1px_1px,#fff_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
            Ready to Transform & Secure Your Business?
          </h2>
          <p className="text-slate-100 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Schedule an online or offline consultation with our senior advisory team. Let&apos;s evaluate your project capital or portfolio coverage.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/contact?service=consultation"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-lg text-xs font-bold text-gray-900 bg-white hover:bg-gray-50 transition-colors shadow-md transform hover:-translate-y-0.5"
            >
              Start Consultation
            </Link>
            <Link
              href="#services"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-lg text-xs font-bold text-white border border-white hover:bg-white/10 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
