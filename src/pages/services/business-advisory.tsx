import Head from "next/head";
import Link from "next/link";
import Accordion from "@/components/Common/Accordion";
import {
  TrendingUp,
  Award,
  Compass,
  FileCheck,
  CheckCircle2,
  HelpCircle,
  Clock,
  Zap,
} from "lucide-react";

export default function BusinessAdvisory() {
  const faqItems = [
    {
      question: "What types of companies do you advise?",
      answer: "We support early-stage startups setting up corporate compliance, mid-sized enterprises seeking workflow scaling and tax optimization, and family offices organizing asset protection holdings.",
    },
    {
      question: "Do you assist with startup fundraising and pitching?",
      answer: "Yes, we prepare pitch documentation, build detailed 5-year financial models, coordinate investor due diligence reports, and help negotiate seed or series-A term sheets.",
    },
    {
      question: "What is your retainer structure?",
      answer: "We offer rolling monthly retainers (starting at 20 hours/month) or project-specific advisory contracts. Agreements can be cancelled with a 30-day notice period.",
    },
    {
      question: "Do you have specialized industry consultants?",
      answer: "Our network spans veteran advisory partners in logistics, F&B, health tech, manufacturing, and real estate investments to provide sector-specific market insights.",
    },
  ];

  const features = [
    {
      title: "Corporate Structure Design",
      desc: "Setting up Private Limited holdings, LLPs, or joint ventures with clear shareholder agreements.",
      icon: FileCheck,
    },
    {
      title: "Scale Optimization Audits",
      desc: "Streamlining inventory workflows, standard operating procedures (SOPs), and reducing redundant overheads.",
      icon: Zap,
    },
    {
      title: "Pitch & Fundraising Prep",
      desc: "Structuring valuation pitch decks, historical bookkeeping cleanup, and investor due diligence dossiers.",
      icon: TrendingUp,
    },
    {
      title: "Brand Expansion Strategy",
      desc: "Formulating market entry plans, franchisee model conversions, and territorial roll-out roadmaps.",
      icon: Compass,
    },
  ];

  const domains = [
    {
      name: "Strategic Tax Planning",
      desc: "Optimizing GST setups, corporate tax filings, transfer pricing schemes, and legally maximizing depreciation write-offs.",
    },
    {
      name: "Regulatory Compliance",
      desc: "Ensuring compliance with Registrar of Companies (ROC), FEMA guidelines, labor laws, and environmental certificates.",
    },
    {
      name: "Operational Leadership",
      desc: "Providing fractional COO/CFO support to direct accounting, cash-flow runtimes, and critical hiring campaigns.",
    },
  ];

  const pricingTiers = [
    {
      name: "Project Advisory",
      price: "₹65,000 / project",
      desc: "Perfect for single objectives: LLC setup, compliance cleanup, or franchise SOP structuring.",
      features: [
        "Single focus objectives",
        "SOP documentation guidelines",
        "Standard tax layout advice",
        "2 Revision rounds",
        "15 Days post-project support",
      ],
      cta: "Launch Project",
    },
    {
      name: "Strategic Retainer",
      price: "₹40,005 / month",
      desc: "Ongoing fractional C-Suite operations and quarterly audit support.",
      features: [
        "25 Hours monthly advisory",
        "Dedicated strategic consultant",
        "Quarterly financial health audits",
        "Investor pitch deck reviews",
        "GST compliance reviews",
        "30-Day termination notice",
      ],
      cta: "Subscribe Retainer",
      popular: true,
    },
    {
      name: "Boardroom Advisory",
      price: "₹1,20,000 / month",
      desc: "High-ticket scaling, merger vetting, and institutional capitalization advisory.",
      features: [
        "Unlimited urgent calls",
        "Principal partner representation",
        "Merger & Acquisition legal vetting",
        "State/National expansion scaling",
        "Dedicated corporate secretary support",
        "Monthly boardroom representation",
      ],
      cta: "Retain Lead Partner",
    },
  ];

  return (
    <>
      <Head>
        <title>Strategic Business Advisory & Fractional CFO | PSR ONE</title>
        <meta
          name="description"
          content="Accelerate business growth. Access expert fractional CFO services, tax structuring, SOP creation, and brand expansion consulting with PSR ONE."
        />
      </Head>

      {/* Hero Section */}
      <section className="relative py-20 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark to-slate-900 opacity-95"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/15 rounded-full blur-[100px]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center lg:text-left grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold uppercase tracking-wider mb-4 border border-purple-500/20">
              Business Advisory
            </span>
            <h1 className="text-4xl sm:text-5xl font-display font-extrabold mb-6 leading-tight">
              Scale Operations, Optimize Capital & Maximize Equity
            </h1>
            <p className="text-slate-300 text-base sm:text-lg mb-8 max-w-xl font-body font-light">
              Accelerate your business scale with expert guidance. Access seasoned corporate advisors, fractional executives, and legal specialists to structure high-growth enterprise models.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/contact?service=consulting"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-bold text-slate-900 bg-secondary hover:bg-secondary-light transition-colors"
              >
                Retain an Advisor
              </Link>
              <a
                href="#domains"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-bold text-white border border-slate-700 hover:bg-slate-800 transition-colors"
              >
                Our Expertise
              </a>
            </div>
          </div>

          {/* Side Metrics */}
          <div className="hidden lg:grid grid-cols-2 gap-4">
            <div className="bg-slate-800/40 rounded-xl border border-slate-700 p-6 shadow-lg">
              <Clock className="h-8 w-8 text-secondary mb-3" />
              <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Onboarding Time</h3>
              <span className="text-lg font-bold text-white block">Within 48 Hours</span>
            </div>
            <div className="bg-slate-800/40 rounded-xl border border-slate-700 p-6 shadow-lg">
              <Award className="h-8 w-8 text-purple-400 mb-3" />
              <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Advisory Track</h3>
              <span className="text-lg font-bold text-white block">150+ Clients Managed</span>
            </div>
          </div>
        </div>
      </section>

      {/* Advisory Domains */}
      <section id="domains" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-display font-extrabold text-slate-900 mb-4">
              Core Consulting Frameworks
            </h2>
            <p className="text-slate-500 font-body text-base">
              Vetted strategic methodologies that deliver measurable commercial outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {domains.map((dom, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-150 p-8 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-slate-950 mb-3 font-heading">{dom.name}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{dom.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-display font-extrabold text-slate-900 mb-4">
              Our Advisory Lifecycle
            </h2>
            <p className="text-slate-500 text-sm sm:text-base font-body">
              How we diagnose, implement, and support corporate growth targets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Diagnostic Audit", desc: "Evaluate historic tax filings, workflow bottle-necks, and organizational structure models." },
              { step: "02", title: "Scale Mapping", desc: "Construct 5-year financial models, compliance calendars, and operational checklists." },
              { step: "03", title: "Implementation", desc: "Execute target setups: shareholder terms, brand SOPs, and system tools configurations." },
              { step: "04", title: "Review & Support", desc: "Monthly KPIs evaluations, quarterly compliance filing checks, and executive boardroom reviews." },
            ].map((step, idx) => (
              <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 relative">
                <span className="text-3xl font-black text-slate-200 block mb-2 font-display">{step.step}</span>
                <h3 className="font-heading font-bold text-slate-900 text-base mb-2">{step.title}</h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features & Benefits */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-display font-extrabold text-slate-900 mb-4">
              Advisory Benefits Package
            </h2>
            <p className="text-slate-500 text-sm sm:text-base font-body">
              Complete support frameworks designed to insulate operations and scale equity values.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feat, idx) => {
              const IconComp = feat.icon;
              return (
                <div key={idx} className="flex gap-4 p-4 rounded-xl bg-white border border-slate-100 shadow-sm">
                  <div className="h-10 w-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
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

      {/* Pricing packages */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-display font-extrabold text-slate-900 mb-4">
              Retainer & Advisory Tiers
            </h2>
            <p className="text-slate-500 text-sm sm:text-base font-body">
              Flexible strategic support plans matching your stage of commercial operation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
            {pricingTiers.map((tier, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-2xl p-8 border flex flex-col justify-between ${
                  tier.popular ? "border-purple-500 ring-2 ring-purple-500/10 shadow-lg relative" : "border-slate-200"
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full">
                    Recommended
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
                  href={`/contact?service=consulting&tier=${tier.name.toLowerCase()}`}
                  className={`w-full inline-flex items-center justify-center py-2.5 rounded-lg text-sm font-bold shadow-sm transition-all ${
                    tier.popular
                      ? "bg-purple-600 hover:bg-purple-500 text-white"
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
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-1 bg-slate-50 border border-slate-100 px-3 py-1 rounded-full text-xs font-bold text-primary mb-3">
              <HelpCircle className="h-3.5 w-3.5 text-secondary" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h2 className="text-3xl font-display font-extrabold text-slate-900 mb-4">
              Business Advisory FAQs
            </h2>
          </div>

          <Accordion items={faqItems} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-primary text-white text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-purple-500/10 rounded-full blur-[100px]"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-extrabold text-white mb-4">
            Structure for Growth & Scale
          </h2>
          <p className="text-slate-300 font-body text-sm sm:text-base mb-8 max-w-xl mx-auto">
            Book an onboarding strategy consultation to plan your corporate tax structures and compliance calendars.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact?service=consulting"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 rounded-lg text-sm font-bold text-slate-900 bg-secondary hover:bg-secondary-light transition-colors"
            >
              Consult Advisory Lead
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
