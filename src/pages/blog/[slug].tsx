import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { blogPosts, BlogPost } from "@/lib/blog-data";
import { Calendar, Clock, ArrowLeft } from "lucide-react";

interface BlogPostProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export default function BlogPostDetail({ post, relatedPosts }: BlogPostProps) {
  if (!post) return <p className="text-center py-20">Loading...</p>;

  // Construct table of contents by searching for H3 markers in post content
  const getTableOfContents = (text: string) => {
    const lines = text.split("\n");
    const headings = lines
      .filter((line) => line.startsWith("### "))
      .map((line) => line.replace("### ", "").trim());
    return headings;
  };

  const toc = getTableOfContents(post.content);

  // Helper to format paragraphs
  const renderContent = (text: string) => {
    return text.split("\n\n").map((para, idx) => {
      const trimmed = para.trim();
      if (!trimmed) return null;

      if (trimmed.startsWith("### ")) {
        const title = trimmed.replace("### ", "");
        const id = title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
        return (
          <h3 key={idx} id={id} className="text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-4 font-heading border-b pb-2">
            {title}
          </h3>
        );
      }

      if (trimmed.startsWith("- ")) {
        const listItems = trimmed
          .split("\n")
          .map((li) => li.replace("- ", "").trim());
        return (
          <ul key={idx} className="list-disc list-inside space-y-2 my-4 text-gray-650 pl-4 text-sm sm:text-base">
            {listItems.map((li, lidx) => (
              <li key={lidx}>{li}</li>
            ))}
          </ul>
        );
      }

      return (
        <p key={idx} className="text-gray-650 text-sm sm:text-base leading-relaxed mb-6 font-body">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <>
      <Head>
        <title>{post.title} | PSR ONE Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={`${post.title} | PSR ONE Blog`} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content={post.author.name} />
      </Head>

      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <Link
            href="/blog"
            className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-primary mb-8 group transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
            Back to Insights
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Article Body */}
            <article className="lg:col-span-8 bg-white rounded-3xl border border-gray-150 p-6 sm:p-12 shadow-sm">
              {/* Category & Stats */}
              <div className="flex items-center space-x-3 mb-6">
                <span className="px-2.5 py-0.5 rounded bg-blue-50 text-primary text-[10px] font-bold uppercase tracking-wider">
                  {post.category}
                </span>
                <span className="text-gray-450 text-xs flex items-center">
                  <Calendar className="h-3.5 w-3.5 mr-1" />
                  {post.date}
                </span>
                <span className="text-gray-450 text-xs flex items-center">
                  <Clock className="h-3.5 w-3.5 mr-1" />
                  {post.readTime}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-gray-900 mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Author short line */}
              <div className="flex items-center space-x-3 mb-8 pb-8 border-b border-gray-100">
                <div className="h-10 w-10 rounded-full bg-slate-100 text-primary flex items-center justify-center font-bold text-sm">
                  {post.author.name.charAt(0)}
                </div>
                <div>
                  <span className="block text-sm font-bold text-gray-900 leading-none">
                    By {post.author.name}
                  </span>
                  <span className="text-xs text-gray-450 mt-1 block">
                    {post.author.role}
                  </span>
                </div>
              </div>

              {/* Rich Text Area */}
              <div className="prose max-w-none">
                {renderContent(post.content)}
              </div>

              {/* Share buttons */}
              <div className="border-t border-gray-100 pt-8 mt-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <span className="text-gray-450 text-xs font-bold uppercase tracking-wider">
                  Share this article:
                </span>
                <div className="flex space-x-2">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center h-9 px-4 rounded-lg bg-gray-50 hover:bg-slate-100 text-gray-650 text-xs font-semibold gap-1.5 transition-colors border border-gray-200"
                  >
                    <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> Twitter
                  </a>
                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&title=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center h-9 px-4 rounded-lg bg-gray-50 hover:bg-slate-100 text-gray-650 text-xs font-semibold gap-1.5 transition-colors border border-gray-200"
                  >
                    <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg> LinkedIn
                  </a>
                </div>
              </div>
            </article>

            {/* Right Column: TOC, Author Profile, Related */}
            <aside className="lg:col-span-4 space-y-8">
              {/* Table of Contents */}
              {toc.length > 0 && (
                <div className="bg-white rounded-2xl border border-gray-150 p-6 shadow-sm">
                  <h3 className="text-gray-900 font-bold text-sm uppercase tracking-wider mb-4 font-heading border-b pb-2">
                    Table of Contents
                  </h3>
                  <ul className="space-y-3">
                    {toc.map((heading) => {
                      const id = heading.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
                      return (
                        <li key={id}>
                          <a
                            href={`#${id}`}
                            className="text-gray-500 hover:text-primary text-xs sm:text-sm leading-relaxed block transition-colors"
                          >
                            {heading}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {/* Author Bio */}
              <div className="bg-white rounded-2xl border border-gray-150 p-6 shadow-sm">
                <h3 className="text-gray-900 font-bold text-sm uppercase tracking-wider mb-4 font-heading border-b pb-2">
                  About the Author
                </h3>
                <div className="flex items-center space-x-3 mb-3">
                  <div className="h-10 w-10 rounded-full bg-slate-100 text-primary flex items-center justify-center font-bold text-sm">
                    {post.author.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-gray-900 font-bold text-sm leading-tight">
                      {post.author.name}
                    </h4>
                    <p className="text-[10px] text-gray-450 font-semibold leading-tight mt-0.5">
                      {post.author.role}
                    </p>
                  </div>
                </div>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                  {post.author.bio}
                </p>
              </div>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="bg-white rounded-2xl border border-gray-150 p-6 shadow-sm">
                  <h3 className="text-gray-900 font-bold text-sm uppercase tracking-wider mb-4 font-heading border-b pb-2">
                    Related Articles
                  </h3>
                  <ul className="space-y-4">
                    {relatedPosts.map((rPost) => (
                      <li key={rPost.slug} className="group">
                        <Link
                          href={`/blog/${rPost.slug}`}
                          className="text-slate-800 font-semibold group-hover:text-primary text-xs sm:text-sm leading-snug block transition-colors"
                        >
                          {rPost.title}
                        </Link>
                        <span className="text-[10px] text-gray-450 block mt-1">
                          {rPost.category} &bull; {rPost.readTime}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = blogPosts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const post = blogPosts.find((p) => p.slug === slug) || null;

  // Sourcing top 2 related posts matching same category or any other
  const relatedPosts = blogPosts
    .filter((p) => p.slug !== slug && (p.category === post?.category || true))
    .slice(0, 2);

  return {
    props: {
      post,
      relatedPosts,
    },
  };
};
