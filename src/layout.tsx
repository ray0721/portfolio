import type { Metadata } from "next";
import "./globals.css";
import { DATA } from "@/content/data";
import AskRayhan from "@/components/AskRayhan";

const site = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const title = "Md Rayhan Hossain | Business Analytics & AI Research";
const description =
  "Md Rayhan Hossain: Business Analytics graduate student at Wright State University working on marketing analytics, customer lifetime value, and AI in business.";

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: { title, description, url: site, type: "website" },
};

const safe = (o: object) => JSON.stringify(o).replace(/</g, "\\u003c");

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const p = DATA.publications[0];
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Md Rayhan Hossain",
    url: site,
    sameAs: Object.values(DATA.links).filter(Boolean),
    affiliation: { "@type": "CollegeOrUniversity", name: "Wright State University" },
    alumniOf: [{ "@type": "CollegeOrUniversity", name: "Cheju Halla University" }],
  };
  const article = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: p.title,
    datePublished: "2026-11-11",
    identifier: `https://doi.org/${p.doi}`,
    url: p.url,
    author: p.authors.map((a: string[]) => ({ "@type": "Person", name: `${a[0]} ${a[1]}` })),
    isPartOf: { "@type": "Periodical", name: p.journal },
  };
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500&family=JetBrains+Mono:wght@400&display=swap"
          rel="stylesheet"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safe(person) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safe(article) }} />
      </head>
      <body>
        {children}
        {process.env.AI_ENABLED === "true" && <AskRayhan />}
      </body>
    </html>
  );
}
