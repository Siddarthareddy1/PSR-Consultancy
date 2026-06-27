import { useState, useEffect } from "react";
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
  Landmark,
  Shield,
  Home as HomeIcon,
  Briefcase,
  Star,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export default function Home() {
  const { content } = useContent("home", {
    hero_title_prefix: "Secure Your Wealth, Scale Your Business with ",
    hero_title_accent: "PSR ONE",
    hero_subtitle: "Your premium partner for Franchise Investing, Loans & Capital, Corporate Insurance, Strategic Real Estate Advisory, and Business Growth Consulting.",
    cta_explore: "Explore Our Services",
    cta_schedule: "Schedule Consultation",
  });

  // Testimonial Slider State
  const [currentSlide, setCurrentSlide] = useState(0);

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



  const services = [
    {
      icon: Briefcase,
      name: "Franchise Investment",
      desc: "Unlock lucrative franchise opportunities with vetted brands, secure territorial rights, and end-to-end launch assistance.",
      href: "/services/franchise",
      color: "border-blue-500/20 hover:border-blue-500",
      iconBg: "bg-blue-50 text-blue-600",
    },
    {
      icon: Landmark,
      name: "Loans & Financing",
      desc: "Access customized business loans, mortgage financing, and working capital solutions at competitive, transparent interest rates.",
      href: "/services/loans",
      color: "border-amber-500/20 hover:border-amber-500",
      iconBg: "bg-amber-50 text-amber-600",
    },
    {
      icon: Shield,
      name: "Insurance Solutions",
      desc: "Protect your health, wealth, and enterprise. Custom policies spanning corporate liability, life, health, and keyman insurance.",
      href: "/services/insurance",
      color: "border-emerald-500/20 hover:border-emerald-500",
      iconBg: "bg-emerald-50 text-emerald-600",
    },
    {
      icon: HomeIcon,
      name: "Real Estate Consulting",
      desc: "Navigate commercial and premium residential investments with expert legal vetting, yield calculations, and location audits.",
      href: "/services/real-estate",
      color: "border-indigo-500/20 hover:border-indigo-500",
      iconBg: "bg-indigo-50 text-indigo-600",
    },
    {
      icon: TrendingUp,
      name: "Business Advisory",
      desc: "Accelerate growth, optimize corporate structures, manage risk, and formulate scale-ready exit and fundraising strategies.",
      href: "/services/business-advisory",
      color: "border-purple-500/20 hover:border-purple-500",
      iconBg: "bg-purple-50 text-purple-600",
    },
  ];

  const stats = [
    { label: "Active Corporate Clients", value: "150+" },
    { label: "Total Capital Funded", value: "₹50 Cr+" },
    { label: "Successful Case Rate", value: "98%" },
    { label: "Completed Projects", value: "100+" },
  ];

  return (
    <>
      <Head>
        <title>PSR ONE | Premium Business & Financial Solutions Platform</title>
        <meta
          name="description"
          content="PSR ONE (formerly PSR Consultancy) offers trusted multi-service solutions including Franchise Investments, Business Loans, Insurance Policies, Real Estate Consulting, and Corporate Business Advisory."
        />
        <meta name="keywords" content="PSR ONE, Business Advisory, Business Loans, Insurance, Franchise Investment, Real Estate Consultancy, Hyderabad" />
        <meta property="og:title" content="PSR ONE | Premium Business & Financial Solutions Platform" />
        <meta property="og:description" content="One platform offering multiple corporate and consumer solutions. Invest, secure, scale, and purchase property under expert advisory." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-slate-950 text-white pt-24 pb-16">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        {/* Colorful glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/15 rounded-full blur-[120px] animation-delay-2000"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 flex flex-col items-center">
          <div className="inline-flex items-center space-x-2 bg-slate-900/80 backdrop-blur border border-slate-800 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider text-secondary mb-8">
            <Sparkles className="h-3.5 w-3.5" />
            <span>ONE PLATFORM, MULTIPLE BUSINESS SOLUTIONS</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-white mb-6 max-w-4xl leading-tight">
            {content.hero_title_prefix}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-amber-300">
              {content.hero_title_accent}
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 mb-10 max-w-2xl font-body font-light leading-relaxed">
            {content.hero_subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-16">
            <Link
              href="#services"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl text-sm font-bold text-slate-900 bg-secondary hover:bg-secondary-light shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
            >
              {content.cta_explore} <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/contact?service=consultation"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-all duration-300"
            >
              {content.cta_schedule}
            </Link>
          </div>

          {/* Floating Trust Metrics inside Hero */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-4xl border border-slate-800/80 bg-slate-900/40 backdrop-blur rounded-2xl p-6 sm:p-8">
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-extrabold text-secondary font-display">20+</p>
              <p className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Years Experience</p>
            </div>
            <div className="text-center border-l border-slate-800/80">
              <p className="text-2xl sm:text-3xl font-extrabold text-secondary font-display">10,000+</p>
              <p className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Happy Clients</p>
            </div>
            <div className="text-center border-l border-slate-800/80">
              <p className="text-2xl sm:text-3xl font-extrabold text-secondary font-display">₹50 Cr+</p>
              <p className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Capital Funded</p>
            </div>
            <div className="text-center border-l border-slate-800/80">
              <p className="text-2xl sm:text-3xl font-extrabold text-secondary font-display">98%</p>
              <p className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Certification Badges Section */}
      <section className="relative z-20 -mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 sm:p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-emerald-50 text-emerald-650 flex items-center justify-center flex-shrink-0">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 font-heading">ISO Certified</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Compliant with global standards</p>
            </div>
          </div>
          <div className="flex items-center gap-3 lg:border-l lg:border-slate-100 lg:pl-6">
            <div className="h-10 w-10 rounded-lg bg-blue-50 text-blue-650 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 font-heading">Licensed & Registered</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Approved corporate syndicates</p>
            </div>
          </div>
          <div className="flex items-center gap-3 lg:border-l lg:border-slate-100 lg:pl-6">
            <div className="h-10 w-10 rounded-lg bg-purple-50 text-purple-650 flex items-center justify-center flex-shrink-0">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 font-heading">24/7 Support</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Always available for urgent queries</p>
            </div>
          </div>
          <div className="flex items-center gap-3 lg:border-l lg:border-slate-100 lg:pl-6">
            <div className="h-10 w-10 rounded-lg bg-amber-50 text-amber-650 flex items-center justify-center flex-shrink-0">
              <Star className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 font-heading">100% Regulatory Compliant</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Following strict legal guidelines</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview Section */}
      <section id="services" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 mb-4">
              Comprehensive Core Solutions
            </h2>
            <p className="text-slate-500 font-body text-base sm:text-lg">
              Explore our core pillars of enterprise growth and financial protection. We deliver tailored strategies that fuel growth and secure prosperity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => {
              const IconComp = service.icon;
              const accentColor = 
                idx === 0 ? "#EA580C" : 
                idx === 1 ? "#16A34A" : 
                idx === 2 ? "#7C3AED" : 
                idx === 3 ? "#0891B2" : "#D97706";

              const borderStyles = { borderLeft: `4px solid ${accentColor}` };
              const badgeNumber = `0${idx + 1}`;

              return (
                <div
                  key={idx}
                  style={borderStyles}
                  className="bg-white rounded-2xl p-8 border border-slate-150 hover:shadow-xl transition-all duration-300 flex flex-col h-full relative group transform hover:-translate-y-2"
                >
                  {/* Top-right number badge */}
                  <span className="absolute top-6 right-6 text-slate-200 font-extrabold text-2xl font-display group-hover:text-slate-350 transition-colors">
                    {badgeNumber}
                  </span>

                  <div className={`h-14 w-14 rounded-xl ${service.iconBg} flex items-center justify-center mb-6`}>
                    <IconComp className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 font-heading">
                    {service.name}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">
                    {service.desc}
                  </p>
                  <Link
                    href={service.href}
                    className="inline-flex items-center font-bold text-sm text-slate-900 hover:opacity-80 group/link transition-colors"
                  >
                    Learn More{" "}
                    <ArrowRight className="ml-1 h-4 w-4 transform group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 gradient-primary text-white relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-secondary/10 rounded-full blur-[120px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className="text-4xl sm:text-5xl font-extrabold text-secondary font-display mb-2">
                  {stat.value}
                </span>
                <span className="text-slate-300 text-xs sm:text-sm tracking-wide uppercase font-semibold font-heading">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Slider */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-1 bg-slate-50 border border-slate-100 px-3 py-1 rounded-full text-xs font-bold text-primary mb-6">
            <Users className="h-3.5 w-3.5 text-secondary" />
            <span>CLIENT SUCCESS STORIES</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 mb-12">
            What Our Partners Say
          </h2>

          <div className="relative bg-slate-50 rounded-3xl border border-slate-100 p-8 sm:p-16 shadow-sm overflow-hidden">
            {/* Slide */}
            <div className="min-h-[220px] flex flex-col justify-center transition-all duration-500">
              <div className="flex justify-center space-x-1 mb-6">
                {[...Array(testimonials[currentSlide].rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-secondary text-secondary" />
                ))}
              </div>
              <p className="text-slate-700 text-lg sm:text-xl md:text-2xl font-body italic leading-relaxed max-w-3xl mx-auto mb-8">
                &ldquo;{testimonials[currentSlide].quote}&rdquo;
              </p>
              <div>
                <h4 className="text-slate-950 font-bold text-base sm:text-lg font-heading">
                  {testimonials[currentSlide].name}
                </h4>
                <p className="text-slate-500 text-sm mb-3">
                  {testimonials[currentSlide].role}
                </p>
                <span className="inline-flex px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-xs font-bold text-emerald-600">
                  {testimonials[currentSlide].result}
                </span>
              </div>
            </div>

            {/* Slider Controls */}
            <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-8">
              <button
                onClick={handlePrevSlide}
                className="p-2 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 shadow-sm transition-colors hover:text-primary focus:outline-none"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-4 md:right-8">
              <button
                onClick={handleNextSlide}
                className="p-2 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 shadow-sm transition-colors hover:text-primary focus:outline-none"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Dots */}
            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentSlide === idx ? "w-6 bg-primary" : "w-2 bg-slate-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Background gradient from deep blue to gold */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary to-secondary/80"></div>
        {/* Decorative pattern overlay */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_1px_1px,#fff_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white mb-4">
            Ready to Transform & Secure Your Business?
          </h2>
          <p className="text-slate-100 font-body text-base sm:text-lg mb-8 max-w-xl mx-auto">
            Schedule an online or offline consultation with our senior advisory team. Let&apos;s evaluate your project capital or portfolio coverage.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact?service=consultation"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-lg text-base font-bold text-slate-900 bg-white hover:bg-slate-50 transition-colors shadow-md card-hover"
            >
              Start Consultation
            </Link>
            <Link
              href="#services"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-lg text-base font-bold text-white border border-white hover:bg-white/10 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
