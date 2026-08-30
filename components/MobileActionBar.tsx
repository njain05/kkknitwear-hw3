"use client";

import Link from "next/link";
import { site } from "@/lib/site";
import { useQuoteBasket } from "@/lib/quote-basket";

/**
 * Buyers in this trade work from a phone. Call, WhatsApp and the quote
 * request stay within thumb reach on every page.
 */
export function MobileActionBar() {
  const { items, ready } = useQuoteBasket();
  const count = ready ? items.length : 0;

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 grid grid-cols-3 border-t border-rule bg-paper/97 backdrop-blur-sm pb-[env(safe-area-inset-bottom)]">
      <a
        href={`tel:${site.phone}`}
        className="flex flex-col items-center justify-center gap-1 py-2.5 text-ink-2 active:bg-paper-2"
      >
        <svg width="17" height="17" viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 3h3l1.5 4-2 1.5a11 11 0 005 5L13 11.5l4 1.5v3a1 1 0 01-1 1A13 13 0 013 4a1 1 0 011-1z" strokeLinejoin="round" />
        </svg>
        <span className="text-2xs">Call</span>
      </a>

      <a
        href={`https://wa.me/${site.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center gap-1 py-2.5 text-ink-2 border-x border-rule active:bg-paper-2"
      >
        <svg width="17" height="17" viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M10 2.5a7.5 7.5 0 00-6.4 11.4L2.5 17.5l3.7-1.05A7.5 7.5 0 1010 2.5z" strokeLinejoin="round" />
        </svg>
        <span className="text-2xs">WhatsApp</span>
      </a>

      <Link
        href="/quote"
        className="flex flex-col items-center justify-center gap-1 py-2.5 text-indigo active:bg-indigo-wash"
      >
        <span className="relative">
          <svg width="17" height="17" viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 3h2l2 10h9M7.5 16.5a1 1 0 100-2 1 1 0 000 2zm7 0a1 1 0 100-2 1 1 0 000 2zM6 6h12l-1.5 5H7" strokeLinejoin="round" />
          </svg>
          {count > 0 && (
            <span className="absolute -top-1.5 -right-2.5 figure-mono bg-indigo text-paper text-[9px] leading-[14px] min-w-[14px] text-center px-0.5">
              {count}
            </span>
          )}
        </span>
        <span className="text-2xs">Quote</span>
      </Link>
    </div>
  );
}
