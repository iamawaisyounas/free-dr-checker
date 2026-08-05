"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function ScrollToTopOnRouteChange() {
  const pathname = usePathname();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    if (previousPathname.current === pathname) {
      return;
    }

    previousPathname.current = pathname;

    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    });
  }, [pathname]);

  return null;
}
