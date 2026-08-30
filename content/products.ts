import type { Product } from "@/lib/types";

/**
 * The catalogue.
 *
 * Product names and photo groups are recovered verbatim from the previous
 * site. Spec values marked in `unconfirmed` were inferred from the product
 * name or photograph rather than published data — they must be checked with
 * the client before launch. Everything not listed there came from the old
 * site's own structured data.
 *
 * No prices. See CLAUDE.md rule 1.
 */
export const products: Product[] = [
  {
    slug: "sportswear-polyester-fabric",
    name: "Sportswear Polyester Fabric",
    categories: ["sportswear-fabric", "polyester-fabric", "knitted-fabric"],
    imageGroups: ["sportswear-polyester-fabric", "polyester-sportswear-fabrics"],
    summary:
      "Our staple sportswear knit — 100% polyester with an even surface and good recovery, used across tracksuits and team kit.",
    structure: "jersey",
    specs: {
      material: "100% Polyester",
      gsm: "150–200",
      usage: "Garments, sportswear",
      width: "42 inches",
    },
    unconfirmed: ["width"],
    applications: ["Tracksuits", "Team jerseys", "Activewear"],
  },
  {
    slug: "sportswear-black-dot-polyester-fabric",
    name: "Sportswear Black Dot Polyester Fabric",
    categories: ["sportswear-fabric", "dot-knit-fabrics", "dotted-fabric"],
    imageGroups: ["sportswear-black-dot-polyester-fabric"],
    summary:
      "Dot-structure sportswear knit in black, with raised texture that breaks up the surface and improves airflow.",
    structure: "dotKnit",
    specs: {
      material: "100% Polyester",
      colour: "Black",
      pattern: "Dot structure",
      gsm: "160–180",
    },
    unconfirmed: ["gsm"],
    applications: ["Sportswear", "Tracksuits", "Jerseys"],
  },
  {
    slug: "sap-matty-fabric",
    name: "SAP Matty Fabric",
    categories: ["mens-t-shirt", "knitted-fabric", "polyester-fabric"],
    imageGroups: ["sap-matty-fabric"],
    summary:
      "Matty knit with a fine pique surface, the usual choice for polo shirts and collared t-shirts.",
    structure: "waffle",
    specs: {
      material: "Polyester",
      pattern: "Matty / pique",
      gsm: "160–180",
      width: "42 inches",
    },
    unconfirmed: ["gsm", "width"],
    applications: ["Polo shirts", "T-shirts", "Uniforms"],
  },
  {
    slug: "polo-matty-fabric",
    name: "Polo Matty Fabric",
    categories: ["mens-t-shirt", "knitted-fabric"],
    imageGroups: ["polo-matty-fabric"],
    summary:
      "Classic polo matty with a defined honeycomb face — holds shape well through washing.",
    structure: "waffle",
    specs: {
      material: "Polyester",
      pattern: "Matty",
      gsm: "175",
    },
    unconfirmed: ["gsm"],
    applications: ["Polo shirts", "Corporate uniforms"],
  },
  {
    slug: "school-house-t-shirt-fabric",
    name: "School House T-Shirt Fabric",
    categories: ["mens-t-shirt", "knitted-fabric", "polyester-fabric"],
    imageGroups: ["school-house-t-shirt-fabric"],
    summary:
      "T-shirt knit stocked in house colours for school and institutional kit — one of our widest colour ranges.",
    structure: "jersey",
    specs: {
      material: "Polyester",
      colour: "Multicolour",
      pattern: "Plain / solids",
      gsm: "150–170",
    },
    unconfirmed: ["gsm"],
    applications: ["School uniforms", "House t-shirts", "Sports day kit"],
  },
  {
    slug: "polyester-fabric",
    name: "Polyester Fabric",
    categories: ["polyester-fabric", "knitted-fabric", "dotted-fabric"],
    imageGroups: ["polyester-fabric"],
    summary:
      "General-purpose polyester knit carried in a polka dot structure, 107 cm wide.",
    structure: "dotKnit",
    specs: {
      material: "Polyester",
      width: "42 inches / 107 cm",
      pattern: "Polka dots",
      gsm: "130",
    },
    unconfirmed: [],
    applications: ["Garments", "Linings"],
  },
  {
    slug: "plain-knit-fabric",
    name: "Plain Knit Fabric",
    categories: ["knitted-fabric", "polyester-knitted-fabric"],
    imageGroups: ["plain-knit-fabric"],
    summary:
      "Flat single-jersey knit with a clean face, supplied undyed or in solid shades.",
    structure: "jersey",
    specs: {
      material: "Polyester",
      weave: "Plain",
      colour: "White",
      gsm: "140–160",
    },
    unconfirmed: ["gsm"],
    applications: ["T-shirts", "Linings", "Innerwear"],
  },
  {
    slug: "dot-knit-fabric",
    name: "Dot Knit Fabric",
    categories: ["dot-knit-fabrics", "dotted-fabric", "knitted-fabric"],
    imageGroups: ["dot-knit-fabric"],
    summary:
      "Our largest dot-knit range — a raised polka structure carried across a wide colour card.",
    structure: "dotKnit",
    specs: {
      material: "Polyester",
      colour: "Multicolour",
      pattern: "Polka dots",
      weave: "Dot knit",
    },
    unconfirmed: [],
    applications: ["Sportswear", "Lowers", "Jackets"],
  },
  {
    slug: "rim-zim-doted-knitted-fabrics",
    name: "Rim Zim Dotted Knitted Fabric",
    categories: ["dot-knit-fabrics", "dotted-fabric", "polyester-knitted-fabric"],
    imageGroups: ["rim-zim-doted-knitted-fabrics"],
    summary:
      "Rim Zim dotted knit with a fine sparkle-textured face, used where a bit of surface interest is wanted.",
    structure: "dotKnit",
    specs: {
      material: "Polyester",
      pattern: "Dotted",
      gsm: "160",
    },
    unconfirmed: ["gsm"],
    applications: ["Sportswear", "Fashion garments"],
  },
  {
    slug: "black-dot-waffle-fabric",
    name: "Black Dot Waffle Fabric",
    categories: ["dot-knit-fabrics", "knitted-fabric"],
    imageGroups: ["black-dot-waffle-fabric"],
    summary:
      "Waffle-structure knit in black — deep cells give loft and insulation without extra weight.",
    structure: "waffle",
    specs: {
      material: "Polyester",
      colour: "Black",
      pattern: "Waffle",
      gsm: "180–200",
    },
    unconfirmed: ["gsm"],
    applications: ["Jackets", "Thermal layers", "Sportswear"],
  },
  {
    slug: "honeycomb-knitted-fabrics",
    name: "Honeycomb Knitted Fabric",
    categories: ["knitted-fabric", "polyester-knitted-fabric"],
    imageGroups: ["honeycomb-knitted-fabrics"],
    summary:
      "Honeycomb cell structure with good stretch and air movement through the cloth.",
    structure: "waffle",
    specs: {
      material: "Polyester",
      pattern: "Honeycomb",
      gsm: "170",
    },
    unconfirmed: ["gsm"],
    applications: ["Sportswear", "Polo shirts", "Jackets"],
  },
  {
    slug: "rice-knit-fabric",
    name: "Rice Knit Fabric",
    categories: ["knitted-fabric", "polyester-knitted-fabric"],
    imageGroups: ["rice-knit-fabric"],
    summary:
      "Rice-grain texture knit — small raised stitches that hide creasing well.",
    structure: "riceKnit",
    specs: {
      material: "Polyester",
      pattern: "Rice knit",
      gsm: "160",
    },
    unconfirmed: ["gsm"],
    applications: ["Lowers", "Tracksuits", "Casualwear"],
  },
  {
    slug: "polyester-micro-rice-knit-fabric",
    name: "Polyester Micro Rice Knit Fabric",
    categories: ["polyester-knitted-fabric", "knitted-fabric", "mens-lower"],
    imageGroups: ["polyester-micro-rice-knit-fabric"],
    summary:
      "Finer-gauge version of our rice knit, with a softer hand and closer surface.",
    structure: "riceKnit",
    specs: {
      material: "Polyester",
      pattern: "Micro rice knit",
      gsm: "150",
    },
    unconfirmed: ["gsm"],
    applications: ["Lowers", "Track pants", "Casualwear"],
  },
  {
    slug: "nirmal-knit-fabric",
    name: "Nirmal Knit Fabric",
    categories: ["polyester-knitted-fabric", "knitted-fabric"],
    imageGroups: ["nirmal-knit-fabric"],
    summary:
      "Nirmal knit in polyester — a firm, stable cloth widely used for lowers and tracksuits.",
    structure: "jersey",
    specs: {
      material: "Polyester",
      weave: "Nirmal knit",
      gsm: "160",
    },
    unconfirmed: [],
    applications: ["Lowers", "Tracksuits", "Uniforms"],
  },
  {
    slug: "micro-nirmal-knit-fabrics",
    name: "Micro Nirmal Knit Fabric",
    categories: ["polyester-knitted-fabric", "knitted-fabric"],
    imageGroups: ["micro-nirmal-knit-fabrics"],
    summary: "Micro-gauge Nirmal knit with a smoother face and lighter drape.",
    structure: "jersey",
    specs: {
      material: "Polyester",
      weave: "Micro Nirmal knit",
      gsm: "150",
    },
    unconfirmed: ["gsm"],
    applications: ["Lowers", "Sportswear"],
  },
  {
    slug: "nirmal-jali-fabric",
    name: "Nirmal Jali Fabric",
    categories: ["mesh-fabrics", "polyester-knitted-fabric"],
    imageGroups: ["nirmal-jali-fabric"],
    summary:
      "Open jali (net) structure for ventilation panels and lining where airflow matters.",
    structure: "mesh",
    specs: {
      material: "Polyester",
      pattern: "Jali / mesh",
      gsm: "120",
    },
    unconfirmed: ["gsm"],
    applications: ["Sportswear panels", "Linings", "Bags"],
  },
  {
    slug: "micro-knitting-fabric",
    name: "Micro Knitting Fabric",
    categories: ["knitted-fabric", "polyester-knitted-fabric"],
    imageGroups: ["micro-knitting-fabric"],
    summary:
      "Fine-gauge micro knit carried across one of our broadest colour ranges.",
    structure: "jersey",
    specs: {
      material: "Polyester",
      colour: "Multicolour",
      gsm: "150",
    },
    unconfirmed: ["gsm"],
    applications: ["Sportswear", "Lowers", "T-shirts"],
  },
  {
    slug: "micro-pp-fabric",
    name: "Micro PP Fabric",
    categories: ["knitted-fabric", "polyester-fabric"],
    imageGroups: ["micro-pp-fabric"],
    summary: "Micro PP knit — light, quick-drying and stocked in multiple shades.",
    structure: "jersey",
    specs: {
      material: "Polypropylene / polyester",
      gsm: "140",
    },
    unconfirmed: ["material", "gsm"],
    applications: ["Sportswear", "Linings"],
  },
  {
    slug: "polyester-foma-fabric",
    name: "Polyester Foma Fabric",
    categories: ["foma-fabric", "polyester-fabric", "dotted-fabric"],
    imageGroups: ["polyester-foma-fabric"],
    summary:
      "Foma-finish polyester with a dotted face, supplied for general garment manufacture.",
    structure: "dotKnit",
    specs: {
      material: "Polyester",
      usage: "Garments",
      pattern: "Dots",
    },
    unconfirmed: [],
    applications: ["Garments", "Jackets", "Lowers"],
  },
  {
    slug: "bon-patti",
    name: "Bon Patti",
    categories: ["bon-patti", "knitted-fabric"],
    // Tape shots lead; the yarn-cone photograph sits further down the gallery
    // because it shows the input rather than the product.
    imageGroups: [
      "bon-patti-used-in-tracksuit",
      "150-gsm-bon-patti",
      "bon-patti-use-in-lowers-and-track-suits",
      "polyester-bon-patti",
    ],
    summary:
      "Ribbed patti for cuffs, collars and waistbands — carried in 150 GSM and used across tracksuits and lowers.",
    structure: "rib",
    specs: {
      material: "Polyester",
      width: "44 inches",
      gsm: "150",
      usage: "Cuffs, collars, waistbands",
    },
    unconfirmed: [],
    applications: ["Tracksuits", "Lowers", "Cuffs and collars"],
  },
  {
    slug: "sweater-fabric-or-astar-fabric",
    name: "Sweater / Astar Fabric",
    categories: ["knitted-fabric", "baby-blanket-jacket-fabric"],
    imageGroups: ["sweater-fabric-or-astar-fabric"],
    summary:
      "Astar (lining) cloth for sweaters and jackets — smooth face, soft handle.",
    structure: "jersey",
    specs: {
      material: "Polyester",
      usage: "Sweater and jacket lining",
      gsm: "120",
    },
    unconfirmed: ["gsm"],
    applications: ["Sweaters", "Jacket lining"],
  },
  {
    slug: "lining-fabric-for-baby-blankets",
    name: "Lining Fabric for Baby Blankets",
    categories: ["baby-blanket-jacket-fabric", "knitted-fabric"],
    imageGroups: ["lining-fabric-for-baby-blankets"],
    summary:
      "Soft polyester lining used on the reverse of baby blankets and light jackets.",
    structure: "terry",
    specs: {
      material: "Polyester",
      width: "40–42 inches",
      usage: "Blanket and jacket lining",
    },
    unconfirmed: [],
    applications: ["Baby blankets", "Jackets"],
  },
  {
    slug: "pillow-cover-fabric",
    name: "Pillow Cover Fabric",
    categories: ["home-furnishing"],
    imageGroups: ["pillow-cover-fabric"],
    summary:
      "Home furnishing cloth for pillow and cushion covers, carried in stripes and solids.",
    structure: "stripe",
    specs: {
      material: "Polyester",
      pattern: "Stripe",
      gsm: "85",
    },
    unconfirmed: [],
    applications: ["Pillow covers", "Cushion covers", "Home furnishing"],
  },
  {
    slug: "tent-table-and-chair-cover-fabrics",
    name: "Tent, Table & Chair Cover Fabric",
    categories: ["chair-cover", "home-furnishing"],
    imageGroups: ["tent-table-and-chair-cover-fabrics"],
    summary:
      "Heavier cloth for event covers — tents, table skirting and chair covers.",
    structure: "stripe",
    specs: {
      material: "Polyester",
      usage: "Tent, table and chair covers",
      gsm: "200",
    },
    unconfirmed: ["gsm"],
    applications: ["Event tenting", "Table covers", "Chair covers"],
  },
  {
    slug: "surplus-polyester-fabric",
    name: "Surplus Polyester Fabric",
    categories: ["surplus-fabric", "polyester-fabric"],
    imageGroups: ["surplus-polyester-fabric"],
    summary:
      "Ready-stock surplus lots in a dot structure — available immediately, quantities vary by shade.",
    structure: "dotKnit",
    specs: {
      material: "Polyester",
      gsm: "180",
      width: "42 inches",
      weave: "Dot",
    },
    unconfirmed: [],
    applications: ["Immediate requirements", "Sampling", "Short runs"],
  },
];
