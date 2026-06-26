import Head from "next/head";

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | PSR ONE</title>
        <meta name="robots" content="noindex, follow" />
      </Head>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-display font-extrabold text-slate-900 mb-8 pb-4 border-b">
            Privacy Policy
          </h1>

          <div className="space-y-6 text-slate-600 text-sm sm:text-base leading-relaxed">
            <p className="font-bold text-slate-800">Effective Date: June 26, 2026</p>
            <p>
              At PSR ONE (formerly PSR Consultancy), we prioritize the privacy and security of our clients&apos; data. This Privacy Policy details how we collect, store, sanitize, and utilize information submitted through our online lead generation and newsletter systems.
            </p>

            <h2 className="text-xl font-bold text-slate-950 font-heading mt-8">1. Information We Collect</h2>
            <p>
              We collect contact information (such as name, email, phone number) and business profiling details (such as company name, service requirements, budget ranges) when you explicitly fill out our contact and subscription forms.
            </p>

            <h2 className="text-xl font-bold text-slate-950 font-heading mt-8">2. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>To schedule consultation calls and match you with designated service experts.</li>
              <li>To record leads securely inside our administrative dashboard.</li>
              <li>To dispatch weekly insights newsletters (if opt-in checkbox is checked).</li>
            </ul>

            <h2 className="text-xl font-bold text-slate-950 font-heading mt-8">3. Data Retention and Sharing</h2>
            <p>
              We do not sell, rent, or lease your contact information to third-party brokers. Data is held securely on encrypted servers. You can request complete deletion of your records by emailing support@psrone.com.
            </p>

            <h2 className="text-xl font-bold text-slate-950 font-heading mt-8">4. Cookies and Analytics</h2>
            <p>
              We utilize standard Google Analytics tracking cookies to monitor user journeys and page performance for SEO optimizations. You can disable cookies in your browser settings without affecting site functionalities.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
