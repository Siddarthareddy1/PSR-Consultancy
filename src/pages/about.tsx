import Head from "next/head";
import Link from "next/link";
import { Award, Compass, Heart, Users, Target, Shield } from "lucide-react";
import { useContent } from "@/lib/useContent";

export default function AboutUs() {
  const { content } = useContent("about", {
    hero_title: "Unified Business & Financial Solutions",
    hero_subtitle: "Supporting entrepreneurs, investors, and families to grow assets and protect capital since 2006.",
    mission_title: "Our Mission",
    mission_desc: "To simplify corporate scaling and wealth management by offering pre-vetted investments, competitive financing options, and legal due diligence tools within a single, integrated platform.",
    vision_title: "Our Vision",
    vision_desc: "To become India's leading platform for multi-service business growth, trusted by 100,000+ partners to secure their operations and deploy capital efficiently.",
    values_title: "Our Core Values",
    values_subtitle: "The operational rules that guide every audit we conduct and term sheet we structure.",
    value1_title: "Client-Centricity",
    value1_desc: "Our clients' milestones drive our advisory directives. We align our success with their financial security.",
    value2_title: "Fiduciary Integrity",
    value2_desc: "No conflict of interest. We deliver unbiased property legal checks and brand due diligence.",
    value3_title: "Operational Excellence",
    value3_desc: "We enforce high operational standards in every project layout we audit or debt we syndicate.",
    value4_title: "Collaborative Growth",
    value4_desc: "We empower local partnerships and build regional franchise holdings that scale ecosystems.",
    timeline1_year: "2006",
    timeline1_title: "PSR Consultancy Formed",
    timeline1_desc: "Started as a boutique regional financial consulting agency in Hyderabad.",
    timeline2_year: "2012",
    timeline2_title: "Debt Syndication Growth",
    timeline2_desc: "Expanded services into corporate loan matchmaking, funding ₹10 Cr+ capital.",
    timeline3_year: "2018",
    timeline3_title: "Franchise & Property Advisory",
    timeline3_desc: "Launched franchise match-making and property legal vetting, scaling client returns.",
    timeline4_year: "2024",
    timeline4_title: "Rebranding to PSR ONE",
    timeline4_desc: "Consolidated all 5 business verticals under a unified multi-service digital platform.",
    team1_name: "Siddharth Reddy",
    team1_role: "Founder & Managing Director",
    team1_bio: "Siddharth has over 20 years of experience in corporate debt syndication and startup capital modeling.",
    team2_name: "Anjali Mehta",
    team2_role: "Head of Risk & Insurance",
    team2_bio: "Anjali oversees corporate health portfolios and liability underwriting audits for medium businesses.",
    team3_name: "Ramesh Sharma",
    team3_role: "Lead Real Estate Counsel",
    team3_bio: "Ramesh directs commercial land vetting and property layout RERA compliance validations."
  });

  const values = [
    {
      title: content.value1_title,
      desc: content.value1_desc,
      icon: Heart,
    },
    {
      title: content.value2_title,
      desc: content.value2_desc,
      icon: Shield,
    },
    {
      title: content.value3_title,
      desc: content.value3_desc,
      icon: Award,
    },
    {
      title: content.value4_title,
      desc: content.value4_desc,
      icon: Users,
    },
  ];

  const timeline = [
    {
      year: content.timeline1_year,
      title: content.timeline1_title,
      desc: content.timeline1_desc,
    },
    {
      year: content.timeline2_year,
      title: content.timeline2_title,
      desc: content.timeline2_desc,
    },
    {
      year: content.timeline3_year,
      title: content.timeline3_title,
      desc: content.timeline3_desc,
    },
    {
      year: content.timeline4_year,
      title: content.timeline4_title,
      desc: content.timeline4_desc,
    },
  ];

  const team = [
    {
      name: content.team1_name,
      role: content.team1_role,
      bio: content.team1_bio,
    },
    {
      name: content.team2_name,
      role: content.team2_role,
      bio: content.team2_bio,
    },
    {
      name: content.team3_name,
      role: content.team3_role,
      bio: content.team3_bio,
    },
  ];

  return (
    <>
      <Head>
        <title>About Us | PSR ONE - Unified Business Solutions</title>
        <meta
          name="description"
          content="Learn about PSR ONE (formerly PSR Consultancy), our 20-year history, core values, leadership team, and credentials in business growth."
        />
      </Head>

      {/* Hero Section */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark to-slate-900 opacity-95"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <span className="inline-flex px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-bold uppercase tracking-wider mb-4 border border-secondary/20">
            About PSR ONE
          </span>
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold mb-4">
            {content.hero_title}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            {content.hero_subtitle}
          </p>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 sm:p-12">
              <div className="h-12 w-12 rounded-xl bg-blue-50 text-primary flex items-center justify-center mb-6 shadow-sm">
                <Target className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-950 mb-4 font-heading">
                {content.mission_title}
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {content.mission_desc}
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 sm:p-12">
              <div className="h-12 w-12 rounded-xl bg-amber-50 text-secondary flex items-center justify-center mb-6 shadow-sm">
                <Compass className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-950 mb-4 font-heading">
                {content.vision_title}
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {content.vision_desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-display font-extrabold text-slate-900 mb-4">
              {content.values_title}
            </h2>
            <p className="text-slate-500 font-body text-base">
              {content.values_subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val, idx) => {
              const IconComp = val.icon;
              return (
                <div key={idx} className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm flex flex-col items-center text-center">
                  <div className="h-10 w-10 rounded-lg bg-slate-50 text-primary flex items-center justify-center mb-4">
                    <IconComp className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading font-bold text-slate-900 text-base mb-2">
                    {val.title}
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-extrabold text-slate-900 mb-4">
              Our Journey
            </h2>
            <p className="text-slate-500 font-body text-base">
              Reflecting on two decades of growth and financial partnership.
            </p>
          </div>

          <div className="space-y-12 relative before:absolute before:left-4 md:before:left-1/2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {timeline.map((item, idx) => (
              <div key={idx} className="relative flex flex-col md:flex-row md:justify-between items-start md:items-center">
                {/* Year Marker */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 h-8 w-8 rounded-full bg-white border-2 border-primary flex items-center justify-center z-10">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                </div>
                {/* Content Block */}
                <div className={`pl-12 md:pl-0 w-full md:w-[45%] ${idx % 2 === 0 ? "md:text-right" : "md:order-2 md:text-left"}`}>
                  <span className="text-2xl font-black text-secondary font-display block mb-1">
                    {item.year}
                  </span>
                  <h3 className="font-heading font-bold text-slate-950 text-base mb-1">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team Grid */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-display font-extrabold text-slate-900 mb-4">
              Leadership Team
            </h2>
            <p className="text-slate-500 font-body text-base">
              Senior advisors overseeing all business divisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full gradient-primary text-white flex items-center justify-center text-xl font-bold mb-4 border border-secondary/20 shadow-md">
                  {member.name.charAt(0)}
                </div>
                <h3 className="font-heading font-bold text-slate-950 text-lg mb-1">
                  {member.name}
                </h3>
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-4">
                  {member.role}
                </span>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-16 bg-white border-t border-slate-100 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-8">
            Accredited and Compliant
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-60">
            <span className="text-base sm:text-lg font-bold text-slate-500 font-heading">ISO 9001:2015 REGISTERED</span>
            <span className="text-base sm:text-lg font-bold text-slate-500 font-heading">IRDAI CORPORATE LICENSE</span>
            <span className="text-base sm:text-lg font-bold text-slate-500 font-heading">RERA REGISTERED ADVISORY</span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-primary text-white text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-secondary/15 rounded-full blur-[100px]"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-extrabold text-white mb-4">
            Partner with PSR ONE Today
          </h2>
          <p className="text-slate-300 font-body text-sm sm:text-base mb-8 max-w-xl mx-auto">
            Let&apos;s start building your business solutions. Schedule a consultation with our advisors.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 rounded-lg text-sm font-bold text-slate-900 bg-secondary hover:bg-secondary-light transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
