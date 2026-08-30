"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import type { BasketItem } from "@/lib/types";

/**
 * The quote basket.
 *
 * A buyer sourcing for a season needs a rate on several qualities at once.
 * The old site made them send one enquiry per product; this collects them
 * into a single RFQ.
 *
 * This is NOT a shopping cart — there is no price, no checkout and no
 * payment. See CLAUDE.md rules 1 and 2.
 *
 * localStorage is an external store, so it is read through
 * useSyncExternalStore rather than an effect. That keeps the server and the
 * first client render agreeing on an empty basket, then swaps in the stored
 * one as soon as the store hydrates.
 */

const STORAGE_KEY = "kk-quote-basket-v1";

type Snapshot = { items: BasketItem[]; ready: boolean };

/** Stable references — useSyncExternalStore compares snapshots by identity. */
const EMPTY: Snapshot = { items: [], ready: false };

let snapshot: Snapshot = EMPTY;
let hydrated = false;
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

function parse(raw: string | null): BasketItem[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Defensive: a stale or hand-edited value must not crash the page.
    return parsed.filter(
      (i): i is BasketItem =>
        !!i && typeof i === "object" && typeof (i as BasketItem).slug === "string",
    );
  } catch {
    return [];
  }
}

function hydrate() {
  if (hydrated) return;
  hydrated = true;
  try {
    snapshot = { items: parse(localStorage.getItem(STORAGE_KEY)), ready: true };
  } catch {
    snapshot = { items: [], ready: true };
  }
  emit();
}

function persist(items: BasketItem[]) {
  snapshot = { items, ready: true };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Private browsing or a full quota — the basket still works in memory.
  }
  emit();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  hydrate();
  // Keep other tabs in step.
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      snapshot = { items: parse(e.newValue), ready: true };
      emit();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

const getSnapshot = () => snapshot;
const getServerSnapshot = () => EMPTY;

export function QuoteBasketProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function useQuoteBasket() {
  const { items, ready } = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const add = useCallback((item: BasketItem) => {
    if (snapshot.items.some((i) => i.slug === item.slug)) return;
    persist([...snapshot.items, item]);
  }, []);

  const update = useCallback((slug: string, patch: Partial<BasketItem>) => {
    persist(snapshot.items.map((i) => (i.slug === slug ? { ...i, ...patch } : i)));
  }, []);

  const remove = useCallback((slug: string) => {
    persist(snapshot.items.filter((i) => i.slug !== slug));
  }, []);

  const clear = useCallback(() => persist([]), []);

  return useMemo(
    () => ({
      items,
      ready,
      add,
      update,
      remove,
      clear,
      has: (slug: string) => items.some((i) => i.slug === slug),
    }),
    [items, ready, add, update, remove, clear],
  );
}
