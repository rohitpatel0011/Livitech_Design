"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Menu, X, ArrowUpRight, Building2 } from "lucide-react";

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
  const updateIndicator = (index: number) => {
    const el = itemRefs.current[index];
    if (el) {
      setIndicatorStyle({
        width: el.offsetWidth,
        left: el.offsetLeft,
        backgroundColor: PILL_NAV_ITEMS[index].activeColor,
      });
    }
  };

  useEffect(() => {
    updateIndicator(currentActiveIndex);

    const handleResize = () => updateIndicator(currentActiveIndex);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentActiveIndex]);

  return (
    <header className="sticky top-0 z-50 w-full bg-surface/90 backdrop-blur-md border-b border-border py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Left: Brand Logo */}
        <Link
          href="/"
          onClick={() => setActiveIndex(0)}
          className="flex items-center gap-3 group shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-brand flex items-center justify-center text-white shadow-sm group-hover:bg-brand-dark transition-colors">
            <Building2 className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-ink leading-none">
              LIVITECH DESIGN
            </span>
            <span className="text-[10px] font-bold text-ink-subtle tracking-wider uppercase mt-1">
              Plan · Design · Build
            </span>
          </div>
        </Link>

        {/* Center: Floating Pill Navigation with Sliding Bottom Indicator */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:inline-flex relative overflow-hidden max-w-full bg-white px-5 rounded-[40px] shadow-[0_10px_40px_rgba(159,162,177,0.35)] border border-border/80 items-center"
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
                  color: isActive ? item.activeColor : undefined,
                }}
                className={`group relative z-10 px-4 py-4 mx-1.5 text-sm font-semibold transition-colors duration-300 select-none ${isActive ? "font-bold" : "text-[#83818c] hover:text-[#333333]"
                  }`}
              >
                {item.label}

                {/* Hover Top-Rounded Travertine Bar for Inactive Items */}
                {!isActive && (
                  <span className="pointer-events-none absolute left-0 -bottom-1.5 group-hover:bottom-0 w-full h-[5px] bg-[#D5C4AE] rounded-t-[8px] opacity-0 group-hover:opacity-100 transition-all duration-300" />
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
              backgroundColor: indicatorStyle.backgroundColor,
            }}
          />
        </nav>

        {/* Right: Quick Call & CTA */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <a
            href="tel:+919876543210"
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-full text-xs font-bold text-ink hover:bg-surface-muted border border-border transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-brand" />
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
          className="md:hidden p-2.5 rounded-full bg-surface-muted text-ink border border-border"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Horizontal Scrollable Pill + CTA */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-3 pb-4 space-y-3 bg-surface border-t border-border mt-3">
          <div className="flex items-center gap-2 overflow-x-auto py-2 px-3 bg-white rounded-[30px] shadow-md border border-border">
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
                    color: isActive ? item.activeColor : "#83818c",
                    borderBottom: isActive
                      ? `3px solid ${item.activeColor}`
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
  );
}
