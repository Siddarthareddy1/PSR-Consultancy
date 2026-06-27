import { useState } from "react";
import Link from "next/link";
import { Shield, IndianRupee } from "lucide-react";

export default function InsuranceCalculator() {
  const [coverageType, setCoverageType] = useState<"term" | "health" | "keyman" | "asset">("term");
  const [coverageAmount, setCoverageAmount] = useState(10000000); // 1 Cr Term Life default
  const [age, setAge] = useState(30);
  const [tobaccoUser, setTobaccoUser] = useState(false);

  // Health options
  const [familyType, setFamilyType] = useState<"individual" | "floater">("individual");

  // Premium calculations based on rough premium metrics
  const calculatePremium = () => {
    let base = 0;
    if (coverageType === "term") {
      // 1 Cr Term Life basic rate
      base = (coverageAmount / 100000) * 8.5; // ₹8.5 per 1L cover
      // Age multiplier (adds 4% for every year above 18)
      base = base * (1 + (age - 18) * 0.045);
      // Tobacco user markup (+50%)
      if (tobaccoUser) base = base * 1.5;
    } else if (coverageType === "health") {
      // Health cover basic rate
      base = (coverageAmount / 10000) * 120; // ₹120 per 10k cover
      base = base * (1 + (age - 18) * 0.035);
      if (familyType === "floater") base = base * 1.8; // Floater markup
    } else if (coverageType === "keyman") {
      // Keyman premium
      base = (coverageAmount / 100000) * 15;
      base = base * (1 + (age - 18) * 0.05);
      if (tobaccoUser) base = base * 1.6;
    } else if (coverageType === "asset") {
      // Asset cover (flat rate based on cover)
      base = (coverageAmount / 100) * 0.18; // 0.18% rate
    }

    return {
      annual: Math.round(base),
      monthly: Math.round(base / 12),
    };
  };

  const premiums = calculatePremium();

  // Setup options depending on active tab
  const getCoverOptions = () => {
    if (coverageType === "term" || coverageType === "keyman") {
      return [
        { label: "₹50 Lakhs", value: 5000000 },
        { label: "₹1 Crore", value: 10000000 },
        { label: "₹2 Crores", value: 20000000 },
        { label: "₹5 Crores", value: 50000000 },
      ];
    } else if (coverageType === "health") {
      return [
        { label: "₹5 Lakhs", value: 5000000 },
        { label: "₹10 Lakhs", value: 1000000 },
        { label: "₹25 Lakhs", value: 2500000 },
        { label: "₹50 Lakhs", value: 5000000 },
      ];
    } else {
      // Asset
      return [
        { label: "₹10 Lakhs", value: 1000000 },
        { label: "₹50 Lakhs", value: 5000000 },
        { label: "₹1 Crore", value: 10000000 },
        { label: "₹5 Crores", value: 50000000 },
      ];
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-150 shadow-md p-6 sm:p-8 max-w-3xl mx-auto">
      {/* Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8">
        {[
          { id: "term", label: "Term Life" },
          { id: "health", label: "Health Cover" },
          { id: "keyman", label: "Keyman Policy" },
          { id: "asset", label: "Asset Insurance" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setCoverageType(tab.id as "term" | "health" | "keyman" | "asset");
              // reset default cover appropriately
              if (tab.id === "term" || tab.id === "keyman") {
                setCoverageAmount(10000000);
              } else {
                setCoverageAmount(1000000);
              }
            }}
            className={`px-3 py-2.5 rounded-lg font-semibold text-xs sm:text-sm text-center border transition-all ${
              coverageType === tab.id
                ? "bg-primary border-primary text-white shadow-sm"
                : "bg-gray-50 border-gray-200 text-gray-650 hover:bg-slate-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form Inputs */}
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
              Sum Assured / Coverage
            </label>
            <select
              value={coverageAmount}
              onChange={(e) => setCoverageAmount(Number(e.target.value))}
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-primary"
            >
              {getCoverOptions().map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {coverageType !== "asset" && (
            <>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                  Proposer Age - {age} Yrs
                </label>
                <input
                  type="range"
                  min="18"
                  max="65"
                  step="1"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-xs text-gray-450 mt-1">
                  <span>18 Yrs</span>
                  <span>65 Yrs</span>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100">
                {coverageType === "health" ? (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-700">Family Type</span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setFamilyType("individual")}
                        className={`px-3 py-1 rounded text-xs font-bold border transition-colors ${
                          familyType === "individual"
                            ? "bg-gray-950 border-slate-900 text-white"
                            : "bg-white border-gray-200 text-gray-650"
                        }`}
                      >
                        Individual
                      </button>
                      <button
                        onClick={() => setFamilyType("floater")}
                        className={`px-3 py-1 rounded text-xs font-bold border transition-colors ${
                          familyType === "floater"
                            ? "bg-gray-950 border-slate-900 text-white"
                            : "bg-white border-gray-200 text-gray-650"
                        }`}
                      >
                        Floater (Self+Spouse)
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-700">Tobacco Consumer</span>
                    <button
                      onClick={() => setTobaccoUser(!tobaccoUser)}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all ${
                        tobaccoUser
                          ? "bg-rose-50 border-rose-200 text-rose-600"
                          : "bg-gray-50 border-gray-200 text-gray-650"
                      }`}
                    >
                      {tobaccoUser ? "Yes" : "No"}
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Estimation Results */}
        <div className="bg-gray-50 rounded-xl p-6 flex flex-col justify-between border border-gray-100">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="p-1 rounded bg-blue-50 text-primary">
                <Shield className="h-5 w-5" />
              </span>
              <span className="text-xs font-bold text-gray-450 uppercase tracking-wider">
                Estimated Premium
              </span>
            </div>

            <div>
              <span className="text-3xl font-extrabold text-primary font-display flex items-center">
                <IndianRupee className="h-6 w-6 stroke-[3]" />
                {premiums.annual.toLocaleString("en-IN")}
                <span className="text-xs text-gray-450 font-normal ml-1">/ Yr</span>
              </span>
              <span className="block text-sm text-gray-500 font-semibold mt-1">
                Approx. ₹{premiums.monthly.toLocaleString("en-IN")} / month
              </span>
            </div>

            <p className="text-[11px] text-gray-450 leading-relaxed">
              *Premium figures are purely indicative estimations. Actual underwriting takes into account pre-existing conditions, family medical history, and insurer guidelines.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <Link
              href="/contact?service=insurance"
              className="w-full inline-flex items-center justify-center py-2.5 rounded-lg text-sm font-bold text-white bg-accent hover:bg-accent-dark transition-colors shadow-sm"
            >
              Get Custom Quote
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
