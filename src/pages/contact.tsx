import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Phone, Mail, MapPin, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Sync service selection with query parameters
  useEffect(() => {
    if (queryService) {
      setFormData((prev) => ({ ...prev, service: queryService as string }));
    }
  }, [queryService]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9+\s-]{10,15}$/.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid phone number";
    }
    if (!formData.service) newErrors.service = "Please select a service";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleRadioChange = (val: string) => {
    setFormData((prev) => ({ ...prev, contactMethod: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      // 1. Submit lead details to Leads capture API (registers inside Supabase/local mockups)
      const leadRes = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // 2. Submit notification details to Contact API (triggers admin/user email confirmations)
      const contactRes = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (leadRes.ok && contactRes.ok) {
        setStatus("success");
        // Redirect to success page after 2 seconds
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
      <section className="py-12 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark to-slate-900 opacity-95"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <span className="inline-flex px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-bold uppercase tracking-wider mb-4 border border-secondary/20">
            Get In Touch
          </span>
          <h1 className="text-4xl font-display font-extrabold mb-4">
            Connect With Our Advisory Partners
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Schedule an online Zoom assessment or visit our corporate office. We operate 24/7 for urgent portfolio audits.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Form Card */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-150 p-6 sm:p-10 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-950 mb-6 font-heading">
                Send Us a Message
              </h2>

              {status === "success" ? (
                <div className="p-8 text-center bg-emerald-50 border border-emerald-100 rounded-2xl">
                  <CheckCircle className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Form Submitted Successfully!</h3>
                  <p className="text-slate-600 text-sm">Redirecting you to our confirmation page...</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {status === "error" && (
                    <div className="p-4 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 text-xs sm:text-sm flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 flex-shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Row 1: Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                        Your Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none transition-colors text-slate-800 bg-slate-50 ${
                          errors.name ? "border-rose-400 focus:border-rose-400" : "border-slate-200 focus:border-primary"
                        }`}
                        placeholder="John Doe"
                      />
                      {errors.name && <span className="text-xs text-rose-500 mt-1 block">{errors.name}</span>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none transition-colors text-slate-800 bg-slate-50 ${
                          errors.email ? "border-rose-400 focus:border-rose-400" : "border-slate-200 focus:border-primary"
                        }`}
                        placeholder="john@example.com"
                      />
                      {errors.email && <span className="text-xs text-rose-500 mt-1 block">{errors.email}</span>}
                    </div>
                  </div>

                  {/* Row 2: Phone & Service Dropdown */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                        Phone Number <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none transition-colors text-slate-800 bg-slate-50 ${
                          errors.phone ? "border-rose-400 focus:border-rose-400" : "border-slate-200 focus:border-primary"
                        }`}
                        placeholder="+91 98765 43210"
                      />
                      {errors.phone && <span className="text-xs text-rose-500 mt-1 block">{errors.phone}</span>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                        Service Interested <span className="text-rose-500">*</span>
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none transition-colors text-slate-800 bg-slate-50 ${
                          errors.service ? "border-rose-400 focus:border-rose-400" : "border-slate-200 focus:border-primary"
                        }`}
                      >
                        <option value="">Select a service</option>
                        <option value="franchise">Franchise Investment</option>
                        <option value="loans">Loans & Financing</option>
                        <option value="insurance">Insurance Solutions</option>
                        <option value="realestate">Real Estate Consulting</option>
                        <option value="consulting">Business Advisory</option>
                        <option value="consultation">General Consultation</option>
                      </select>
                      {errors.service && <span className="text-xs text-rose-500 mt-1 block">{errors.service}</span>}
                    </div>
                  </div>

                  {/* Row 3: Company Name (optional) & Budget Range (optional) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                        Company Name <span className="text-slate-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-primary text-slate-800 bg-slate-50"
                        placeholder="Acme Corp"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                        Budget Range <span className="text-slate-400 font-normal">(Optional)</span>
                      </label>
                      <select
                        name="budgetRange"
                        value={formData.budgetRange}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-primary text-slate-800 bg-slate-50"
                      >
                        <option value="">Select range</option>
                        <option value="under-10l">Under ₹10 Lakhs</option>
                        <option value="10l-50l">₹10 Lakhs - ₹50 Lakhs</option>
                        <option value="50l-2cr">₹50 Lakhs - ₹2 Crores</option>
                        <option value="above-2cr">Above ₹2 Crores</option>
                      </select>
                    </div>
                  </div>

                  {/* Preferred Contact Method (Radios) */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                      Preferred Contact Method
                    </label>
                    <div className="flex flex-wrap gap-4">
                      {["phone", "email", "whatsapp"].map((method) => (
                        <label
                          key={method}
                          onClick={() => handleRadioChange(method)}
                          className="flex items-center space-x-2 text-xs sm:text-sm text-slate-700 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="contactMethod"
                            checked={formData.contactMethod === method}
                            readOnly
                            className="h-4 w-4 border-slate-300 text-primary focus:ring-primary"
                          />
                          <span className="capitalize">{method}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Message (Textarea) */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Write Your Requirements
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-primary text-slate-800 bg-slate-50"
                      placeholder="Details about your loan size, franchise brand preference, or property registry due diligence..."
                    />
                  </div>

                  {/* Newsletter Opt-in (Checkbox) */}
                  <label className="flex items-start space-x-3 text-xs sm:text-sm text-slate-600 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      name="newsletter"
                      checked={formData.newsletter}
                      onChange={handleChange}
                      className="h-4.5 w-4.5 rounded border-slate-350 text-primary focus:ring-primary mt-0.5"
                    />
                    <span>Opt-in to our weekly Insights Newsletter. We only send vetted tax changes, property yield alerts, and new open franchise lists.</span>
                  </label>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full flex items-center justify-center py-3.5 rounded-lg text-sm font-bold text-white gradient-primary hover:opacity-90 shadow-md transition-opacity disabled:opacity-65 gap-2"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="h-4.5 w-4.5 animate-spin" /> Submitting Request...
                      </>
                    ) : (
                      "Submit Lead Information"
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Right Column: Contact details & Map */}
            <div className="lg:col-span-5 space-y-8">
              {/* Cards details */}
              <div className="bg-white rounded-3xl border border-slate-150 p-6 sm:p-8 shadow-sm space-y-6">
                <h3 className="text-xl font-bold text-slate-950 font-heading border-b pb-3">
                  Contact Information
                </h3>

                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-lg bg-blue-50 text-primary flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">
                      Call Us
                    </span>
                    <a
                      href="tel:+919121395329"
                      className="text-base font-bold text-slate-800 hover:text-primary transition-colors block mt-1"
                    >
                      +91 9121395329
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">
                      Email Address
                    </span>
                    <a
                      href="mailto:support@psrone.com"
                      className="text-base font-bold text-slate-800 hover:text-primary transition-colors block mt-1"
                    >
                      support@psrone.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">
                      Corporate Office
                    </span>
                    <p className="text-sm font-semibold text-slate-800 mt-1 leading-relaxed">
                      3rd Floor, PSR Heights, Madhapur, Hyderabad, Telangana, 500081, India
                    </p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder Graphic */}
              <div className="bg-slate-900/5 rounded-3xl border border-slate-200 aspect-video relative overflow-hidden flex flex-col items-center justify-center p-6 text-center">
                <MapPin className="h-10 w-10 text-primary mb-3 animate-bounce" />
                <h4 className="font-bold text-slate-900 font-heading text-sm mb-1">Embedded Map Location</h4>
                <p className="text-slate-500 text-xs max-w-xs leading-relaxed">
                  PSR Heights, Madhapur. Located 200m from the Madhapur Metro Station. Parking available on-site.
                </p>
                {/* Visual grid overlay for map feel */}
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
              </div>

              {/* WhatsApp Quick CTA */}
              <a
                href="https://wa.me/919121395329"
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center py-3.5 rounded-lg text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors shadow-sm gap-2"
              >
                Chat on WhatsApp (+91 9121395329)
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
