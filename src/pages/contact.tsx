import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  AlertCircle,
  Loader2,
  Target,
  Wallet,
  Shield,
  Building,
  TrendingUp,
  ArrowRight,
  Check,
  X,
} from "lucide-react";

export default function Contact() {
  const router = useRouter();
  const { service: queryService } = router.query;

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    companyName: "",
    budgetRange: "",
    contactMethod: "phone",
    newsletter: false,
    message: "",
  });

  // UI State
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const [siteSettings, setSiteSettings] = useState({
    phone: "+91 9110326887",
    email: "sandeepsunnycool7@gmail.com",
    address: "3rd Floor, PSR Heights, Near Hitech City Junction, Hitech City Road, Madhapur, Hyderabad, Telangana, 500081, India (Opposite Timmidkunta Lake)",
    instagram: "https://www.instagram.com/psrconsultancy_hyderabad",
  });

  // Sync service selection and load custom settings
  useEffect(() => {
    if (queryService) {
      setFormData((prev) => ({ ...prev, service: queryService as string }));
    }

    const loadSettings = async () => {
      try {
        const res = await fetch("/api/settings");
        if (res.ok) {
          const data = await res.json();
          setSiteSettings(data);
          return;
        }
      } catch (err) {
        console.error("Failed to fetch contact page settings:", err);
      }

      const saved = localStorage.getItem("psr_site_settings");
      if (saved) {
        try {
          setSiteSettings(JSON.parse(saved));
        } catch {
          // ignore
        }
      }
    };

    loadSettings();
  }, [queryService]);

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};
    if (step === 1) {
      if (!formData.service) newErrors.service = "Please select a service";
    }
    if (step === 2) {
      if (!formData.name.trim()) {
        newErrors.name = "Name is required";
      } else if (formData.name.trim().length < 3) {
        newErrors.name = "Name required (min 3 characters)";
      }
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Enter a valid email address";
      }
      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required";
      } else if (!/^[0-9+\s-]{10,15}$/.test(formData.phone.trim())) {
        newErrors.phone = "Enter a valid phone number";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleSelectService = (serviceId: string) => {
    setFormData((prev) => ({ ...prev, service: serviceId }));
    setErrors((prev) => ({ ...prev, service: "" }));
  };

  const handleRadioChange = (val: string) => {
    setFormData((prev) => ({ ...prev, contactMethod: val }));
  };

  // Real-time status indicator
  const getFieldStatus = (name: string) => {
    const val = formData[name as keyof typeof formData];
    if (typeof val !== "string" || !val.trim()) return "none";

    if (name === "name") {
      return val.trim().length >= 3 && /^[a-zA-Z\s]+$/.test(val) ? "valid" : "invalid";
    }
    if (name === "email") {
      return /\S+@\S+\.\S+/.test(val) ? "valid" : "invalid";
    }
    if (name === "phone") {
      return /^[0-9+\s-]{10,15}$/.test(val.trim()) ? "valid" : "invalid";
    }
    return "none";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(1) || !validateStep(2)) return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      const leadRes = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const contactRes = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (leadRes.ok && contactRes.ok) {
        setStatus("success");
        setTimeout(() => {
          router.push("/success");
        }, 1500);
      } else {
        setStatus("error");
        setErrorMessage("We encountered an issue submitting your request. Please try again or call us directly.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("An unexpected error occurred. Please check your internet connection.");
    }
  };

  const servicesList = [
    { id: "franchise", name: "Franchise Investment", icon: Target, desc: "Explore vetted brands and territorials." },
    { id: "loans", name: "Loans & Financing", icon: Wallet, desc: "Access customized business loans." },
    { id: "insurance", name: "Insurance Solutions", icon: Shield, desc: "Protect enterprise liability and assets." },
    { id: "realestate", name: "Real Estate Consulting", icon: Building, desc: "Invest in commercial yield properties." },
    { id: "consulting", name: "Business Advisory", icon: TrendingUp, desc: "Formulate growth and scale strategies." },
  ];

  // Calculate Progress Percentage
  const progressPercent = currentStep === 1 ? 30 : currentStep === 2 ? 70 : 100;

  return (
    <>
      <Head>
        <title>Contact Us & Schedule Consultation | PSR ONE</title>
        <meta
          name="description"
          content="Schedule a strategic consultation with PSR ONE. Multi-purpose lead forms, office directions, operational timings, and click-to-WhatsApp links."
        />
      </Head>

      {/* Hero Header */}
      <section className="py-16 bg-gray-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-25"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
          <span className="inline-flex px-3.5 py-1 rounded-full bg-secondary/15 text-secondary text-xs font-bold uppercase tracking-wider mb-4 border border-secondary/20">
            Get In Touch
          </span>
          <h1 className="text-4xl font-display font-extrabold mb-4 text-white leading-tight">
            Connect With Our Advisory Partners
          </h1>
          <p className="text-gray-400 text-sm max-w-xl mx-auto">
            Schedule an online Zoom assessment or visit our corporate office. We operate 24/7 for urgent portfolio audits.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Form Card */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-150 p-6 sm:p-10 shadow-sm relative overflow-hidden">
              
              {/* Progress Bar Header */}
              <div className="mb-8 space-y-3">
                <div className="flex justify-between items-center text-xs font-bold text-gray-500">
                  <span>STEP {currentStep} OF 3</span>
                  <span>{progressPercent}% COMPLETE</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full w-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-305 ease-out"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
              </div>

              {status === "success" ? (
                <div className="p-8 text-center bg-emerald-50/50 border border-emerald-100 rounded-2xl animate-fadeIn">
                  <CheckCircle className="h-12 w-12 text-emerald-500 mx-auto mb-4 animate-bounce" />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Form Submitted Successfully!</h3>
                  <p className="text-gray-600 text-sm">Redirecting you to our confirmation page...</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {status === "error" && (
                    <div className="p-4 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 text-xs flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 flex-shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Step 1: Service Selection */}
                  {currentStep === 1 && (
                    <div className="space-y-6 fade-in">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 font-heading mb-2">
                          Which service are you interested in?
                        </h2>
                        <p className="text-xs text-gray-500 mb-6">
                          Select the vertical matching your syndicate profile or financial requirements.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {servicesList.map((service) => {
                            const IconComp = service.icon;
                            const isSelected = formData.service === service.id;
                            return (
                              <button
                                type="button"
                                key={service.id}
                                onClick={() => handleSelectService(service.id)}
                                className={`p-4 rounded-xl border text-left flex items-start gap-4 transition-all duration-200 ${
                                  isSelected
                                    ? "border-primary bg-primary-light/10 shadow-sm"
                                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50/50"
                                }`}
                              >
                                <div className={`h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm ${
                                  isSelected ? "bg-primary text-white" : "bg-gray-50 text-gray-600"
                                }`}>
                                  <IconComp className="h-5 w-5" />
                                </div>
                                <div>
                                  <p className="text-xs font-bold text-gray-900 leading-tight">{service.name}</p>
                                  <p className="text-[10px] text-gray-400 mt-1 leading-tight">{service.desc}</p>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                        {errors.service && <span className="text-xs text-rose-500 mt-2 block font-medium">{errors.service}</span>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 font-heading">
                          Budget Range <span className="text-gray-450 font-normal">(Optional)</span>
                        </label>
                        <select
                          name="budgetRange"
                          value={formData.budgetRange}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-primary text-gray-800 bg-gray-50"
                        >
                          <option value="">Select range</option>
                          <option value="under-10l">Under ₹10 Lakhs</option>
                          <option value="10l-50l">₹10 Lakhs - ₹50 Lakhs</option>
                          <option value="50l-2cr">₹50 Lakhs - ₹2 Crores</option>
                          <option value="above-2cr">Above ₹2 Crores</option>
                        </select>
                      </div>

                      <div className="pt-4">
                        <button
                          type="button"
                          onClick={handleNextStep}
                          disabled={!formData.service}
                          className="w-full py-3.5 rounded-lg text-xs font-bold text-gray-900 bg-secondary hover:bg-secondary-light transition-all flex items-center justify-center gap-1.5 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Next: Profile Details <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Contact Details */}
                  {currentStep === 2 && (
                    <div className="space-y-6 fade-in">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 font-heading mb-2">
                          Tell us about yourself
                        </h2>
                        <p className="text-xs text-gray-500 mb-6">
                          Enter your credentials. Checkmarks indicate valid format check validations.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Name Input */}
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 font-heading">
                            Your Name <span className="text-rose-500">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              className={`w-full pl-4 pr-10 py-2.5 rounded-lg border text-xs focus:outline-none transition-colors text-gray-800 bg-gray-50 ${
                                errors.name
                                  ? "border-rose-450 focus:border-rose-450"
                                  : getFieldStatus("name") === "valid"
                                  ? "border-emerald-500 focus:border-emerald-500"
                                  : "border-gray-200 focus:border-primary"
                              }`}
                              placeholder="John Doe"
                            />
                            {getFieldStatus("name") === "valid" && (
                              <Check className="absolute right-3 top-3 h-4 w-4 text-emerald-500" />
                            )}
                            {getFieldStatus("name") === "invalid" && (
                              <X className="absolute right-3 top-3 h-4 w-4 text-rose-500" />
                            )}
                          </div>
                          {errors.name && <span className="text-[10px] text-rose-500 mt-1 block font-medium">{errors.name}</span>}
                        </div>

                        {/* Email Input */}
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 font-heading">
                            Email Address <span className="text-rose-500">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              className={`w-full pl-4 pr-10 py-2.5 rounded-lg border text-xs focus:outline-none transition-colors text-gray-800 bg-gray-50 ${
                                errors.email
                                  ? "border-rose-450 focus:border-rose-450"
                                  : getFieldStatus("email") === "valid"
                                  ? "border-emerald-500 focus:border-emerald-500"
                                  : "border-gray-200 focus:border-primary"
                              }`}
                              placeholder="john@example.com"
                            />
                            {getFieldStatus("email") === "valid" && (
                              <Check className="absolute right-3 top-3 h-4 w-4 text-emerald-500" />
                            )}
                            {getFieldStatus("email") === "invalid" && (
                              <X className="absolute right-3 top-3 h-4 w-4 text-rose-500" />
                            )}
                          </div>
                          {errors.email && <span className="text-[10px] text-rose-500 mt-1 block font-medium">{errors.email}</span>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Phone Input */}
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 font-heading">
                            Phone Number <span className="text-rose-500">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              className={`w-full pl-4 pr-10 py-2.5 rounded-lg border text-xs focus:outline-none transition-colors text-gray-800 bg-gray-50 ${
                                errors.phone
                                  ? "border-rose-450 focus:border-rose-450"
                                  : getFieldStatus("phone") === "valid"
                                  ? "border-emerald-500 focus:border-emerald-500"
                                  : "border-gray-200 focus:border-primary"
                              }`}
                              placeholder="+91 98765 43210"
                            />
                            {getFieldStatus("phone") === "valid" && (
                              <Check className="absolute right-3 top-3 h-4 w-4 text-emerald-500" />
                            )}
                            {getFieldStatus("phone") === "invalid" && (
                              <X className="absolute right-3 top-3 h-4 w-4 text-rose-500" />
                            )}
                          </div>
                          {errors.phone && <span className="text-[10px] text-rose-500 mt-1 block font-medium">{errors.phone}</span>}
                        </div>

                        {/* Company Name */}
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 font-heading">
                            Company Name <span className="text-gray-450 font-normal">(Optional)</span>
                          </label>
                          <input
                            type="text"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-xs focus:outline-none focus:border-primary text-gray-800 bg-gray-50"
                            placeholder="Acme Corp"
                          />
                        </div>
                      </div>

                      <div className="flex gap-4 pt-4">
                        <button
                          type="button"
                          onClick={handlePrevStep}
                          className="w-1/3 py-3 rounded-lg text-xs font-bold text-gray-700 bg-gray-105 hover:bg-gray-200 transition-all text-center border border-gray-200"
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          onClick={handleNextStep}
                          className="w-2/3 py-3 rounded-lg text-xs font-bold text-gray-900 bg-secondary hover:bg-secondary-light transition-all flex items-center justify-center gap-1.5 shadow-sm"
                        >
                          Next: Confirm Details <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Message & Confirmation */}
                  {currentStep === 3 && (
                    <div className="space-y-6 fade-in">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 font-heading mb-2">
                          Add any additional details
                        </h2>
                        <p className="text-xs text-gray-500 mb-6">
                          Review your credentials and write down details about your requirements.
                        </p>
                      </div>

                      {/* Review Box Dashboard */}
                      <div className="p-5 rounded-2xl bg-gray-50 border border-gray-150 space-y-3 text-xs leading-relaxed">
                        <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-2">Review Information</p>
                        <div className="grid grid-cols-2 gap-3 border-b border-gray-200 pb-3">
                          <div>
                            <span className="text-gray-500 font-medium block">Service Category</span>
                            <span className="font-bold text-gray-950 capitalize">{formData.service}</span>
                          </div>
                          <div>
                            <span className="text-gray-500 font-medium block">Budget Range</span>
                            <span className="font-bold text-gray-950">{formData.budgetRange || "Not specified"}</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <span className="text-gray-500 font-medium block">Client Name</span>
                            <span className="font-bold text-gray-905">{formData.name}</span>
                          </div>
                          <div>
                            <span className="text-gray-500 font-medium block">Email Address</span>
                            <span className="font-bold text-gray-905 break-all">{formData.email}</span>
                          </div>
                          <div>
                            <span className="text-gray-500 font-medium block">Phone</span>
                            <span className="font-bold text-gray-905">{formData.phone}</span>
                          </div>
                        </div>
                      </div>

                      {/* Preferred Contact method */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 font-heading">
                          Preferred Contact Method
                        </label>
                        <div className="flex flex-wrap gap-4">
                          {["phone", "email", "whatsapp"].map((method) => (
                            <label
                              key={method}
                              onClick={() => handleRadioChange(method)}
                              className="flex items-center space-x-2 text-xs sm:text-sm text-gray-700 cursor-pointer"
                            >
                              <input
                                type="radio"
                                name="contactMethod"
                                checked={formData.contactMethod === method}
                                readOnly
                                className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                              />
                              <span className="capitalize">{method}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Requirements msg */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 font-heading">
                          Write Your Requirements
                        </label>
                        <textarea
                          name="message"
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-xs focus:outline-none focus:border-primary text-gray-800 bg-gray-50"
                          placeholder="Write down loan sizes, franchise territories preference, or estate investments criteria..."
                        />
                      </div>

                      {/* Newsletter Opt-in */}
                      <label className="flex items-start space-x-3 text-xs sm:text-sm text-gray-650 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          name="newsletter"
                          checked={formData.newsletter}
                          onChange={handleChange}
                          className="h-4.5 w-4.5 rounded border-gray-300 text-primary focus:ring-primary mt-0.5"
                        />
                        <span>Opt-in to our weekly Insights Newsletter. We only send vetted tax updates and franchise list openings.</span>
                      </label>

                      <div className="flex gap-4 pt-4">
                        <button
                          type="button"
                          onClick={handlePrevStep}
                          className="w-1/3 py-3 rounded-lg text-xs font-bold text-gray-700 bg-gray-105 hover:bg-gray-200 transition-all text-center border border-gray-200"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          disabled={status === "submitting"}
                          className="w-2/3 flex items-center justify-center py-3.5 rounded-lg text-xs font-bold text-white bg-primary hover:bg-primary-dark shadow-md transition-opacity disabled:opacity-65 gap-2"
                        >
                          {status === "submitting" ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
                            </>
                          ) : (
                            "Submit Lead Info"
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              )}
            </div>

            {/* Right Column: Contact details & Map */}
            <div className="lg:col-span-5 space-y-8">
              {/* Cards details */}
              <div className="bg-white rounded-3xl border border-gray-150 p-6 sm:p-8 shadow-sm space-y-6">
                <h3 className="text-xl font-bold text-gray-950 font-heading border-b pb-3 border-gray-100">
                  Contact Information
                </h3>

                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-lg bg-blue-50 text-primary flex items-center justify-center flex-shrink-0 shadow-sm border border-primary/10">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">
                      Call Us
                    </span>
                    <a
                      href={`tel:${siteSettings.phone.replace(/\s+/g, "")}`}
                      className="text-base font-bold text-gray-800 hover:text-primary transition-colors block mt-1"
                    >
                      {siteSettings.phone}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-lg bg-emerald-50 text-emerald-650 flex items-center justify-center flex-shrink-0 shadow-sm border border-emerald-500/10">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">
                      Email Address
                    </span>
                    <a
                      href={`mailto:${siteSettings.email}`}
                      className="text-base font-bold text-gray-800 hover:text-primary transition-colors block mt-1 break-all"
                    >
                      {siteSettings.email}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-lg bg-purple-50 text-purple-650 flex items-center justify-center flex-shrink-0 shadow-sm border border-purple-500/10">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">
                      Corporate Office
                    </span>
                    <p className="text-sm font-semibold text-gray-800 mt-1 leading-relaxed">
                      {siteSettings.address}
                    </p>
                  </div>
                </div>
              </div>

              {/* Map Direction Link */}
              <a
                href="https://goo.gl/maps/iyYKMaa8TgvGcjEu8?g_st=ac"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-100 hover:bg-gray-200/60 transition-all rounded-3xl border border-gray-200 aspect-video relative overflow-hidden flex flex-col items-center justify-center p-6 text-center group cursor-pointer shadow-sm"
              >
                <MapPin className="h-10 w-10 text-primary mb-3 group-hover:scale-110 transition-transform animate-bounce" />
                <h4 className="font-bold text-gray-900 font-heading text-sm mb-1 group-hover:text-primary transition-colors">Embedded Map Location</h4>
                <p className="text-gray-500 text-xs max-w-xs leading-relaxed">
                  PSR Heights, Hitech City Road. Opposite Timmidkunta Lake, near Shilparamam Art Gallery and Hitech City Junction.
                </p>
                <span className="text-[10px] font-bold text-primary mt-2 block underline opacity-0 group-hover:opacity-100 transition-opacity">
                  Click for Directions
                </span>
                {/* Visual grid overlay for map feel */}
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
              </a>

              {/* WhatsApp CTA */}
              <a
                href={`https://wa.me/${siteSettings.phone.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center py-3.5 rounded-lg text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors shadow-sm gap-2"
              >
                Chat on WhatsApp ({siteSettings.phone})
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
