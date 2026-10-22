// Scroll reveal: content below the fold fades and slides in as it scrolls into view.
// Content already on screen when the page opens is never hidden, and nothing is hidden
// for visitors who prefer reduced motion.

const SELECTOR = [
  ".band > .wrap > .kicker",
  ".band > .wrap > h2",
  ".band > .wrap > .rule",
  ".band > .wrap > .lede",
  ".head",
  ".phase-head",
  ".statement",
  ".pillar",
  ".scard",
  ".chev",
  ".dcard",
  ".chips",
  ".why-item",
  ".faq-side",
  ".faq-item",
  ".cta > div",
  ".sdetail",
  ".area",
  ".value",
  ".vm > div",
  ".reg",
  ".split > div",
  ".lists > div",
  ".compare",
  ".city-card",
  ".role",
  ".contact-grid > .panel",
].join(",");

type Direction = "up" | "left" | "right" | "zoom";

function directionFor(el: HTMLElement): Direction {
  if (el.classList.contains("sdetail")) return el.classList.contains("flip") ? "right" : "left";
  if (el.classList.contains("chev")) return "left";
  if (el.matches(".statement, .compare")) return "zoom";
  return "up";
}

export function initReveal(): () => void {
  if (typeof window === "undefined") return () => {};
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return () => {};
  }
  const main = document.getElementById("main");
  if (!main) return () => {};

  const found = Array.from(main.querySelectorAll<HTMLElement>(SELECTOR)).filter(
    (el) => !el.closest(".hero, .page-hero") && !el.dataset.rv && !el.dataset.rvDone
  );
  // Animate the outermost element only, so nothing moves twice
  const els = found.filter((el) => !found.some((o) => o !== el && o.contains(el)));

  const timers: number[] = [];
  const pending = new Set<HTMLElement>();

  const finish = (el: HTMLElement) => {
    el.classList.remove("rv-in");
    delete el.dataset.rv;
    el.style.removeProperty("--rv-delay");
    el.dataset.rvDone = "1";
  };

  const reveal = (el: HTMLElement) => {
    pending.delete(el);
    el.classList.add("rv-in");
    const delay = parseInt(el.style.getPropertyValue("--rv-delay") || "0", 10);
    // Hand the element back to its normal styles (hover effects etc.) once it has arrived
    timers.push(window.setTimeout(() => finish(el), 1000 + delay));
  };

  // Reveal everything whose top has come within view. Checking positions directly
  // (rather than waiting for visibility events) means fast scrolls and jumps to
  // #anchors can never leave a section hidden.
  let raf = 0;
  const check = () => {
    raf = 0;
    const line = window.innerHeight * 0.92;
    for (const el of Array.from(pending)) {
      if (el.getBoundingClientRect().top < line) reveal(el);
    }
    if (!pending.size) stop();
  };
  const onScroll = () => {
    if (!raf) raf = requestAnimationFrame(check);
  };
  const stop = () => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
  };

  const fold = window.innerHeight * 0.9;
  for (const el of els) {
    if (el.getBoundingClientRect().top < fold) {
      el.dataset.rvDone = "1"; // already visible: leave it alone
      continue;
    }
    const siblings = el.parentElement ? Array.from(el.parentElement.children).filter((c) => els.includes(c as HTMLElement)) : [el];
    const i = Math.max(0, siblings.indexOf(el));
    const isChev = el.classList.contains("chev");
    const delay = isChev ? i * 110 : (i % 4) * 90;
    el.style.setProperty("--rv-delay", `${delay}ms`);
    el.dataset.rv = directionFor(el);
    pending.add(el);
  }

  if (pending.size) {
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
  }

  return () => {
    stop();
    timers.forEach((t) => window.clearTimeout(t));
    for (const el of els) {
      if (el.dataset.rv) {
        el.classList.remove("rv-in");
        delete el.dataset.rv;
        el.style.removeProperty("--rv-delay");
      }
    }
  };
}
