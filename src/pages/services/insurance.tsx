import Head from "next/head";
import Link from "next/link";
import Accordion from "@/components/Common/Accordion";
import InsuranceCalculator from "@/components/Common/InsuranceCalculator";
import { useContent } from "@/lib/useContent";
import {
  Shield,
  Heart,
  Briefcase,
  Users,
  CheckCircle2,
  HelpCircle,
  Clock,
} from "lucide-react";

export default function InsuranceSolutions() {
  const { content } = useContent("insurance", {
    hero_title: "Safeguard Your Health, Protect Your Enterprise",
    hero_subtitle: "Mitigate corporate and personal risks with top-tier underwriting. Compare policies across 10+ partner insurers to optimize sum assured coverage and lower premium costs.",
  });

  const faqItems = [
    {
      question: "What is Keyman Insurance, and who needs it?",
      answer: "Keyman insurance is a term policy taken out by a business on the life of its crucial staff (e.g. founders, technical directors). The company pays the premium, and in case of their demise, the company receives the payout to offset operational losses and hire replacements.",
    },
    {
      question: "How long does a typical claim processing take?",
      answer: "Cashless health claims are pre-authorized within 2-4 hours. Critical illness and term life death claims are settled within 15 working days once all verification documents are submitted to the insurer.",
    },
    {
      question: "Can I customize riders or add-ons to my policy?",
      answer: "Yes, you can configure accidental death benefits, critical illness covers, wave-of-premium riders, and room-rent caps on top of standard medical or life policies for comprehensive security.",
    },
    {
      question: "What are the tax benefits under commercial and health insurance?",
      answer: "Health insurance premiums offer tax exemptions up to ₹75,000 under Section 80D. Corporate policies (like liability and group health) can be claimed as legitimate business operating expenses to lower taxable profits.",
    },
  ];

  const insuranceTypes = [
    {
      icon: Users,
      title: "Group Health & Employee Benefit",
      desc: "Retain talent with corporate health plans covering pre-existing diseases, maternity benefits, and family floaters.",
    },
    {
      icon: Briefcase,
      title: "Keyman & Partnership Protection",
      desc: "Secure business continuity by protecting critical decision-makers, shareholders, and managing directors.",
    },
    {
      icon: Shield,
      title: "Director & Officer (D&O) Liability",
      desc: "Protect management personnel against legal allegations arising from operational decisions and regulatory audits.",
    },
    {
      icon: Heart,
      title: "Term Life & Critical Illness",
      desc: "Guaranteed family security with high sum assured terms and immediate payouts upon major medical diagnoses.",
    },
  ];

  const pricingTiers = [
    {
      name: "Standard Security",
      price: "₹1,200/mo",
      desc: "Essential personal health and basic life protection packages.",
      features: [
        "₹5 Lakhs health cover",
        "₹50 Lakhs basic term life cover",
        "Cashless network at 5,000+ hospitals",
        "Accidental rider included",
        "Tax exemptions (Section 80C/80D)",
      ],
      cta: "Buy Standard Plan",
    },
    {
      name: "Business Executive",
      price: "₹4,500/mo",
      desc: "Tailored for business owners, key corporate figures, and growing families.",
      features: [
        "₹15 Lakhs health cover",
        "₹1.5 Crores premium life cover",
        "Group health benefits (up to 5 employees)",
        "Critical illness cover (15 diagnoses)",
        "Priority claim coordination service",
        "Zero co-payment clauses",
      ],
      cta: "Configure Corporate Plan",
      popular: true,
    },
    {
      name: "Enterprise Shield",
      price: "Custom Pricing",
      desc: "Comprehensive business liability, assets, and executive protection packages.",
      features: [
        "Director & Officer (D&O) Liability cover",
        "Commercial plant & machinery asset cover",
        "Keyman policy on primary founders",
        "Group cover for 50+ staff members",
        "Dedicated corporate risk manager",
        "24-Hour emergency claim desk",
      ],
      cta: "Contact Risk Advisory",
    },
  ];

  return (
    <>
      <Head>
        <title>Insurance Solutions & Wealth Protection | PSR ONE</title>
        <meta
          name="description"
          content="Guard your family and business assets. Compare term life, health, keyman, and corporate liability plans with PSR ONE."
        />
      </Head>

      {/* Hero Section */}
      <section className="relative py-20 bg-gray-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark to-slate-900 opacity-95"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/15 rounded-full blur-[100px]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center lg:text-left grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-500/20">
              Insurance Solutions
            </span>
            <h1 className="text-4xl sm:text-5xl font-display font-extrabold mb-6 leading-tight">
              {content.hero_title}
            </h1>
            <p className="text-gray-300 text-base sm:text-lg mb-8 max-w-xl font-body font-light">
              {content.hero_subtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/contact?service=insurance"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-bold text-gray-900 bg-secondary hover:bg-secondary-light transition-colors"
              >
                Get Custom Quote
              </Link>
              <a
                href="#calculator"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-bold text-white border border-gray-800 hover:bg-slate-800 transition-colors"
              >
                Estimate Premium
              </a>
            </div>
          </div>

          {/* Quick Info Grid */}
          <div className="hidden lg:grid grid-cols-2 gap-4">
            <div className="bg-slate-800/40 rounded-xl border border-gray-800 p-6 shadow-lg">
              <Clock className="h-8 w-8 text-secondary mb-3" />
              <h3 className="text-gray-450 text-xs font-semibold uppercase tracking-wider mb-1">Pre-Auth Time</h3>
              <span className="text-lg font-bold text-white block">Within 2 Hours</span>
            </div>
            <div className="bg-slate-800/40 rounded-xl border border-gray-800 p-6 shadow-lg">
              <Shield className="h-8 w-8 text-emerald-400 mb-3" />
              <h3 className="text-gray-450 text-xs font-semibold uppercase tracking-wider mb-1">Claim Settlement</h3>
              <span className="text-lg font-bold text-white block">98.7% Success Rate</span>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Calculator Widget */}
      <section id="calculator" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-display font-extrabold text-gray-900 mb-4">
              Premium Estimator
            </h2>
            <p className="text-gray-500 font-body text-base">
              Calculate standard life, health, keyman, and asset premiums instantly based on age and sum assured parameters.
            </p>
          </div>

          <InsuranceCalculator />
        </div>
      </section>

      {/* Insurance Types */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-display font-extrabold text-gray-900 mb-4">
              Comprehensive Coverage Portfolios
            </h2>
            <p className="text-gray-500 font-body text-base">
              Protect your business assets, personnel liability, and family health structures under our specialized portfolios.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {insuranceTypes.map((type, idx) => {
              const IconComp = type.icon;
              return (
                <div key={idx} className="bg-gray-50 rounded-2xl border border-gray-100 p-6 sm:p-8 flex gap-6 hover:shadow-md transition-shadow">
                  <div className="h-12 w-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                    <IconComp className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-gray-900 text-lg mb-2">{type.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{type.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it Works: Claims Process */}
      <section className="py-24 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-display font-extrabold text-gray-900 mb-4">
              Stress-Free Claims Settlement Roadmap
            </h2>
            <p className="text-gray-500 text-sm sm:text-base font-body">
              How we support you during emergencies to ensure immediate disbursements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Notification", desc: "Notify our 24/7 helpline or submit details online within 24 hours of hospitalization or accident." },
              { step: "02", title: "Verification", desc: "Our claims desk compiles bills, discharge sheets, medical records, and ID proofs." },
              { step: "03", title: "Pre-Auth/Approval", desc: "Coordinate directly with the insurer’s third-party administrator (TPA) for cashless approvals." },
              { step: "04", title: "Disbursement", desc: "Final claim pay-out or direct settlement with the network hospital, resolving pending deductions." },
            ].map((step, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 relative shadow-sm">
                <span className="text-3xl font-black text-slate-200 block mb-2 font-display">{step.step}</span>
                <h3 className="font-heading font-bold text-gray-900 text-base mb-2">{step.title}</h3>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Comparison */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-display font-extrabold text-gray-900 mb-4">
              Recommended Cover Options
            </h2>
            <p className="text-gray-500 text-sm sm:text-base font-body">
              Standard pricing benchmarks tailored for families, founders, and large enterprises.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
            {pricingTiers.map((tier, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-2xl p-8 border flex flex-col justify-between ${
                  tier.popular ? "border-emerald-500 ring-2 ring-emerald-500/10 shadow-lg relative" : "border-gray-200"
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full">
                    Recommended
                  </span>
                )}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 font-heading">{tier.name}</h3>
                  <p className="text-gray-450 text-xs leading-relaxed mb-6">{tier.desc}</p>
                  <span className="text-3xl font-extrabold text-gray-900 font-display block mb-6">
                    {tier.price}
                  </span>
                  <ul className="space-y-3 mb-8 border-t border-gray-100 pt-6">
                    {tier.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center text-xs sm:text-sm text-gray-650">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  href={`/contact?service=insurance&tier=${tier.name.toLowerCase()}`}
                  className={`w-full inline-flex items-center justify-center py-2.5 rounded-lg text-sm font-bold shadow-sm transition-all ${
                    tier.popular
                      ? "bg-emerald-600 hover:bg-emerald-500 text-white"
                      : "bg-gray-50 hover:bg-slate-100 text-gray-700 border border-gray-200"
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
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-1 bg-gray-50 border border-gray-100 px-3 py-1 rounded-full text-xs font-bold text-primary mb-3">
              <HelpCircle className="h-3.5 w-3.5 text-secondary" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h2 className="text-3xl font-display font-extrabold text-gray-900 mb-4">
              Insurance FAQs
            </h2>
          </div>

          <Accordion items={faqItems} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-primary text-white text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-emerald-500/10 rounded-full blur-[100px]"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-extrabold text-white mb-4">
            Custom Enterprise Risk Assessments
          </h2>
          <p className="text-gray-300 font-body text-sm sm:text-base mb-8 max-w-xl mx-auto">
            Book a consultation with our licensed IRDAI insurance experts to audit your current liability margins.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact?service=insurance"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 rounded-lg text-sm font-bold text-gray-900 bg-secondary hover:bg-secondary-light transition-colors"
            >
              Book Audit Session
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 rounded-lg text-sm font-bold text-white border border-gray-800 hover:bg-slate-800 transition-colors"
            >
              Contact Agent
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
