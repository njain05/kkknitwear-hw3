"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Photos run edge-to-edge — they are close-up texture shots taken on
 * whatever surface was to hand, so a white product-shot frame would only
 * draw attention to the inconsistent backgrounds.
 */
export function ProductGallery({
  photos,
  name,
}: {
  photos: string[];
  name: string;
}) {
  const [active, setActive] = useState(0);
  const current = photos[active];

  return (
    <div>
      <div className="relative aspect-[4/5] sm:aspect-[1/1] bg-paper-2 overflow-hidden">
        <Image
          key={current}
          src={current}
          alt={`${name} — knitted fabric, close detail`}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
          className="object-cover"
        />
      </div>

      {photos.length > 1 && (
        <ul className="mt-2 grid grid-cols-5 gap-2">
          {photos.slice(0, 10).map((p, i) => (
            <li key={p}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show photograph ${i + 1} of ${name}`}
                aria-current={i === active}
                className={`relative block w-full aspect-square overflow-hidden transition-opacity ${
                  i === active
                    ? "outline outline-2 outline-indigo outline-offset-[-2px]"
                    : "opacity-65 hover:opacity-100"
                }`}
              >
                <Image
                  src={p}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
