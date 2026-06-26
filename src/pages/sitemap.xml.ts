import { GetServerSideProps } from "next";
import { blogPosts } from "@/lib/blog-data";

export default function Sitemap() {}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://psrone.vercel.app";

  const staticPages = [
    "",
    "about",
    "contact",
    "blog",
    "privacy",
    "terms",
    "services/franchise",
    "services/loans",
    "services/insurance",
    "services/real-estate",
    "services/business-advisory",
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages
    .map((path) => {
      const slash = path ? "/" : "";
      return `
    <url>
      <loc>${siteUrl}${slash}${path}</loc>
      <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>${path === "" ? "1.0" : "0.8"}</priority>
    </url>`;
    })
    .join("")}
  ${blogPosts
    .map((post) => {
      return `
    <url>
      <loc>${siteUrl}/blog/${post.slug}</loc>
      <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.6</priority>
    </url>`;
    })
    .join("")}
</urlset>
`;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap.trim());
  res.end();

  return {
    props: {},
  };
};
