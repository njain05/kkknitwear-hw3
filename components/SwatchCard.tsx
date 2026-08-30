import Image from "next/image";

/**
 * The signature element: a fabric swatch card.
 *
 * Suppliers hand buyers a bound card of fabric leaves — the most
 * characteristic object in this trade. Leaves hang from a binding bar at
 * staggered lengths, the way a real card falls open.
 *
 * The photographs are curated by hand, not pulled from the manifest. Only
 * full-bleed texture shots work here: roughly half the recovered library is
 * cut-outs on white or on a workbench, and those expose their background
 * when cropped. Leaves are kept wide for the same reason — a narrow crop
 * magnifies whatever sits at the edge of the frame.
 */
const LEAVES = [
  {
    src: "/products/school-house-t-shirt-fabric-1.jpg",
    label: "Micro knit",
    href: "/fabrics/school-house-t-shirt-fabric",
    drop: "h-[84%]",
  },
  {
    src: "/products/sap-matty-fabric-1.jpg",
    label: "SAP matty",
    href: "/fabrics/sap-matty-fabric",
    drop: "h-full",
  },
  {
    src: "/products/rim-zim-doted-knitted-fabrics-1.jpg",
    label: "Rim Zim dotted",
    href: "/fabrics/rim-zim-doted-knitted-fabrics",
    drop: "h-[91%]",
  },
  {
    src: "/products/black-dot-waffle-fabric-1.jpg",
    label: "Dot waffle",
    href: "/fabrics/black-dot-waffle-fabric",
    drop: "h-[76%]",
  },
];

export function SwatchCard({ totalQualities }: { totalQualities: number }) {
  return (
    <figure className="relative">
      <div className="h-2.5 bg-indigo-deep" />

      <div className="flex gap-1 items-start h-[300px] sm:h-[400px] lg:h-[520px]">
        {LEAVES.map((leaf, i) => (
          <a
            key={leaf.src}
            href={leaf.href}
            className={`relative flex-1 min-w-0 ${leaf.drop} overflow-hidden group focus-visible:outline-offset-[-2px]`}
          >
            <Image
              src={leaf.src}
              alt={`${leaf.label} fabric`}
              fill
              sizes="(max-width: 640px) 25vw, (max-width: 1024px) 15vw, 11vw"
              priority={i < 2}
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute inset-x-0 bottom-0 bg-paper/92 px-2 py-1.5 text-2xs text-ink-2 truncate">
              {leaf.label}
            </span>
          </a>
        ))}
      </div>

      <figcaption className="mt-3 label-caps text-ink-3">
        Swatch card · {LEAVES.length} of {totalQualities} qualities
      </figcaption>
    </figure>
  );
}
