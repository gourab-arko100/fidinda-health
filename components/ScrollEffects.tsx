"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { initReveal } from "@/lib/reveal";

// Scroll reveal animations + the progress bar at the top of the page.
export default function ScrollEffects() {
  const pathname = usePathname();
  const bar = useRef<HTMLDivElement>(null);

  // Re-scan the page for elements to reveal whenever the route changes
  useEffect(() => initReveal(), [pathname]);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const p = max > 0 ? Math.min(1, doc.scrollTop / max) : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pathname]);

  return <div className="scroll-progress" ref={bar} aria-hidden="true" />;
}
