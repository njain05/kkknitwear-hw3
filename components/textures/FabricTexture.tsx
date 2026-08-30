import type { TextureStructure } from "@/lib/types";

/**
 * Seamless knit-structure textures, drawn rather than photographed.
 *
 * Knit structures are geometric and repeating, so they generate cleanly as
 * SVG: a few hundred bytes, sharp at any size, recolourable from a token.
 *
 * These carry the site's chrome — category tiles, section backgrounds, empty
 * states. They are NEVER a product's main image and are never captioned as a
 * photograph of a specific fabric. See CLAUDE.md rule 7.
 */

export type TextureGround =
  | "indigo"
  | "indigoDeep"
  | "indigoSoft"
  | "paper"
  | "paper2"
  | "paper3"
  | "clay";

const GROUNDS: Record<TextureGround, { ground: string; mark: string }> = {
  indigo: { ground: "var(--color-indigo)", mark: "var(--color-paper)" },
  indigoDeep: { ground: "var(--color-indigo-deep)", mark: "var(--color-paper)" },
  indigoSoft: { ground: "var(--color-indigo-soft)", mark: "var(--color-indigo-deep)" },
  paper: { ground: "var(--color-paper)", mark: "var(--color-indigo)" },
  paper2: { ground: "var(--color-paper-2)", mark: "var(--color-indigo)" },
  paper3: { ground: "var(--color-paper-3)", mark: "var(--color-indigo)" },
  clay: { ground: "var(--color-clay)", mark: "var(--color-paper)" },
};

/** Tile size and marks for each structure, in pattern user units. */
const TILES: Record<
  TextureStructure,
  { w: number; h: number; draw: (mark: string) => React.ReactNode }
> = {
  dotKnit: {
    w: 16,
    h: 16,
    draw: (m) => (
      <>
        <circle cx={4} cy={4} r={2.6} fill={m} opacity={0.92} />
        <circle cx={12} cy={12} r={2.6} fill={m} opacity={0.92} />
      </>
    ),
  },
  mesh: {
    w: 13,
    h: 13,
    draw: (m) => (
      <>
        <path d="M0 0H13M0 0V13" fill="none" stroke={m} strokeWidth={2.4} opacity={0.75} />
        <circle cx={6.5} cy={6.5} r={1} fill={m} opacity={0.3} />
      </>
    ),
  },
  terry: {
    w: 14,
    h: 9,
    draw: (m) => (
      <path
        d="M0 8.5Q3.5 -1 7 8.5Q10.5 -1 14 8.5"
        fill="none"
        stroke={m}
        strokeWidth={1.9}
        strokeLinecap="round"
        opacity={0.8}
      />
    ),
  },
  waffle: {
    w: 18,
    h: 18,
    draw: (m) => (
      <rect
        x={2.5}
        y={2.5}
        width={13}
        height={13}
        rx={2.5}
        fill="none"
        stroke={m}
        strokeWidth={2.2}
        opacity={0.72}
      />
    ),
  },
  riceKnit: {
    w: 10,
    h: 14,
    draw: (m) => (
      <>
        <rect x={3.4} y={1} width={3.2} height={5.2} rx={1.6} fill={m} opacity={0.85} />
        <rect x={8.4} y={8} width={3.2} height={5.2} rx={1.6} fill={m} opacity={0.85} />
        <rect x={-1.6} y={8} width={3.2} height={5.2} rx={1.6} fill={m} opacity={0.85} />
      </>
    ),
  },
  jersey: {
    w: 14,
    h: 13,
    draw: (m) => (
      <path
        d="M0 12.5L7 3.5L14 12.5"
        fill="none"
        stroke={m}
        strokeWidth={2}
        strokeLinejoin="round"
        strokeLinecap="round"
        opacity={0.66}
      />
    ),
  },
  stripe: {
    w: 22,
    h: 22,
    draw: (m) => (
      <>
        <rect x={0} y={0} width={22} height={7} fill={m} opacity={0.82} />
        <rect x={0} y={11} width={22} height={3} fill={m} opacity={0.45} />
        <rect x={0} y={17} width={22} height={1.6} fill={m} opacity={0.3} />
      </>
    ),
  },
  rib: {
    w: 11,
    h: 11,
    draw: (m) => (
      <>
        <rect x={0} y={0} width={4.4} height={11} fill={m} opacity={0.72} />
        <rect x={7} y={0} width={1.5} height={11} fill={m} opacity={0.3} />
      </>
    ),
  },
};

/** Human-readable structure names, used in filters and captions. */
export const STRUCTURE_LABELS: Record<TextureStructure, string> = {
  dotKnit: "Dot knit",
  mesh: "Mesh",
  terry: "Terry loop",
  waffle: "Waffle",
  riceKnit: "Rice knit",
  jersey: "Plain jersey",
  stripe: "Stripe",
  rib: "Rib",
};

type Props = {
  structure: TextureStructure;
  ground?: TextureGround;
  /** Multiplies the tile size. Larger reads calmer at big sizes. */
  scale?: number;
  className?: string;
};

export function FabricTexture({
  structure,
  ground = "indigo",
  scale = 1,
  className,
}: Props) {
  const tile = TILES[structure];
  const colors = GROUNDS[ground];
  const id = `tex-${structure}-${ground}-${String(scale).replace(".", "_")}`;

  return (
    <svg
      className={className}
      aria-hidden="true"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern
          id={id}
          width={tile.w * scale}
          height={tile.h * scale}
          patternUnits="userSpaceOnUse"
          patternTransform={scale === 1 ? undefined : `scale(${scale})`}
        >
          {tile.draw(colors.mark)}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={colors.ground} />
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
