import Link from "next/link";

type RelatedLink = {
  href: string;
  label: string;
};

export default function RelatedLinks({ links }: { links: RelatedLink[] }) {
  return (
    <nav className="related-links" aria-label="Related pages">
      <h2>Related Pages</h2>
      <div>
        {links.map((link) => (
          <Link key={link.href} href={link.href}>{link.label}</Link>
        ))}
      </div>
    </nav>
  );
}
