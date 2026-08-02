import Link from "next/link";

type ToolKey = "dr" | "authority" | "age";

type ToolCard = {
  key: ToolKey;
  href: string;
  title: string;
  description: string;
  cta: string;
  icon: "gauge" | "link" | "calendar";
};

const tools: ToolCard[] = [
  {
    key: "dr",
    href: "/",
    title: "Domain Rating Checker",
    description: "Check the Domain Rating of any website instantly using real Ahrefs data.",
    cta: "Try DR Checker Now",
    icon: "gauge"
  },
  {
    key: "authority",
    href: "/domain-authority-checker",
    title: "Domain Authority Checker",
    description: "Get a free 0-100 authority score for any domain, with referring domains and global rank.",
    cta: "Try Domain Authority Checker Now",
    icon: "link"
  },
  {
    key: "age",
    href: "/domain-age-checker",
    title: "Domain Age Checker",
    description: "See how old any domain is, pulled live from WHOIS and RDAP registry data.",
    cta: "Try Domain Age Checker Now",
    icon: "calendar"
  }
];

function ToolIcon({ icon }: { icon: ToolCard["icon"] }) {
  if (icon === "link") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M10 13a5 5 0 0 0 7.07 0l2.12-2.12a5 5 0 0 0-7.07-7.07L10.9 5.03"></path>
        <path d="M14 11a5 5 0 0 0-7.07 0L4.81 13.12a5 5 0 0 0 7.07 7.07l1.22-1.22"></path>
      </svg>
    );
  }

  if (icon === "calendar") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M8 2v4M16 2v4M3 10h18"></path>
        <rect x="3" y="4" width="18" height="18" rx="2"></rect>
        <path d="M12 14v3l2 1"></path>
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M3.34 19a10 10 0 1 1 17.32 0"></path>
      <path d="m12 14 4-4"></path>
      <path d="M12 19h.01"></path>
    </svg>
  );
}

export default function DiscoverTools({ activeTool }: { activeTool: ToolKey }) {
  return (
    <section className="discover-tools" aria-labelledby="discover-tools-title">
      <div className="discover-tools__inner">
        <h2 id="discover-tools-title">Discover more SEO tools</h2>
        <div className="discover-tools__grid">
          {tools.filter((tool) => tool.key !== activeTool).map((tool) => (
            <article className="discover-card" key={tool.key}>
              <span className="discover-card__icon">
                <ToolIcon icon={tool.icon} />
              </span>
              <h3>{tool.title}</h3>
              <p>{tool.description}</p>
              <Link href={tool.href}>{tool.cta}</Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
