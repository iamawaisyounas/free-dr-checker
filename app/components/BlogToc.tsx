"use client";

import { useEffect, useRef, useState } from "react";

type BlogTocItem = {
  id: string;
  heading: string;
};

type BlogTocProps = {
  items: BlogTocItem[];
};

export default function BlogToc({ items }: BlogTocProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const sectionIds = items.map((item) => item.id);
    let frameId = 0;

    const updateActiveSection = () => {
      const scrollOffset = 150;
      const currentSection = sectionIds.reduce((active, id) => {
        const section = document.getElementById(id);

        if (!section) {
          return active;
        }

        return section.getBoundingClientRect().top <= scrollOffset ? id : active;
      }, sectionIds[0] ?? "");

      setActiveId(currentSection);
    };

    const scheduleUpdate = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [items]);

  useEffect(() => {
    if (!activeId) {
      return;
    }

    const nav = navRef.current;
    const activeLink = nav?.querySelector<HTMLAnchorElement>(`a[href="#${CSS.escape(activeId)}"]`);
    const scrollContainer = nav?.closest<HTMLElement>(".blog-post-toc-sidebar");

    if (!activeLink || !scrollContainer || scrollContainer.scrollHeight <= scrollContainer.clientHeight) {
      return;
    }

    const containerRect = scrollContainer.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();
    const padding = 12;

    if (linkRect.top < containerRect.top + padding) {
      scrollContainer.scrollTop -= containerRect.top + padding - linkRect.top;
    } else if (linkRect.bottom > containerRect.bottom - padding) {
      scrollContainer.scrollTop += linkRect.bottom - (containerRect.bottom - padding);
    }
  }, [activeId]);

  return (
    <nav ref={navRef}>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <a
              className={item.id === activeId ? "is-active" : undefined}
              href={`#${item.id}`}
              aria-current={item.id === activeId ? "true" : undefined}
            >
              {item.heading}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
