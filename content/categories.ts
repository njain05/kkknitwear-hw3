import type { Category } from "@/lib/types";

/**
 * The 17 categories carried over from the previous site's navigation.
 * All of them must stay listed and reachable — see CLAUDE.md, feature parity.
 * Products may belong to more than one.
 */
export const categories: Category[] = [
  {
    slug: "sportswear-fabric",
    name: "Sportswear Fabric",
    blurb: "Breathable polyester knits for tracksuits, jerseys and activewear.",
  },
  {
    slug: "polyester-fabric",
    name: "Polyester Fabric",
    blurb: "Our core range of 100% polyester knitted cloth.",
  },
  {
    slug: "knitted-fabric",
    name: "Knitted Fabric",
    blurb: "Plain and structured knits across weights and widths.",
  },
  {
    slug: "polyester-knitted-fabric",
    name: "Polyester Knitted Fabric",
    blurb: "Nirmal, micro and interlock knits in polyester.",
  },
  {
    slug: "dot-knit-fabrics",
    name: "Dot Knit Fabrics",
    blurb: "Textured dot-structure knits with body and recovery.",
  },
  {
    slug: "dotted-fabric",
    name: "Dotted Fabric",
    blurb: "Printed and knitted dot patterns.",
  },
  {
    slug: "foma-fabric",
    name: "Foma Fabric",
    blurb: "Foma-finish polyester for garment manufacturing.",
  },
  {
    slug: "mens-lower",
    name: "Mens Lower",
    blurb: "Fabric for lowers, track pants, shorts and pyjamas.",
  },
  {
    slug: "mens-t-shirt",
    name: "Mens T Shirt",
    blurb: "Matty, pique and jersey fabric for t-shirts and polos.",
  },
  {
    slug: "bon-patti",
    name: "Bon Patti",
    blurb: "Ribbed tape and patti for cuffs, collars and waistbands.",
  },
  {
    slug: "terry-fabric",
    name: "Terry Fabric",
    blurb: "Looped-pile terry for absorbency and warmth.",
  },
  {
    slug: "mesh-fabrics",
    name: "Mesh Fabrics",
    blurb: "Open-structure jali and net fabric for lining and ventilation.",
  },
  {
    slug: "baby-blanket-jacket-fabric",
    name: "Baby Blanket & Jacket Fabrics",
    blurb: "Soft lining and shell fabric for blankets and jackets.",
  },
  {
    slug: "home-furnishing",
    name: "Home Furnishing",
    blurb: "Pillow, cushion and upholstery fabric.",
  },
  {
    slug: "chair-cover",
    name: "Chair Cover",
    blurb: "Hard-wearing fabric for tent, table and chair covers.",
  },
  {
    slug: "foams-films-fabrics",
    name: "Foams, Films & Fabrics",
    blurb: "Laminated and bonded constructions.",
  },
  {
    slug: "surplus-fabric",
    name: "Surplus Fabric",
    blurb: "Ready stock and deadstock lots, available immediately.",
  },
];

export const categoryBySlug = new Map(categories.map((c) => [c.slug, c]));
