"use client";

import { useEffect, useState } from "react";

type BlogTocItem = {
  id: string;
  heading: string;
};

type BlogTocProps = {
  items: BlogTocItem[];
};

export default function BlogToc({ items }: BlogTocProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

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

  return (
    <nav>
      {items.map((item) => (
        <a
          className={item.id === activeId ? "is-active" : undefined}
          href={`#${item.id}`}
          key={item.id}
          aria-current={item.id === activeId ? "true" : undefined}
        >
          {item.heading}
        </a>
      ))}
    </nav>
  );
}
