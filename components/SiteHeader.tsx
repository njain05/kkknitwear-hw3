"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Category } from "@/lib/types";
import { site } from "@/lib/site";
import { useQuoteBasket } from "@/lib/quote-basket";

const NAV = [
  { href: "/fabrics", label: "Fabrics" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader({ categories }: { categories: Category[] }) {
  const { items, ready } = useQuoteBasket();
  const basketCount = ready ? items.length : 0;
  const [menuOpen, setMenuOpen] = useState(false);
  const [rangeOpen, setRangeOpen] = useState(false);
  const rangeRef = useRef<HTMLDivElement>(null);

  // Close the range panel on outside click or Escape.
  useEffect(() => {
    if (!rangeOpen) return;
    const onClick = (e: MouseEvent) => {
      if (!rangeRef.current?.contains(e.target as Node)) setRangeOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setRangeOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [rangeOpen]);

  return (
    <header className="sticky top-0 z-50 bg-paper/95 backdrop-blur-sm border-b border-rule">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:bg-indigo focus:text-paper focus:px-3 focus:py-2"
      >
        Skip to content
      </a>

      <div className="mx-auto max-w-[1440px] px-5 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 gap-6">
          <Link href="/" className="group shrink-0">
            <span className="display block text-lg md:text-xl text-ink leading-none">
              K.K Knitwear
            </span>
            <span className="label-caps block text-ink-3 mt-1 leading-none">
              Ludhiana · est. {site.established}
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Main">
            <div ref={rangeRef} className="relative">
              <button
                type="button"
                onClick={() => setRangeOpen((v) => !v)}
                aria-expanded={rangeOpen}
                className="px-3 py-2 text-sm text-ink-2 hover:text-indigo transition-colors flex items-center gap-1.5"
              >
                Our range
                <svg width="9" height="6" viewBox="0 0 9 6" aria-hidden="true"
                  className={`transition-transform ${rangeOpen ? "rotate-180" : ""}`}>
                  <path d="M1 1L4.5 4.5L8 1" fill="none" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </button>

              {rangeOpen && (
                <div className="absolute left-0 top-full mt-px w-[560px] bg-paper border border-rule shadow-[0_12px_32px_-12px_rgba(20,22,26,0.18)] p-5">
                  <p className="label-caps text-ink-3 mb-3">
                    {categories.length} categories
                  </p>
                  <ul className="grid grid-cols-2 gap-x-6 gap-y-0.5">
                    {categories.map((c) => (
                      <li key={c.slug}>
                        <Link
                          href={`/fabrics?category=${c.slug}`}
                          onClick={() => setRangeOpen(false)}
                          className="block py-1.5 text-sm text-ink-2 hover:text-indigo transition-colors"
                        >
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm text-ink-2 hover:text-indigo transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/quote"
              className="hidden sm:inline-flex items-center gap-2 bg-indigo text-paper text-sm px-4 py-2.5 hover:bg-indigo-deep transition-colors"
            >
              Request a quote
              {basketCount > 0 && (
                <span className="figure-mono bg-paper text-indigo px-1.5 text-2xs leading-5">
                  {basketCount}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="lg:hidden p-2 -mr-2 text-ink"
            >
              <svg width="22" height="14" viewBox="0 0 22 14" aria-hidden="true">
                {menuOpen ? (
                  <path d="M2 2L20 12M20 2L2 12" stroke="currentColor" strokeWidth="1.6" />
                ) : (
                  <path d="M0 1h22M0 7h22M0 13h22" stroke="currentColor" strokeWidth="1.6" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden border-t border-rule bg-paper max-h-[calc(100vh-4rem)] overflow-y-auto">
          <nav className="px-5 py-4" aria-label="Mobile">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block py-3 text-base text-ink border-b border-rule"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/quote"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between py-3 text-base text-indigo border-b border-rule"
            >
              Request a quote
              {basketCount > 0 && (
                <span className="figure-mono bg-indigo text-paper px-2 text-2xs leading-5">
                  {basketCount}
                </span>
              )}
            </Link>

            <p className="label-caps text-ink-3 mt-5 mb-2">Our range</p>
            <ul>
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/fabrics?category=${c.slug}`}
                    onClick={() => setMenuOpen(false)}
                    className="block py-2 text-sm text-ink-2"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
