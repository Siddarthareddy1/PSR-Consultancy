import Head from "next/head";
import Link from "next/link";
import { AlertCircle, ArrowLeft } from "lucide-react";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Page Not Found | PSR ONE</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <section className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-gray-50">
        <div className="h-16 w-16 rounded-2xl bg-amber-50 text-secondary flex items-center justify-center mb-6 shadow-sm">
          <AlertCircle className="h-8 w-8 stroke-[2.5]" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-gray-900 mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-gray-500 font-body text-sm sm:text-base max-w-md mb-8 leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 rounded-lg text-sm font-bold text-white gradient-primary hover:opacity-90 shadow-md transition-opacity"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home Page
        </Link>
      </section>
    </>
  );
}
