import Link from "next/link";
import { FabricTexture } from "@/components/textures/FabricTexture";

export default function NotFound() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.09]" aria-hidden="true">
        <FabricTexture structure="mesh" ground="paper" scale={2} />
      </div>
      <div className="relative mx-auto max-w-[1440px] px-5 md:px-8 py-24 md:py-36 text-center">
        <p className="label-caps text-indigo">404</p>
        <h1 className="display mt-4 text-4xl md:text-6xl text-ink">
          That page isn&rsquo;t here.
        </h1>
        <p className="mt-5 text-lg text-ink-2 max-w-md mx-auto leading-relaxed">
          The link may be out of date. The full range is still where it should be.
        </p>
        <div className="mt-9 flex flex-wrap gap-3 justify-center">
          <Link href="/fabrics" className="bg-indigo text-paper px-6 py-3.5">
            Browse fabrics
          </Link>
          <Link href="/contact" className="border border-ink px-6 py-3.5 text-ink">
            Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}
