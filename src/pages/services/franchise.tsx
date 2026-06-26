import Head from "next/head";
import Link from "next/link";
import Accordion from "@/components/Common/Accordion";
import {
  Award,
  Users,
  Compass,
  FileText,
  MapPin,
  HelpCircle,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

export default function FranchiseInvestment() {
  const faqItems = [
    {
      question: "What is the minimum investment required for a franchise?",
      answer: "Franchise investments vary significantly depending on the sector and brand level. Entry-level food & beverage kiosks start from ₹5-10 Lakhs, while premium retail and fine dining brands can range from ₹50 Lakhs to over ₹2 Crores.",
    },
    {
      question: "How do you select which brands to recommend?",
      answer: "We put every brand through a rigorous vetting process assessing operational history (minimum 3 years), unit economics, supply chain reliability, and corporate training capability. Only the top 8% of brands pass our evaluation.",
    },
    {
      question: "Is territory exclusivity guaranteed?",
      answer: "Yes, standard agreements include territorial rights ensuring no other franchisee of the same brand can open within a designated radius (typically 3-5 km or postal code area, depending on density).",
    },
    {
      question: "What support does the brand corporate office provide?",
      answer: "Brands provide initial site selection assistance, store setup design, staff training (front-of-house and kitchen/technical), grand launch marketing kits, and continuous supply chain inventory refills.",
    },
  ];

  const features = [
    {
      title: "Pre-Vetted Brands",
      desc: "Zero guesswork. Choose from retail, food & beverage, logistics, and education franchises vetted for strong unit economics.",
      icon: CheckCircle2,
    },
    {
      title: "Exclusive Territories",
      desc: "Guaranteed demographic exclusivity in your district or postal zone to protect your market capture.",
      icon: MapPin,
    },
    {
      title: "Launch & Fit-out Support",
      desc: "Technical guidance on site selection, architectural layout compliance, and commercial contractor supervision.",
      icon: Compass,
    },
    {
      title: "Operational Audits",
      desc: "Quarterly business health reviews and audit checkups to ensure high efficiency and prevent revenue leakages.",
      icon: FileText,
    },
    {
      title: "Staff & Management Training",
      desc: "Comprehensive SOP documentation and workforce onboarding programs backed by parent brand academies.",
      icon: Users,
    },
    {
      title: "Regulatory Licensing",
      desc: "End-to-end processing of commercial licenses, fire safety certificates, municipal registrations, and tax setups.",
      icon: Award,
    },
  ];

  const pricingTiers = [
    {
      name: "Basic Setup",
      price: "₹10L - ₹25L",
      desc: "Ideal for local kiosks, express outlets, and startup retail brands.",
      features: [
        "Brand selection assistance",
        "Basic demographic research",
        "Agreement documentation review",
        "Initial layout audit",
        "Launch marketing layout",
      ],
      cta: "Schedule Advisory",
    },
    {
      name: "Expansion Tier",
      price: "₹25L - ₹75L",
      desc: "Suitable for casual dining, established tutoring networks, and modern salons.",
      features: [
        "All Basic setups included",
        "Detailed competitor mapping",
        "Exclusive territorial protection",
        "Full staff sourcing assistance",
        "Local store marketing (LSM) setup",
        "Financial modeling & ROI audit",
      ],
      cta: "Plan Expansion",
      popular: true,
    },
    {
      name: "Master Franchise",
      price: "₹75L+",
      desc: "Premium supermarkets, regional retail hubs, or multi-unit rights.",
      features: [
        "All Expansion setups included",
        "Regional/State exclusive rights",
        "Sub-franchising revenue structure",
        "Dedicated corporate project coordinator",
        "Quarterly advisory audits (1 Year)",
        "Premium legal representation",
      ],
      cta: "Become Master Partner",
    },
  ];

  return (
    <>
      <Head>
        <title>Franchise Investment Advisory | PSR ONE</title>
        <meta
          name="description"
          content="Start your entrepreneurial journey with premium pre-vetted franchise brands. Comprehensive site audits, territorial rights, and marketing setup by PSR ONE."
        />
      </Head>

      {/* Hero Section */}
      <section className="relative py-20 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark to-slate-900 opacity-95"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/15 rounded-full blur-[100px]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center lg:text-left grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-bold uppercase tracking-wider mb-4 border border-secondary/20">
              Franchise Investment
            </span>
            <h1 className="text-4xl sm:text-5xl font-display font-extrabold mb-6 leading-tight">
              Invest in Vetted Brands with Confirmed ROI
            </h1>
            <p className="text-slate-300 text-base sm:text-lg mb-8 max-w-xl font-body font-light">
              Skip the startup trial-and-error. Invest in verified businesses with standardized operating procedures, established customer loyalty, and consistent cash flows.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/contact?service=franchise"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-bold text-slate-900 bg-secondary hover:bg-secondary-light transition-colors"
              >
                Find a Brand
              </Link>
              <a
                href="#how-it-works"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-bold text-white border border-slate-700 hover:bg-slate-800 transition-colors"
              >
                Methodology
              </a>
            </div>
          </div>
          {/* Visual Showcase Graphic */}
          <div className="hidden lg:block bg-slate-800/40 rounded-2xl border border-slate-700 p-8 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-700 pb-4 mb-6">
              <h3 className="font-bold text-white font-heading text-sm uppercase tracking-wider">
                Market Performance Vetting
              </h3>
              <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-xs font-bold">
                Live Data
              </span>
            </div>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="block text-slate-400 text-xs font-semibold">Average ROI Timeline</span>
                  <span className="text-lg font-bold text-white font-display">18 - 24 Months</span>
                </div>
                <TrendingUp className="h-6 w-6 text-emerald-400" />
              </div>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="block text-slate-400 text-xs font-semibold">Partner Franchise Success Rate</span>
                  <span className="text-lg font-bold text-white font-display">94.2% (Industry Avg: 65%)</span>
                </div>
                <CheckCircle2 className="h-6 w-6 text-secondary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Overview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-display font-extrabold text-slate-900 mb-6">
                Why Franchise Investing Works
              </h2>
              <p className="text-slate-600 font-body text-base leading-relaxed mb-6">
                Starting a business from scratch has an 80% failure rate within the first five years. Franchising reverses those odds by providing you with an operating blueprint, national brand awareness, and bulk-buying power.
              </p>
              <p className="text-slate-600 font-body text-base leading-relaxed mb-6">
                At PSR ONE, we consult with you to map your budget, experience, and regional preferences to the highest-performing franchise formats available. We guide you through signing territorial licenses and store fit-outs.
              </p>
              <div className="border-l-4 border-secondary pl-4 py-2 italic text-slate-700 text-sm sm:text-base font-body bg-slate-50">
                &ldquo;We help you buy a job that builds long-term passive equity.&rdquo;
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-2xl font-extrabold text-primary font-display block mb-1">₹15 Lakhs</span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Average Entry Ticket</span>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">Highly accessible investment thresholds with banks willing to fund up to 60% of setup.</p>
              </div>
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-2xl font-extrabold text-primary font-display block mb-1">45 - 60 Days</span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Deployment Speed</span>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">From signing agreements to the grand opening ribbon-cutting ceremony.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-display font-extrabold text-slate-900 mb-4">
              Our Franchise Setup Methodology
            </h2>
            <p className="text-slate-500 text-sm sm:text-base font-body">
              How we take you from investor to operational business owner in 4 structured steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {[
              { step: "01", title: "Consultation", desc: "Evaluate your profile, financial bandwidth, and select industry verticals (F&B, Retail, etc.)." },
              { step: "02", title: "Brand Vetting", desc: "Review unit economics, visit operational pilot outlets, and interview existing franchisees." },
              { step: "03", title: "Site Selection & Legal", desc: "Perform footfall analysis on target locations and execute regulatory franchising agreements." },
              { step: "04", title: "Store Fit-out & Launch", desc: "Coordinate interior setup, vendor supply chains, local marketing blitz, and launch audits." },
            ].map((step, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 relative shadow-sm hover:shadow-md transition-shadow">
                <span className="text-3xl font-black text-slate-200 block mb-2 font-display">{step.step}</span>
                <h3 className="font-heading font-bold text-slate-900 text-base mb-2">{step.title}</h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features & Benefits */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-display font-extrabold text-slate-900 mb-4">
              Franchise Advisory Features
            </h2>
            <p className="text-slate-500 text-sm sm:text-base font-body">
              Complete investor support package designed to protect your investment and scale multi-unit holdings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feat, idx) => {
              const IconComp = feat.icon;
              return (
                <div key={idx} className="flex gap-4">
                  <div className="h-10 w-10 rounded-lg bg-blue-50 text-primary flex items-center justify-center flex-shrink-0">
                    <IconComp className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-slate-900 text-base mb-1">{feat.title}</h3>
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-display font-extrabold text-slate-900 mb-4">
              Investment Scale Options
            </h2>
            <p className="text-slate-500 text-sm sm:text-base font-body">
              Transparent investment thresholds depending on business scale and territorial rights.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
            {pricingTiers.map((tier, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-2xl p-8 border flex flex-col justify-between ${
                  tier.popular ? "border-primary ring-2 ring-primary/10 shadow-lg relative" : "border-slate-200"
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full border border-secondary/20">
                    Most Popular
                  </span>
                )}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 font-heading">{tier.name}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed mb-6">{tier.desc}</p>
                  <span className="text-3xl font-extrabold text-slate-950 font-display block mb-6">
                    {tier.price}
                  </span>
                  <ul className="space-y-3 mb-8 border-t border-slate-100 pt-6">
                    {tier.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center text-xs sm:text-sm text-slate-600">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  href={`/contact?service=franchise&tier=${tier.name.toLowerCase()}`}
                  className={`w-full inline-flex items-center justify-center py-2.5 rounded-lg text-sm font-bold shadow-sm transition-all ${
                    tier.popular
                      ? "gradient-primary text-white hover:opacity-90"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200"
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-1 bg-slate-50 border border-slate-100 px-3 py-1 rounded-full text-xs font-bold text-primary mb-3">
              <HelpCircle className="h-3.5 w-3.5 text-secondary" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h2 className="text-3xl font-display font-extrabold text-slate-900 mb-4">
              Franchise Advisory FAQs
            </h2>
          </div>

          <Accordion items={faqItems} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-primary text-white text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-secondary/15 rounded-full blur-[100px]"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-extrabold text-white mb-4">
            Find the Perfect Brand and Territorial Rights
          </h2>
          <p className="text-slate-300 font-body text-sm sm:text-base mb-8 max-w-xl mx-auto">
            Book a one-on-one strategy session with our lead franchise coordinator to analyze open territories.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact?service=franchise"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 rounded-lg text-sm font-bold text-slate-900 bg-secondary hover:bg-secondary-light transition-colors"
            >
              Schedule Consultation
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 rounded-lg text-sm font-bold text-white border border-slate-700 hover:bg-slate-800 transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
