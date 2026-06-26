import { useState } from "react";
import Link from "next/link";
import { IndianRupee } from "lucide-react";

export default function LoanCalculator() {
  const [activeTab, setActiveTab] = useState<"emi" | "eligibility">("emi");

  // EMI Calculator State
  const [amount, setAmount] = useState(1000000); // 10 Lakhs
  const [rate, setRate] = useState(8.5); // 8.5%
  const [tenure, setTenure] = useState(15); // 15 years

  // Eligibility Calculator State
  const [income, setIncome] = useState(80000); // 80k/month
  const [obligations, setObligations] = useState(10000); // 10k existing EMI
  const [eligibleTenure, setEligibleTenure] = useState(20); // 20 years
  const [eligibleRate, setEligibleRate] = useState(9.0); // 9%

  // EMI Calculation: P * r * (1+r)^n / ((1+r)^n - 1)
  const calculateEMI = () => {
    const P = amount;
    const r = rate / 12 / 100;
    const n = tenure * 12;
    if (r === 0) return P / n;
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return Math.round(emi);
  };

  // Eligibility Calculation: FOIR (usually 50-60% of income) - obligations
  const calculateEligibility = () => {
    const FOIR = 0.55; // 55%
    const maxEMI = income * FOIR - obligations;
    if (maxEMI <= 0) return 0;
    const r = eligibleRate / 12 / 100;
    const n = eligibleTenure * 12;
    // P = maxEMI * ((1+r)^n - 1) / (r * (1+r)^n)
    const principal = maxEMI * (Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n));
    return Math.round(principal);
  };

  const emi = calculateEMI();
  const totalPayment = emi * tenure * 12;
  const totalInterest = totalPayment - amount;

  const eligibleAmount = calculateEligibility();

  return (
    <div className="bg-white rounded-2xl border border-slate-150 shadow-md p-6 sm:p-8 max-w-3xl mx-auto">
      <div className="flex border-b border-slate-100 mb-6">
        <button
          onClick={() => setActiveTab("emi")}
          className={`flex-1 pb-4 text-center font-semibold text-sm sm:text-base border-b-2 transition-all ${
            activeTab === "emi"
              ? "border-primary text-primary"
              : "border-transparent text-slate-400 hover:text-slate-600"
          }`}
        >
          EMI Calculator
        </button>
        <button
          onClick={() => setActiveTab("eligibility")}
          className={`flex-1 pb-4 text-center font-semibold text-sm sm:text-base border-b-2 transition-all ${
            activeTab === "eligibility"
              ? "border-primary text-primary"
              : "border-transparent text-slate-400 hover:text-slate-600"
          }`}
        >
          Loan Eligibility Calculator
        </button>
      </div>

      {activeTab === "emi" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Loan Amount (₹) - {amount.toLocaleString("en-IN")}
              </label>
              <input
                type="range"
                min="100000"
                max="50000000"
                step="100000"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>₹1 Lakh</span>
                <span>₹5 Cr</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Interest Rate (%) - {rate}%
              </label>
              <input
                type="range"
                min="5"
                max="20"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>5%</span>
                <span>20%</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Tenure (Years) - {tenure} Yrs
              </label>
              <input
                type="range"
                min="1"
                max="30"
                step="1"
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>1 Yr</span>
                <span>30 Yrs</span>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-slate-50 rounded-xl p-6 flex flex-col justify-between border border-slate-100">
            <div className="space-y-4">
              <div>
                <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                  Estimated Monthly EMI
                </span>
                <span className="text-3xl font-extrabold text-primary font-display flex items-center">
                  <IndianRupee className="h-6 w-6 stroke-[3]" />
                  {emi.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="border-t border-slate-200/80 pt-4 grid grid-cols-2 gap-4">
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Principal Amount
                  </span>
                  <span className="text-sm font-bold text-slate-800">
                    ₹{amount.toLocaleString("en-IN")}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Total Interest Payable
                  </span>
                  <span className="text-sm font-bold text-slate-800">
                    ₹{totalInterest.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Total Payment (Principal + Int)
              </span>
              <span className="text-lg font-bold text-slate-900">
                ₹{totalPayment.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Net Monthly Income (₹) - {income.toLocaleString("en-IN")}
              </label>
              <input
                type="range"
                min="10000"
                max="1000000"
                step="5000"
                value={income}
                onChange={(e) => setIncome(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>₹10k</span>
                <span>₹10 Lakhs</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Existing Monthly Obligations (₹) - {obligations.toLocaleString("en-IN")}
              </label>
              <input
                type="range"
                min="0"
                max="500000"
                step="2000"
                value={obligations}
                onChange={(e) => setObligations(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>₹0</span>
                <span>₹5 Lakhs</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Tenure (Yrs)
                </label>
                <select
                  value={eligibleTenure}
                  onChange={(e) => setEligibleTenure(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-primary"
                >
                  {[5, 10, 15, 20, 25, 30].map((y) => (
                    <option key={y} value={y}>
                      {y} Years
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Interest Rate (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={eligibleRate}
                  onChange={(e) => setEligibleRate(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-slate-50 rounded-xl p-6 flex flex-col justify-between border border-slate-100">
            <div className="space-y-4">
              <div>
                <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                  Maximum Eligible Loan Amount
                </span>
                <span className="text-3xl font-extrabold text-accent font-display flex items-center mt-1">
                  <IndianRupee className="h-6 w-6 stroke-[3]" />
                  {eligibleAmount > 0 ? eligibleAmount.toLocaleString("en-IN") : "0"}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                *Eligibility calculations are based on a standard 55% FOIR (Fixed Obligation to Income Ratio). Actual bank limits vary depending on credit scores and project profile.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-200">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                Ready to apply for pre-approval?
              </span>
              <Link
                href="/contact?service=loans"
                className="w-full inline-flex items-center justify-center py-2.5 rounded-lg text-sm font-bold text-white gradient-primary hover:opacity-90 transition-opacity"
              >
                Apply for Loan
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
