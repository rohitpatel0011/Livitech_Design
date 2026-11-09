"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Menu, X, ArrowUpRight } from "lucide-react";
import BrandLogo from "@/components/ui/BrandLogo";

interface NavPillItem {
  label: string;
  href: string;
  activeColor: string;
}

// Focused navigation items with custom active colors (Earthy Architectural Palette)
const PILL_NAV_ITEMS: NavPillItem[] = [
  { label: "Home", href: "/", activeColor: "#6B4A2E" }, // Rich Bronze
  { label: "Services", href: "/#services", activeColor: "#3A2418" }, // Deep Espresso
  { label: "Projects", href: "/#projects", activeColor: "#A88462" }, // Warm Sandstone
  { label: "Estimator", href: "/#cost-estimator", activeColor: "#4A4A46" }, // Architectural Slate
  { label: "Contact", href: "/#contact", activeColor: "#1A120E" }, // Obsidian Espresso
];

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const [isScrolled, setIsScrolled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Derive active index based on route, falling back to local state
  const currentActiveIndex = pathname.startsWith("/services") ? 1 : activeIndex;

  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState({
    width: 0,
    left: 0,
    backgroundColor: PILL_NAV_ITEMS[0].activeColor,
  });

  // Update sliding indicator position & width
  const updateIndicator = useCallback((index: number) => {
    const el = itemRefs.current[index];
    if (el) {
      setIndicatorStyle({
        width: el.offsetWidth,
        left: el.offsetLeft,
        backgroundColor: PILL_NAV_ITEMS[index].activeColor,
      });
    }
  }, []);

  useEffect(() => {
    updateIndicator(currentActiveIndex);

    const handleResize = () => updateIndicator(currentActiveIndex);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentActiveIndex, updateIndicator]);

  // Scroll listener: transparent over hero image, transition to white when scrolling past the hero
  useEffect(() => {
    const handleScroll = () => {
      if (pathname !== "/") {
        setIsScrolled(true);
        return;
      }

      const heroEl = document.getElementById("hero-section");
      if (heroEl) {
        const rect = heroEl.getBoundingClientRect();
        // When hero bottom reaches header height (~80px), transition to solid white
        setIsScrolled(rect.bottom <= 80);
      } else {
        setIsScrolled(window.scrollY > 400);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [pathname]);

  // Transparent only when on the homepage and within the hero image area
  const isTransparent = isHomePage && !isScrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-in-out ${isTransparent
          ? "py-4 bg-gradient-to-b from-black/60 via-black/25 to-transparent border-b border-transparent"
          : "py-3 bg-white/95 backdrop-blur-md border-b border-border shadow-xs"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Left: Official Brand Logo & Wordmark */}
          <Link
            href="/"
            onClick={() => setActiveIndex(0)}
            className="flex items-center group shrink-0"
            aria-label="Livitect Home"
          >
            <BrandLogo variant="combo" isTransparent={isTransparent} size="md" priority />
          </Link>

          {/* Center: Floating Pill Navigation with Sliding Bottom Indicator */}
          <nav
            aria-label="Main Navigation"
            className={`hidden md:inline-flex relative overflow-hidden max-w-full px-5 rounded-[40px] items-center transition-all duration-300 ${isTransparent
              ? "bg-black/40 backdrop-blur-md border border-white/20 shadow-lg"
              : "bg-white border border-border/80 shadow-[0_10px_40px_rgba(159,162,177,0.35)]"
              }`}
          >
            {PILL_NAV_ITEMS.map((item, idx) => {
              const isActive = currentActiveIndex === idx;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  ref={(el) => {
                    itemRefs.current[idx] = el;
                  }}
                  onClick={() => setActiveIndex(idx)}
                  style={{
                    color: isTransparent
                      ? isActive
                        ? "#FAF7F2"
                        : "rgba(255, 255, 255, 0.75)"
                      : isActive
                        ? item.activeColor
                        : undefined,
                  }}
                  className={`group relative z-10 px-4 py-4 mx-1.5 text-sm font-semibold transition-colors duration-300 select-none ${isActive
                    ? "font-bold"
                    : isTransparent
                      ? "text-white/75 hover:text-white"
                      : "text-[#83818c] hover:text-[#333333]"
                    }`}
                >
                  {item.label}

                  {/* Hover Top-Rounded Travertine Bar for Inactive Items */}
                  {!isActive && (
                    <span
                      className={`pointer-events-none absolute left-0 -bottom-1.5 group-hover:bottom-0 w-full h-[5px] rounded-t-[8px] opacity-0 group-hover:opacity-100 transition-all duration-300 ${isTransparent ? "bg-white/40" : "bg-[#D5C4AE]"
                        }`}
                    />
                  )}
                </Link>
              );
            })}

            {/* Sliding Active Indicator Bar */}
            <span
              className="pointer-events-none absolute bottom-0 h-[5px] z-10 rounded-t-[8px] transition-all duration-400 ease-out"
              style={{
                width: `${indicatorStyle.width}px`,
                left: `${indicatorStyle.left}px`,
                backgroundColor: isTransparent
                  ? "#D5C4AE"
                  : indicatorStyle.backgroundColor,
              }}
            />
          </nav>

          {/* Right: Quick Call & CTA */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <a
              href="tel:+919876543210"
              className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-full text-xs font-bold transition-colors ${isTransparent
                ? "text-white border border-white/30 bg-black/25 hover:bg-white/15 backdrop-blur-xs"
                : "text-ink border border-border hover:bg-surface-muted bg-white/60"
                }`}
            >
              <Phone
                className={`w-3.5 h-3.5 ${isTransparent ? "text-brand-light" : "text-brand"
                  }`}
              />
              <span>Book Free Consultation</span>
            </a>

            <Link
              href="/#contact"
              onClick={() => setActiveIndex(4)}
              className="inline-flex items-center gap-1.5 bg-brand hover:bg-brand-dark text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full shadow-sm transition-all"
            >
              <span>Get Started</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2.5 rounded-full border transition-colors ${isTransparent
              ? "bg-black/40 text-white border-white/20 backdrop-blur-md"
              : "bg-surface-muted text-ink border-border"
              }`}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Horizontal Scrollable Pill + CTA */}
        {mobileMenuOpen && (
          <div
            className={`md:hidden px-4 pt-3 pb-4 space-y-3 border-t mt-3 transition-colors ${isTransparent
              ? "bg-ink/95 backdrop-blur-xl border-white/10 text-white"
              : "bg-surface border-border text-ink"
              }`}
          >
            <div
              className={`flex items-center gap-2 overflow-x-auto py-2 px-3 rounded-[30px] shadow-md border ${isTransparent
                ? "bg-black/60 border-white/20"
                : "bg-white border-border"
                }`}
            >
              {PILL_NAV_ITEMS.map((item, idx) => {
                const isActive = currentActiveIndex === idx;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => {
                      setActiveIndex(idx);
                      setMobileMenuOpen(false);
                    }}
                    style={{
                      color: isTransparent
                        ? isActive
                          ? "#D5C4AE"
                          : "rgba(255, 255, 255, 0.75)"
                        : isActive
                          ? item.activeColor
                          : "#83818c",
                      borderBottom: isActive
                        ? `3px solid ${isTransparent ? "#D5C4AE" : item.activeColor
                        }`
                        : "3px solid transparent",
                    }}
                    className="px-3.5 py-2 text-xs font-bold whitespace-nowrap transition-all"
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Spacer for non-homepage subpages so content starts neatly below the fixed navbar */}
      {!isHomePage && <div className="h-20" aria-hidden="true" />}
    </>
  );
}
