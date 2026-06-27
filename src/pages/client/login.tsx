import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Mail, ArrowLeft, Loader2, CheckCircle } from "lucide-react";

export default function ClientLogin() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("Loan");
  const [isRegistering, setIsRegistering] = useState(false);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [mockLink, setMockLink] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    setSuccess(false);

    try {
      const endpoint = "/api/clients/register";
      const payload = isRegistering
        ? { email, name, company, phone, service }
        : { email, name: email.split("@")[0] };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setMessage(data.message || "Magic link sent successfully!");
        if (data.mockLink) {
          setMockLink(data.mockLink);
        }
      } else {
        setError(data.message || "Something went wrong.");
      }
    } catch {
      setError("Failed to connect to the server. Please check your internet connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Client Portal Login | PSR ONE</title>
        <meta name="description" content="Access the secure PSR ONE client dashboard using passwordless magic links." />
      </Head>

      <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden font-body">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-dark/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
          <div className="flex justify-center">
            <Link href="/" className="inline-flex items-center gap-2 text-white font-bold text-2xl tracking-wider font-heading">
              <span className="text-secondary">PSR</span> ONE
            </Link>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white font-heading">
            {isRegistering ? "Create Client Account" : "Sign In to Client Portal"}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-450">
            {isRegistering ? (
              <span>
                Already have an account?{" "}
                <button onClick={() => setIsRegistering(false)} className="font-medium text-secondary hover:underline focus:outline-none">
                  Sign in
                </button>
              </span>
            ) : (
              <span>
                New client?{" "}
                <button onClick={() => setIsRegistering(true)} className="font-medium text-secondary hover:underline focus:outline-none">
                  Register here
                </button>
              </span>
            )}
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
          <div className="bg-gray-950/80 backdrop-blur-xl py-8 px-4 border border-gray-800 shadow-2xl sm:rounded-2xl sm:px-10">
            {success ? (
              <div className="text-center py-6">
                <CheckCircle className="h-12 w-12 text-emerald-400 mx-auto mb-4 animate-bounce" />
                <h3 className="text-lg font-bold text-white mb-2">Check Your Email</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {message || "We have dispatched a secure sign-in magic link. Please check your inbox and click the link to log in."}
                </p>

                {mockLink && (
                  <div className="mt-6 p-4 bg-slate-950 rounded-xl border border-gray-800 text-left">
                    <p className="text-xs text-amber-400 font-bold mb-2">⚠️ Local Test Mode Login Link:</p>
                    <p className="text-[10px] text-gray-450 break-all bg-gray-950 p-2 rounded border border-gray-800 font-mono">
                      {mockLink}
                    </p>
                    <a
                      href={mockLink}
                      className="mt-3 block text-center px-4 py-2 text-xs font-bold bg-secondary hover:bg-secondary-dark text-gray-900 rounded-lg transition-all"
                    >
                      Instant Test Login
                    </a>
                  </div>
                )}

                <button
                  onClick={() => setSuccess(false)}
                  className="mt-6 text-xs text-gray-450 hover:text-white flex items-center gap-1 mx-auto"
                >
                  <ArrowLeft className="h-3 w-3" /> Go back
                </button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleAuth}>
                {isRegistering && (
                  <>
                    <div>
                      <label htmlFor="name" className="block text-xs font-semibold text-gray-300 uppercase tracking-wider">
                        Full Name *
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="mt-1 block w-full px-3 py-2 bg-slate-950 border border-gray-800 rounded-lg text-white placeholder-slate-600 text-sm focus:outline-none focus:border-secondary transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-xs font-semibold text-gray-300 uppercase tracking-wider">
                        Company Name (Optional)
                      </label>
                      <input
                        id="company"
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Acme Corp"
                        className="mt-1 block w-full px-3 py-2 bg-slate-950 border border-gray-800 rounded-lg text-white placeholder-slate-600 text-sm focus:outline-none focus:border-secondary transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-xs font-semibold text-gray-300 uppercase tracking-wider">
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="mt-1 block w-full px-3 py-2 bg-slate-950 border border-gray-800 rounded-lg text-white placeholder-slate-600 text-sm focus:outline-none focus:border-secondary transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="service" className="block text-xs font-semibold text-gray-300 uppercase tracking-wider">
                        Primary Service Needed
                      </label>
                      <select
                        id="service"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-slate-950 border border-gray-800 rounded-lg text-white text-sm focus:outline-none focus:border-secondary transition-colors"
                      >
                        <option value="Franchise">Franchise Investment</option>
                        <option value="Loan">Loans & Capital</option>
                        <option value="Insurance">Insurance Solutions</option>
                        <option value="Real Estate">Real Estate Vetting</option>
                        <option value="Advisory">Corporate Advisory</option>
                      </select>
                    </div>
                  </>
                )}

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Email Address *
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-4 w-4 text-gray-500" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="client@example.com"
                      className="block w-full pl-10 pr-3 py-2 bg-slate-950 border border-gray-800 rounded-lg text-white placeholder-slate-600 text-sm focus:outline-none focus:border-secondary transition-colors"
                    />
                  </div>
                </div>

                {error && <p className="text-xs text-rose-400 font-semibold">{error}</p>}

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center items-center gap-1.5 py-2.5 px-4 border border-transparent rounded-lg text-sm font-bold text-gray-900 bg-secondary hover:bg-secondary-dark focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Dispatched...
                      </>
                    ) : isRegistering ? (
                      "Send Registration Magic Link"
                    ) : (
                      "Send Passwordless Magic Link"
                    )}
                  </button>
                </div>
              </form>
            )}

            <div className="mt-6 border-t border-gray-800 pt-6">
              <Link href="/" className="text-xs text-gray-450 hover:text-white flex items-center gap-1 justify-center transition-colors">
                <ArrowLeft className="h-3 w-3" /> Back to homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
