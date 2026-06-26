import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { blogPosts, BlogPost } from "@/lib/blog-data";
import { Search, Clock, ArrowRight } from "lucide-react";

export default function BlogListing() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Franchising", "Finance", "Insurance", "Real Estate", "Advisory"];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Head>
        <title>Business Insights & Advisory Blog | PSR ONE</title>
        <meta
          name="description"
          content="Explore expert guides on franchise investments, small business loans, corporate insurance, commercial real estate, and growth strategies."
        />
      </Head>

      <section className="py-12 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark to-slate-900 opacity-95"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <span className="inline-flex px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-bold uppercase tracking-wider mb-4 border border-secondary/20">
            PSR ONE Insights
          </span>
          <h1 className="text-4xl font-display font-extrabold mb-4">
            Knowledge Hub for Enterprise & Wealth
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Practical strategies, market updates, and expert financial analysis curated by our senior advisory partners.
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="py-8 bg-white border-b border-slate-100 sticky top-[72px] z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-primary text-white shadow-sm"
                    : "bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-primary transition-colors text-slate-800 bg-slate-50"
            />
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          </div>
        </div>
      </section>

      {/* Blog Cards Grid */}
      <section className="py-16 bg-slate-50 min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post: BlogPost) => (
                <article
                  key={post.slug}
                  className="bg-white rounded-2xl border border-slate-150 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col h-full card-hover"
                >
                  <div className="p-6 sm:p-8 flex flex-col h-full justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="inline-block px-2.5 py-1 rounded bg-blue-50 text-primary text-[10px] font-bold uppercase tracking-wider">
                          {post.category}
                        </span>
                        <span className="text-slate-400 text-xs flex items-center">
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          {post.readTime}
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 font-heading leading-snug">
                        <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                          {post.title}
                        </Link>
                      </h3>

                      <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="border-t border-slate-100 pt-6 mt-4 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="h-9 w-9 rounded-full bg-slate-100 text-primary flex items-center justify-center font-bold text-xs">
                          {post.author.name.charAt(0)}
                        </div>
                        <div>
                          <span className="block text-xs font-bold text-slate-900 leading-none">
                            {post.author.name}
                          </span>
                          <span className="text-[10px] text-slate-400 font-semibold mt-1 block">
                            {post.date}
                          </span>
                        </div>
                      </div>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="p-2 rounded-lg bg-slate-50 hover:bg-primary hover:text-white transition-all text-slate-700 shadow-sm"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-slate-150 max-w-lg mx-auto shadow-sm">
              <p className="text-slate-500 font-body text-base">
                No articles found matching search criteria. Try a different query.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
