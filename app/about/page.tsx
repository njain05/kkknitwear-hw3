import type { Metadata } from "next";
import Link from "next/link";
import { site, yearsInBusiness, addressOneLine } from "@/lib/site";
import { getAllProducts, getCategories, totalPhotoCount } from "@/lib/products";
import { FabricTexture } from "@/components/textures/FabricTexture";

export const metadata: Metadata = {
  title: "About us",
  description:
    `Knitted fabric manufacturer in Ludhiana since ${site.established}. ` +
    "A proprietorship run by Avnish Jain, knitting for the garment trade.",
};

/** Verified company facts, carried over from the previous site. */
const FACTS: { label: string; value: string }[] = [
  { label: "Year established", value: String(site.established) },
  { label: "Nature of business", value: site.natureOfBusiness },
  { label: "Legal status", value: site.legalStatus },
  { label: "Proprietor", value: site.owner },
  { label: "Total employees", value: site.employees },
  { label: "Annual turnover", value: "1.5 – 5 Crore" },
  { label: "GST number", value: site.gst },
  { label: "GST registered", value: site.gstRegistered },
  { label: "Banker", value: site.banker },
  { label: "Registered address", value: addressOneLine },
];

export default function AboutPage() {
  const productCount = getAllProducts().length;
  const categoryCount = getCategories().length;

  return (
    <>
      <section className="mx-auto max-w-[1440px] px-5 md:px-8 py-10 md:py-16">
        <div className="max-w-3xl">
          <p className="label-caps text-indigo">About us</p>
          <h1 className="display mt-3 text-4xl md:text-6xl text-ink">
            Knitting for Ludhiana&rsquo;s
            <br className="hidden sm:block" /> garment trade since {site.established}.
          </h1>
        </div>

        <div className="mt-12 grid lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-16">
          <div className="space-y-5 text-lg text-ink-2 leading-relaxed max-w-2xl">
            <p>
              K.K Knitwear Club is a knitted fabric manufacturer working out of
              Kabir Nagar, Ludhiana. We have been running the same knitting
              business for {yearsInBusiness} years, supplying polyester and
              knitted fabric to garment makers, sportswear brands and home
              furnishing manufacturers.
            </p>
            <p>
              The range covers {productCount} qualities across{" "}
              {categoryCount} categories — sportswear knits, dot knit, matty,
              rice knit, Nirmal, mesh, bon patti, blanket lining and home
              furnishing cloth.
            </p>
            <p>
              What we are useful for is flexibility. A large mill needs a large
              order to justify a knitting slot. We will take the short run, and
              we hold surplus lots in ready stock so a shade can ship without
              waiting on production.
            </p>
            <p>
              The business is a proprietorship led by{" "}
              <span className="text-ink">{site.owner}</span>. We deal directly —
              there is no agent between you and the works.
            </p>
          </div>

          <aside className="relative overflow-hidden bg-indigo">
            <div className="absolute inset-0 opacity-20" aria-hidden="true">
              <FabricTexture structure="waffle" ground="indigo" scale={1.5} />
            </div>
            <div className="relative p-7 md:p-9 text-paper">
              <p className="label-caps text-paper/60">In numbers</p>
              <dl className="mt-6 space-y-6">
                {[
                  { n: yearsInBusiness, l: "years knitting" },
                  { n: productCount, l: "qualities in the range" },
                  { n: "11–25", l: "people at the works" },
                  { n: totalPhotoCount, l: "fabric photographs" },
                ].map((s) => (
                  <div key={s.l}>
                    <dt className="sr-only">{s.l}</dt>
                    <dd>
                      <span className="figure-mono block text-3xl leading-none">
                        {s.n}
                      </span>
                      <span className="text-sm text-paper/70 mt-1.5 block">
                        {s.l}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-y border-rule bg-paper-2">
        <div className="mx-auto max-w-[1440px] px-5 md:px-8 py-14 md:py-20">
          <h2 className="display text-2xl md:text-4xl text-ink mb-8">
            Company details
          </h2>
          <table className="w-full max-w-3xl text-sm border-t border-rule">
            <caption className="sr-only">
              Registered company information for {site.name}
            </caption>
            <tbody>
              {FACTS.map((f) => (
                <tr key={f.label} className="border-b border-rule align-top">
                  <th
                    scope="row"
                    className="text-left font-normal text-ink-3 py-3.5 pr-6 w-2/5"
                  >
                    {f.label}
                  </th>
                  <td className="py-3.5 text-ink figure-mono">{f.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 md:px-8 py-14 md:py-20">
        <h2 className="display text-2xl md:text-4xl text-ink mb-10">
          How we work
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              t: "Tell us the quality",
              d: "Send the GSM, width and shade — or just the garment you're making and we'll suggest the quality.",
            },
            {
              t: "We quote per lot",
              d: "Rates depend on quantity, shade and finish, so every enquiry is quoted individually. Samples on request.",
            },
            {
              t: "We knit and dispatch",
              d: "Ready stock ships straight away. Fresh production is scheduled against your lot and lead time.",
            },
          ].map((s, i) => (
            <div key={s.t} className="border-t border-ink pt-5">
              <span className="figure-mono text-2xs text-indigo">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2.5 text-xl text-ink">{s.t}</h3>
              <p className="mt-2 text-ink-2 leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link href="/fabrics" className="bg-indigo text-paper px-6 py-3.5">
            Browse the range
          </Link>
          <Link href="/contact" className="border border-ink px-6 py-3.5 text-ink">
            Contact us
          </Link>
        </div>
      </section>
    </>
  );
}
