import Head from "next/head";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function Success() {
  return (
    <>
      <Head>
        <title>Submission Successful | PSR ONE</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <section className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-slate-50">
        <div className="h-16 w-16 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center mb-6 shadow-sm">
          <CheckCircle2 className="h-8 w-8 stroke-[2.5]" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-slate-900 mb-4">
          Thank You!
        </h1>
        <p className="text-slate-600 font-body text-sm sm:text-base max-w-md mb-2 leading-relaxed">
          Your information has been securely received by our database.
        </p>
        <p className="text-slate-400 text-xs sm:text-sm max-w-sm mb-8 leading-relaxed">
          A senior advisor will contact you within the next 2 hours via your preferred contact method.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-bold text-slate-800 bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm"
          >
            Back to Home
          </Link>
          <Link
            href="/blog"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-bold text-white gradient-primary hover:opacity-90 shadow-md transition-opacity gap-1.5"
          >
            Browse Blog <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
