"use client";

import { useMemo, useState } from "react";
import type { Product, Category, TextureStructure } from "@/lib/types";
import { ProductCard } from "@/components/ProductCard";
import { STRUCTURE_LABELS } from "@/components/textures/FabricTexture";

/**
 * A fabric buyer thinks in specifications — "180 GSM polyester, 42 inch, dot
 * structure". The old site offered a photo grid with no way to narrow it.
 * This is the filter that replaces it.
 */

export type CatalogueItem = {
  product: Product;
  photo: string | null;
  gsmValue: number | null;
};

const GSM_BANDS = [
  { id: "light", label: "Under 140", test: (g: number) => g < 140 },
  { id: "mid", label: "140–169", test: (g: number) => g >= 140 && g < 170 },
  { id: "heavy", label: "170–199", test: (g: number) => g >= 170 && g < 200 },
  { id: "heaviest", label: "200 and above", test: (g: number) => g >= 200 },
];

function Toggle({
  checked,
  onChange,
  label,
  count,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
  count?: number;
}) {
  return (
    <label
      className={`flex items-center justify-between gap-3 py-1.5 px-2 -mx-2 cursor-pointer transition-colors ${
        checked ? "text-indigo" : "text-ink-2 hover:text-ink"
      }`}
    >
      <span className="flex items-center gap-2.5 text-sm">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          aria-label={count === undefined ? label : `${label}, ${count} ${count === 1 ? "fabric" : "fabrics"}`}
          className="sr-only peer"
        />
        <span
          aria-hidden="true"
          className={`w-3.5 h-3.5 border shrink-0 flex items-center justify-center peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-indigo peer-focus-visible:outline-offset-2 ${
            checked ? "bg-indigo border-indigo" : "border-ink-3/50"
          }`}
        >
          {checked && (
            <svg width="9" height="7" viewBox="0 0 9 7">
              <path d="M1 3.5L3.5 6L8 1" fill="none" stroke="var(--color-paper)" strokeWidth="1.6" />
            </svg>
          )}
        </span>
        {label}
      </span>
      {count !== undefined && (
        <span className="figure-mono text-2xs text-ink-3">{count}</span>
      )}
    </label>
  );
}

export function Catalogue({
  items,
  categories,
}: {
  items: CatalogueItem[];
  categories: Category[];
}) {
  const [query, setQuery] = useState("");
  const [cats, setCats] = useState<Set<string>>(() => new Set());
  const [structures, setStructures] = useState<Set<string>>(new Set());
  const [bands, setBands] = useState<Set<string>>(new Set());
  const [filtersOpen, setFiltersOpen] = useState(false);

  const toggle = (
    set: Set<string>,
    apply: (s: Set<string>) => void,
    value: string,
  ) => {
    const next = new Set(set);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    apply(next);
  };

  const structureOptions = useMemo(() => {
    const counts = new Map<string, number>();
    for (const i of items) {
      counts.set(i.product.structure, (counts.get(i.product.structure) ?? 0) + 1);
    }
    return [...counts.entries()].sort((a, b) => b[1] - a[1]);
  }, [items]);

  const categoryOptions = useMemo(
    () =>
      categories
        .map((c) => ({
          ...c,
          count: items.filter((i) => i.product.categories.includes(c.slug)).length,
        }))
        .filter((c) => c.count > 0),
    [categories, items],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return items.filter(({ product, gsmValue }) => {
      if (cats.size && !product.categories.some((c) => cats.has(c))) return false;
      if (structures.size && !structures.has(product.structure)) return false;

      if (bands.size) {
        if (gsmValue === null) return false;
        const inBand = GSM_BANDS.filter((b) => bands.has(b.id)).some((b) =>
          b.test(gsmValue),
        );
        if (!inBand) return false;
      }

      if (q) {
        const haystack = [
          product.name,
          product.summary,
          product.specs.material,
          product.specs.weave,
          product.specs.pattern,
          ...product.applications,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }

      return true;
    });
  }, [items, cats, structures, bands, query]);

  const activeCount = cats.size + structures.size + bands.size + (query ? 1 : 0);

  const clearAll = () => {
    setCats(new Set());
    setStructures(new Set());
    setBands(new Set());
    setQuery("");
  };

  const filterPanel = (
    <div className="space-y-8">
      <div>
        <label htmlFor="fabric-search" className="label-caps text-ink-3 block mb-2.5">
          Search
        </label>
        <input
          id="fabric-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Nirmal, dot, mesh…"
          className="w-full border border-rule bg-paper px-3 py-2.5 text-sm placeholder:text-ink-3/70 focus:border-indigo focus:outline-none"
        />
      </div>

      <fieldset>
        <legend className="label-caps text-ink-3 mb-2">Structure</legend>
        {structureOptions.map(([s, n]) => (
          <Toggle
            key={s}
            checked={structures.has(s)}
            onChange={() => toggle(structures, setStructures, s)}
            count={n}
            label={STRUCTURE_LABELS[s as TextureStructure]}
          />
        ))}
      </fieldset>

      <fieldset>
        <legend className="label-caps text-ink-3 mb-2">Weight (GSM)</legend>
        {GSM_BANDS.map((b) => (
          <Toggle
            key={b.id}
            checked={bands.has(b.id)}
            onChange={() => toggle(bands, setBands, b.id)}
            label={b.label}
          />
        ))}
      </fieldset>

      <fieldset>
        <legend className="label-caps text-ink-3 mb-2">Category</legend>
        {categoryOptions.map((c) => (
          <Toggle
            key={c.slug}
            checked={cats.has(c.slug)}
            onChange={() => toggle(cats, setCats, c.slug)}
            count={c.count}
            label={c.name}
          />
        ))}
      </fieldset>
    </div>
  );

  return (
    <div className="grid lg:grid-cols-[240px_1fr] gap-8 lg:gap-12">
      {/* Desktop filters */}
      <aside className="hidden lg:block">
        <div className="sticky top-28">
          <div className="flex items-baseline justify-between mb-5 pb-3 border-b border-rule">
            <h2 className="text-sm text-ink">Filter</h2>
            {activeCount > 0 && (
              <button
                type="button"
                onClick={clearAll}
                className="text-2xs text-indigo hover:underline"
              >
                Clear ({activeCount})
              </button>
            )}
          </div>
          {filterPanel}
        </div>
      </aside>

      <div>
        <div className="flex items-center justify-between gap-4 mb-6 pb-3 border-b border-rule">
          <p className="text-sm text-ink-2">
            <span className="figure-mono text-ink">{filtered.length}</span>{" "}
            {filtered.length === 1 ? "fabric" : "fabrics"}
            {activeCount > 0 && (
              <span className="text-ink-3"> of {items.length}</span>
            )}
          </p>

          <button
            type="button"
            onClick={() => setFiltersOpen((v) => !v)}
            aria-expanded={filtersOpen}
            className="lg:hidden inline-flex items-center gap-2 border border-ink px-4 py-2 text-sm"
          >
            Filter
            {activeCount > 0 && (
              <span className="figure-mono bg-indigo text-paper px-1.5 text-2xs">
                {activeCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile filter sheet */}
        {filtersOpen && (
          <div className="lg:hidden mb-8 border border-rule p-5 bg-paper-2">
            {filterPanel}
            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={() => setFiltersOpen(false)}
                className="flex-1 bg-indigo text-paper py-3 text-sm"
              >
                Show {filtered.length} {filtered.length === 1 ? "fabric" : "fabrics"}
              </button>
              {activeCount > 0 && (
                <button
                  type="button"
                  onClick={clearAll}
                  className="px-4 border border-ink text-sm"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        )}

        {filtered.length > 0 ? (
          <>
            {/* The filter panel's heading is desktop-only, so without this the
                heading order skips from h1 to the cards' h3 on small screens. */}
            <h2 className="sr-only">Matching fabrics</h2>
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10">
              {filtered.map(({ product, photo }, i) => (
                <ProductCard
                  key={product.slug}
                  product={product}
                  photo={photo}
                  priority={i < 2}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="border border-rule py-20 px-6 text-center">
            <p className="text-lg text-ink">No fabric matches those filters.</p>
            <p className="mt-2 text-ink-2 max-w-sm mx-auto">
              We knit to order as well — tell us the quality you need and
              we&rsquo;ll tell you whether we can run it.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <button
                type="button"
                onClick={clearAll}
                className="border border-ink px-5 py-2.5 text-sm"
              >
                Clear filters
              </button>
              <a
                href="/quote"
                className="bg-indigo text-paper px-5 py-2.5 text-sm"
              >
                Ask for a quality
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
