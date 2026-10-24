"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { COMPANY, NAV, SERVICES, tel } from "@/lib/content";
import ThemeToggle from "./ThemeToggle";
import Icon from "./Icon";

const Chevron = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
    <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServices, setMobileServices] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  // Close menus whenever the page changes
  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
    setMobileServices(false);
  }, [pathname]);

  // Shadow once the page scrolls
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the dropdown on outside click or Escape
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setServicesOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setServicesOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>

      <div className="topbar">
        <div className="wrap">
          <span className="tagline">{COMPANY.tagline}</span>
          <span>
            Khmer <a href={tel(COMPANY.phoneKhmer)}><b>{COMPANY.phoneKhmer}</b></a> · English{" "}
            <a href={tel(COMPANY.phoneEnglish)}><b>{COMPANY.phoneEnglish}</b></a>
          </span>
        </div>
      </div>

      <header className={`site${scrolled ? " scrolled" : ""}`}>
        <div className="wrap nav">
          <Link className="logo" href="/" aria-label={`${COMPANY.name} home`}>
            <Image className="logo-light" src="/logo-header-light.png" alt={COMPANY.name} width={1234} height={240} priority style={{ height: 40, width: "auto" }} />
            <Image className="logo-dark" src="/logo-header-dark.png" alt="" aria-hidden="true" width={1234} height={240} priority style={{ height: 40, width: "auto" }} />
          </Link>

          <nav className="links" aria-label="Main">
            {NAV.slice(1).map((item) =>
              item.href === "/services" ? (
                <div className="drop" key={item.href} ref={dropRef}>
                  <button
                    type="button"
                    className={`drop-btn${isActive("/services") ? " active" : ""}`}
                    aria-expanded={servicesOpen}
                    aria-controls="services-menu"
                    onClick={() => setServicesOpen((v) => !v)}
                  >
                    Services <Chevron />
                  </button>
                  {servicesOpen && (
                    <div className="menu" id="services-menu">
                      {SERVICES.map((s, i) => (
                        <Link key={s.title} href={`/services#s${i + 1}`} onClick={() => setServicesOpen(false)}>
                          <span className="menu-ic"><Icon name={s.icon} size={18} /></span>
                          {s.title}
                        </Link>
                      ))}
                      <Link className="all" href="/services" onClick={() => setServicesOpen(false)}>
                        View all services →
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <Link key={item.href} href={item.href} aria-current={isActive(item.href) ? "page" : undefined}>
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="nav-cta">
            <ThemeToggle />
            <Link className="btn btn-red nav-btn" href="/contact#enquiry">Get support <Icon name="arrow" size={16} /></Link>
            <button
              className="burger"
              type="button"
              aria-expanded={mobileOpen}
              aria-controls="mobileNav"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <nav className="wrap mobile" id="mobileNav" aria-label="Mobile">
            {NAV.map((item) =>
              item.href === "/services" ? (
                <div key={item.href}>
                  <button type="button" className="row-btn" aria-expanded={mobileServices} onClick={() => setMobileServices((v) => !v)}>
                    Services <Chevron />
                  </button>
                  {mobileServices && (
                    <div className="sub">
                      <Link href="/services">All services</Link>
                      {SERVICES.map((s, i) => (
                        <Link key={s.title} href={`/services#s${i + 1}`}>{i + 1}. {s.title}</Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link key={item.href} href={item.href} aria-current={isActive(item.href) ? "page" : undefined}>
                  {item.label}
                </Link>
              )
            )}
            <div className="call">
              <a className="btn btn-navy" href={tel(COMPANY.phoneKhmer)}>Call in Khmer · {COMPANY.phoneKhmer}</a>
              <a className="btn btn-ghost" href={tel(COMPANY.phoneEnglish)}>Call in English · {COMPANY.phoneEnglish}</a>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
