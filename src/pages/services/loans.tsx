import Head from "next/head";
import Link from "next/link";
import Accordion from "@/components/Common/Accordion";
import LoanCalculator from "@/components/Common/LoanCalculator";
import {
  FileCheck2,
  Percent,
  Clock,
  ShieldAlert,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";

export default function LoansFinancing() {
  const faqItems = [
    {
      question: "What is the processing timeline for a business loan?",
      answer: "Unsecured business loans take between 3 to 5 business days for approval, and another 48 hours for disbursement. Secured loans (such as Loan Against Property) can take 10 to 15 business days depending on property legal and valuation audits.",
    },
    {
      question: "What are the basic eligibility criteria for corporate funding?",
      answer: "The business must be active for a minimum of 2 years with a GST registration, show a minimum annual turnover of ₹20 Lakhs, and the promoters should have a personal CIBIL score of 720+.",
    },
    {
      question: "Are there any prepayment charges?",
      answer: "For floating rate home and mortgage loans, there are zero prepayment charges as per RBI rules. For fixed-rate corporate term loans, prepayment charges range from 2% to 4% of the outstanding principal amount.",
    },
    {
      question: "What documents are required for application?",
      answer: "Basic KYC, promoter PAN and Aadhaar, 12-month company bank statements, 2 years of audited ITR and Balance Sheets, GST filings, and ownership proof of the collateral (if applying for a secured loan).",
    },
  ];

  const loanTypes = [
    {
      title: "Business Term Loans",
      rate: "Starting at 9.5% p.a.",
      desc: "Capital for inventory, machinery purchase, or business expansion. Custom repayment terms up to 5 years.",
      features: ["Collateral-free up to ₹50L", "Fast approval", "Minimal documentation"],
    },
    {
      title: "Loan Against Property (LAP)",
      rate: "Starting at 8.15% p.a.",
      desc: "Unlock equity from residential or commercial real estate to fund capital-intensive projects.",
      features: ["Up to 70% property value", "Longer tenure up to 15 yrs", "Lower monthly interest cost"],
    },
    {
      title: "Working Capital & Overdraft (OD)",
      rate: "Starting at 10.0% p.a.",
      desc: "Manage payroll and cash flow cycles with a revolving credit line where you only pay interest on utilized funds.",
      features: ["Linked to business ledger", "Quick withdrawals", "Interest calculated daily"],
    },
  ];

  return (
    <>
      <Head>
        <title>Loans & Business Financing Advisory | PSR ONE</title>
        <meta
          name="description"
          content="Access tailored corporate and consumer financing solutions. Calculate loan EMIs and check eligibility with the PSR ONE interactive calculator."
        />
      </Head>

      {/* Hero Section */}
      <section className="relative py-20 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark to-slate-900 opacity-95"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/15 rounded-full blur-[100px]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center lg:text-left grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider mb-4 border border-accent/20">
              Loans & Financing
            </span>
            <h1 className="text-4xl sm:text-5xl font-display font-extrabold mb-6 leading-tight">
              Flexible Capital Solutions to Power Your Ambition
            </h1>
            <p className="text-slate-300 text-base sm:text-lg mb-8 max-w-xl font-body font-light">
              Get corporate and personal loans at transparent rates. Leverage our partnerships with leading banks and NBFCs to secure fast pre-approvals and maximum funding.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/contact?service=loans"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-bold text-slate-900 bg-secondary hover:bg-secondary-light transition-colors"
              >
                Apply for Funding
              </Link>
              <a
                href="#calculator"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-bold text-white border border-slate-700 hover:bg-slate-800 transition-colors"
              >
                Calculate EMI
              </a>
            </div>
          </div>
          {/* Hero Side Metrics */}
          <div className="hidden lg:grid grid-cols-2 gap-4">
            <div className="bg-slate-800/40 rounded-xl border border-slate-700 p-6 shadow-lg">
              <Percent className="h-8 w-8 text-secondary mb-3" />
              <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Interest Rates</h3>
              <span className="text-xl font-bold text-white block">From 8.15% p.a.</span>
            </div>
            <div className="bg-slate-800/40 rounded-xl border border-slate-700 p-6 shadow-lg">
              <Clock className="h-8 w-8 text-accent mb-3" />
              <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Approval Speed</h3>
              <span className="text-xl font-bold text-white block">Within 72 Hours</span>
            </div>
            <div className="bg-slate-800/40 rounded-xl border border-slate-700 p-6 shadow-lg">
              <FileCheck2 className="h-8 w-8 text-emerald-400 mb-3" />
              <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Disbursement</h3>
              <span className="text-xl font-bold text-white block">98% Success Rate</span>
            </div>
            <div className="bg-slate-800/40 rounded-xl border border-slate-700 p-6 shadow-lg">
              <ShieldAlert className="h-8 w-8 text-rose-400 mb-3" />
              <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Transparency</h3>
              <span className="text-xl font-bold text-white block">Zero Hidden Fees</span>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-display font-extrabold text-slate-900 mb-4">
              Plan Your Borrowing
            </h2>
            <p className="text-slate-500 font-body text-base">
              Use our interactive tool to calculate monthly EMI installments or estimate your maximum loan eligibility limits.
            </p>
          </div>

          <LoanCalculator />
        </div>
      </section>

      {/* Loan Types Grid */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-display font-extrabold text-slate-900 mb-4">
              Financing Programs
            </h2>
            <p className="text-slate-500 font-body text-base">
              A comprehensive selection of debt packages tailored for corporate, retail, and mortgage requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {loanTypes.map((loan, idx) => (
              <div key={idx} className="bg-slate-50 rounded-2xl border border-slate-100 p-8 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 font-heading">{loan.title}</h3>
                  <span className="inline-block px-2.5 py-1 rounded bg-secondary/10 text-secondary-dark text-xs font-bold mb-4">
                    {loan.rate}
                  </span>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6">
                    {loan.desc}
                  </p>
                  <ul className="space-y-2 border-t border-slate-200/60 pt-4 mb-8">
                    {loan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center text-xs text-slate-600">
                        <CheckCircle2 className="h-4 w-4 text-accent mr-2 flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  href={`/contact?service=loans&type=${loan.title.toLowerCase().replace(/\s+/g, "-")}`}
                  className="w-full inline-flex items-center justify-center py-2.5 rounded-lg text-sm font-bold text-slate-800 bg-white border border-slate-200 hover:bg-slate-100 transition-colors shadow-sm"
                >
                  Request Callback
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-display font-extrabold text-slate-900 mb-4">
              Disbursement Process Roadmap
            </h2>
            <p className="text-slate-500 text-sm sm:text-base font-body">
              How we fast-track your application to payout.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Assessment", desc: "Submit income, financials, and run preliminary CIBIL credit score evaluations." },
              { step: "02", title: "Lender Match", desc: "Match criteria with our list of 15+ banking partners to find the lowest ROI option." },
              { step: "03", title: "Legal Vetting", desc: "Compile documentation, complete KYC, and secure bank sanction letters." },
              { step: "04", title: "Disbursement", desc: "Final agreement execution and funds credit directly into your business bank account." },
            ].map((step, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 relative shadow-sm">
                <span className="text-3xl font-black text-slate-200 block mb-2 font-display">{step.step}</span>
                <h3 className="font-heading font-bold text-slate-900 text-base mb-2">{step.title}</h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-1 bg-slate-50 border border-slate-100 px-3 py-1 rounded-full text-xs font-bold text-primary mb-3">
              <HelpCircle className="h-3.5 w-3.5 text-secondary" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h2 className="text-3xl font-display font-extrabold text-slate-900 mb-4">
              Loans & Financing FAQs
            </h2>
          </div>

          <Accordion items={faqItems} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-primary text-white text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-accent/10 rounded-full blur-[100px]"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-extrabold text-white mb-4">
            Maximize Your Eligible Loan Threshold
          </h2>
          <p className="text-slate-300 font-body text-sm sm:text-base mb-8 max-w-xl mx-auto">
            Consult with our credit underwriting team to structure your business financials for seamless bank approvals.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact?service=loans"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 rounded-lg text-sm font-bold text-slate-900 bg-secondary hover:bg-secondary-light transition-colors"
            >
              Get Sanction Checklist
            </Link>
            <Link
              href="https://wa.me/919121395329"
              target="_blank"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 rounded-lg text-sm font-bold text-white border border-slate-700 hover:bg-slate-800 transition-colors"
            >
              WhatsApp Support
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
