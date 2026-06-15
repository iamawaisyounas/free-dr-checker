import type { Metadata } from "next";
import RelatedLinks from "../components/RelatedLinks";

export const metadata: Metadata = {
  title: "Blog - Dr Checker",
  description:
    "Read practical guides about Domain Rating, SEO research, backlinks, and using Dr Checker for smarter website checks.",
  alternates: { canonical: "https://dr-checker.com/blog" },
  openGraph: {
    title: "Dr Checker Blog",
    description: "Practical Domain Rating and SEO guides from Dr Checker.",
    url: "https://dr-checker.com/blog",
    siteName: "Dr Checker",
    type: "website"
  }
};

const posts = [
  {
    title: "What Domain Rating Means",
    description: "A quick guide to reading DR scores and comparing websites without overvaluing one metric.",
    href: "/about#what-is-domain-rating"
  },
  {
    title: "How Accurate Is DR?",
    description: "Learn why Domain Rating is an estimate and how to use it alongside traffic and relevance.",
    href: "/faq#how-accurate-is-the-dr-score"
  },
  {
    title: "When to Check a Website",
    description: "Use DR checks for guest posting, competitor research, outreach screening, and link audits.",
    href: "/#faq-title"
  }
];

export default function BlogPage() {
  return (
    <main className="standard-page">
      <div className="standard-page__inner">
        <p className="page-kicker">Blog</p>
        <h1>Domain Rating & SEO Guides</h1>
        <p className="lead">Simple guides to help you use Domain Rating checks in real SEO, outreach, and competitor research workflows.</p>

        <section className="blog-list" aria-label="Blog posts">
          {posts.map((post) => (
            <article key={post.title}>
              <h2><a href={post.href}>{post.title}</a></h2>
              <p>{post.description}</p>
            </article>
          ))}
        </section>

        <RelatedLinks
          links={[
            { href: "/", label: "Check Domain Rating" },
            { href: "/faq#what-is-domain-rating", label: "Domain Rating FAQ" },
            { href: "/contact", label: "Contact us" }
          ]}
        />
      </div>
    </main>
  );
}
