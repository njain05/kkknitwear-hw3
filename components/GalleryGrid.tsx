"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export type GalleryPhoto = {
  src: string;
  productName: string;
  productSlug: string | null;
};

export function GalleryGrid({ photos }: { photos: GalleryPhoto[] }) {
  const [open, setOpen] = useState<number | null>(null);

  const move = useCallback(
    (delta: number) =>
      setOpen((i) => (i === null ? null : (i + delta + photos.length) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    document.addEventListener("keydown", onKey);
    // Stop the page scrolling behind the lightbox.
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, move]);

  const active = open === null ? null : photos[open];

  return (
    <>
      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1.5">
        {photos.map((p, i) => (
          <li key={p.src}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group relative block w-full aspect-square overflow-hidden bg-paper-2"
              aria-label={`View ${p.productName}, photograph ${i + 1} of ${photos.length}`}
            >
              <Image
                src={p.src}
                alt={p.productName}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                loading={i < 10 ? "eager" : "lazy"}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 group-focus-visible:translate-y-0 transition-transform bg-paper/93 px-2.5 py-2 text-2xs text-ink-2 text-left truncate">
                {p.productName}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${active.productName}, photograph ${(open ?? 0) + 1} of ${photos.length}`}
          className="fixed inset-0 z-[60] bg-ink/94 flex flex-col"
          onClick={() => setOpen(null)}
        >
          <div className="flex items-center justify-between p-4 text-paper shrink-0">
            <p className="text-sm">
              {active.productName}
              <span className="figure-mono text-paper/50 ml-3 text-2xs">
                {(open ?? 0) + 1}/{photos.length}
              </span>
            </p>
            <button
              type="button"
              onClick={() => setOpen(null)}
              aria-label="Close"
              className="p-2 -m-2 text-paper/70 hover:text-paper"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                <path d="M2 2L16 16M16 2L2 16" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </button>
          </div>

          <div
            className="relative flex-1 min-h-0 mx-4 mb-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              key={active.src}
              src={active.src}
              alt={active.productName}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>

          <div
            className="flex items-center justify-between gap-4 p-4 pt-0 shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => move(-1)}
              className="border border-paper/30 text-paper px-5 py-2.5 text-sm hover:bg-paper/10"
            >
              Previous
            </button>

            {active.productSlug && (
              <Link
                href={`/fabrics/${active.productSlug}`}
                className="bg-paper text-ink px-5 py-2.5 text-sm"
              >
                View this fabric
              </Link>
            )}

            <button
              type="button"
              onClick={() => move(1)}
              className="border border-paper/30 text-paper px-5 py-2.5 text-sm hover:bg-paper/10"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}
