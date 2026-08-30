/** Knit structures we can draw as a generated SVG texture. */
export type TextureStructure =
  | "dotKnit"
  | "mesh"
  | "terry"
  | "waffle"
  | "riceKnit"
  | "jersey"
  | "stripe"
  | "rib";

export type Specs = {
  material?: string;
  gsm?: string;
  width?: string;
  weave?: string;
  colour?: string;
  pattern?: string;
  usage?: string;
};

export type Product = {
  slug: string;
  name: string;
  /** Category slugs this product belongs to. */
  categories: string[];
  /** Keys into content/image-manifest.json. Order sets gallery order. */
  imageGroups: string[];
  /** One factual sentence. Describes what is visible, claims nothing extra. */
  summary: string;
  /** Drives the fallback texture and the structure filter. */
  structure: TextureStructure;
  specs: Specs;
  /**
   * Spec keys whose values were inferred rather than recovered from the old
   * site. The UI marks these; they must be confirmed with the client.
   */
  unconfirmed: (keyof Specs)[];
  applications: string[];
};

export type Category = {
  slug: string;
  name: string;
  blurb: string;
};

/** A line item in the buyer's quote basket. */
export type BasketItem = {
  slug: string;
  name: string;
  quantity: string;
  colour: string;
  note: string;
};
