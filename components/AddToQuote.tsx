"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuoteBasket } from "@/lib/quote-basket";

export function AddToQuote({ slug, name }: { slug: string; name: string }) {
  const { add, has, ready } = useQuoteBasket();
  const [justAdded, setJustAdded] = useState(false);
  const inBasket = ready && has(slug);

  if (inBasket) {
    return (
      <div className="flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-2 text-sm text-indigo">
          <svg width="14" height="11" viewBox="0 0 14 11" aria-hidden="true">
            <path d="M1 5.5L5 9.5L13 1.5" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
          {justAdded ? "Added to your quote" : "In your quote request"}
        </span>
        <Link
          href="/quote"
          className="text-sm border-b border-indigo/40 text-indigo hover:border-indigo"
        >
          Review request
        </Link>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        add({ slug, name, quantity: "", colour: "", note: "" });
        setJustAdded(true);
      }}
      className="inline-flex items-center bg-indigo text-paper px-6 py-3.5 hover:bg-indigo-deep transition-colors"
    >
      Add to quote request
    </button>
  );
}
