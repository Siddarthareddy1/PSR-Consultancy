import Head from "next/head";
import Link from "next/link";
import Accordion from "@/components/Common/Accordion";
import { useContent } from "@/lib/useContent";
import {
  Home,
  Building,
  Scale,
  TrendingUp,
  MapPin,
  CheckCircle2,
  HelpCircle,
  Clock,
} from "lucide-react";

export default function RealEstateConsulting() {
  const { content } = useContent("real_estate", {
    hero_title: "Invest in High-Yield Real Estate Safely",
    hero_subtitle: "Make data-driven real estate decisions. Avoid layout disputes, unapproved projects, and low-yield properties. We offer independent vetting and premium property sourcing.",
  });

  const faqItems = [
    {
      question: "What due diligence do you perform on properties?",
      answer: "We carry out a 3-tier inspection: Title deed search (going back 30 years), municipal layout approval vetting (checking RERA registration and building permits), and physical site topography and rental yield assessments.",
    },
    {
      question: "Do you assist with home loans and builder agreements?",
      answer: "Yes, our integrated structure allows us to coordinate property legal vetting with bank loan sanction teams to ensure smooth and fast mortgage processing (under our Loans service vertical).",
    },
    {
      question: "What is the typical rental yield on commercial properties?",
      answer: "A Grade-A commercial office space yields between 8% to 11% annually. Warehouses yield around 9% to 12%. Premium residential properties yield between 2.5% to 4% annually.",
    },
    {
      question: "Are pre-launch projects safe to invest in?",
      answer: "Only if they have a valid RERA registration number and construction milestones are linked to payouts. We vet developers' track records to make sure they have a history of timely handovers.",
    },
  ];

  const features = [
    {
      title: "Commercial Yield Audits",
      desc: "Detailed rental projections, CAM fee analysis, and tenant rollover audits for retail and office structures.",
      icon: TrendingUp,
    },
    {
      title: "Title & Legal Vetting",
      desc: "30-year chain document checks, encumbrance search, and layout approval compliance audits.",
      icon: Scale,
    },
    {
      title: "Land Demarcation & Sourcing",
      desc: "Sourcing verified industrial plots, farm plots, and commercial parcels across growing micro-markets.",
      icon: MapPin,
    },
    {
      title: "Premium Residential Brokerage",
      desc: "Access off-market premium villas, duplex apartments, and luxury gated communities.",
      icon: Home,
    },
  ];

  const propertyTypes = [
    {
      name: "Commercial Office Spaces",
      yield: "8% - 11% ROI",
      desc: "Corporate office layouts pre-leased to IT companies or multinational corporations.",
    },
    {
      name: "Warehousing & Industrial Land",
      yield: "9% - 12% ROI",
      desc: "Strategically located logistics hubs and manufacturing park spaces near highway corridors.",
    },
    {
      name: "Luxury Residential Flats",
      yield: "Premium Capital Apprec.",
      desc: "Pre-vetted premium high-rises in major tech hubs, featuring comprehensive amenities.",
    },
  ];

  const pricingTiers = [
    {
      name: "Sourcing & Brokerage",
      price: "1.0% - 1.5%",
      desc: "For investors looking to identify and buy prime residential or commercial property.",
      features: [
        "Curated site visits",
        "Developer track record audit",
        "Negotiation assistance",
        "Basic RERA compliance checks",
        "Standard booking support",
      ],
      cta: "Schedule Property Tour",
    },
    {
      name: "Full Due Diligence",
      price: "₹45,000 Flat",
      desc: "Comprehensive legal and valuation audit for a property you have already selected.",
      features: [
        "30-Year title search report",
        "Municipal layout approval verification",
        "Drafting sale agreement clauses",
        "Market valuation appraisal report",
        "Physical verification check",
      ],
      cta: "Order Vetting Report",
      popular: true,
    },
    {
      name: "Portfolio Management",
      price: "Custom Retainer",
      desc: "For institutional portfolios, family offices, and multi-property managers.",
      features: [
        "Dedicated real estate advisor",
        "Quarterly yield performance reports",
        "Tenant management & lease renewals",
        "Capital gains tax planning advisory",
        "Off-market liquidation assistance",
      ],
      cta: "Consult Portfolio Manager",
    },
  ];

  return (
    <>
      <Head>
        <title>Real Estate Consulting & Portfolio Advisory | PSR ONE</title>
        <meta
          name="description"
          content="Invest securely in commercial and premium residential properties. Get independent title vetting, yield calculations, and RERA audit reports from PSR ONE."
        />
      </Head>

      {/* Hero Section */}
      <section className="relative py-20 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark to-slate-900 opacity-95"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/15 rounded-full blur-[100px]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center lg:text-left grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-4 border border-indigo-500/20">
              Real Estate Consulting
            </span>
            <h1 className="text-4xl sm:text-5xl font-display font-extrabold mb-6 leading-tight">
              {content.hero_title}
            </h1>
            <p className="text-slate-300 text-base sm:text-lg mb-8 max-w-xl font-body font-light">
              {content.hero_subtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/contact?service=realestate"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-bold text-slate-900 bg-secondary hover:bg-secondary-light transition-colors"
              >
                Browse Portfolio
              </Link>
              <a
                href="#property-types"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-bold text-white border border-slate-700 hover:bg-slate-800 transition-colors"
              >
                Asset Classes
              </a>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="hidden lg:grid grid-cols-2 gap-4">
            <div className="bg-slate-800/40 rounded-xl border border-slate-700 p-6 shadow-lg">
              <Clock className="h-8 w-8 text-secondary mb-3" />
              <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Response Time</h3>
              <span className="text-lg font-bold text-white block">Within 24 Hours</span>
            </div>
            <div className="bg-slate-800/40 rounded-xl border border-slate-700 p-6 shadow-lg">
              <Building className="h-8 w-8 text-indigo-400 mb-3" />
              <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Pre-Vetted Assets</h3>
              <span className="text-lg font-bold text-white block">100% RERA Checked</span>
            </div>
          </div>
        </div>
      </section>

      {/* Property Types / Yields Section */}
      <section id="property-types" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-display font-extrabold text-slate-900 mb-4">
              Investable Property Classes
            </h2>
            <p className="text-slate-500 font-body text-base">
              Explore our core focus areas in corporate real estate and premium housing portfolios.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {propertyTypes.map((prop, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-150 p-8 shadow-sm hover:shadow-md transition-shadow">
                <span className="inline-block px-3 py-1 rounded bg-indigo-50 text-indigo-600 text-xs font-bold mb-4">
                  {prop.yield}
                </span>
                <h3 className="text-xl font-bold text-slate-950 mb-3 font-heading">{prop.name}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{prop.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features & Benefits */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-display font-extrabold text-slate-900 mb-4">
              Real Estate Legal & Advisory Features
            </h2>
            <p className="text-slate-500 text-sm sm:text-base font-body">
              How we help you navigate high-ticket investments with confidence and legal safety.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feat, idx) => {
              const IconComp = feat.icon;
              return (
                <div key={idx} className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="h-10 w-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
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

      {/* Pricing / Consult Options */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-display font-extrabold text-slate-900 mb-4">
              Service Fee Packages
            </h2>
            <p className="text-slate-500 text-sm sm:text-base font-body">
              Clear service fees depending on your sourcing or verification requirements.
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
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full">
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
                  href={`/contact?service=realestate&tier=${tier.name.toLowerCase()}`}
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
              Real Estate FAQs
            </h2>
          </div>

          <Accordion items={faqItems} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-primary text-white text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-indigo-500/10 rounded-full blur-[100px]"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-extrabold text-white mb-4">
            Identify Prime Real Estate Holdings
          </h2>
          <p className="text-slate-300 font-body text-sm sm:text-base mb-8 max-w-xl mx-auto">
            Book an office meeting with our land legal counsel to verify pending registry documents.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact?service=realestate"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 rounded-lg text-sm font-bold text-slate-900 bg-secondary hover:bg-secondary-light transition-colors"
            >
              Consult Real Estate Expert
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 rounded-lg text-sm font-bold text-white border border-slate-700 hover:bg-slate-800 transition-colors"
            >
              Enquire Online
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
