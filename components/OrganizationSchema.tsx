import { site, addressOneLine } from "@/lib/site";

/**
 * Organization + LocalBusiness data for search engines. Deliberately carries
 * no price or offer — everything is quoted per lot.
 */
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    url: site.url,
    description: site.tagline,
    foundingDate: String(site.established),
    email: site.email,
    telephone: site.phone,
    founder: { "@type": "Person", name: site.owner },
    numberOfEmployees: { "@type": "QuantitativeValue", minValue: 11, maxValue: 25 },
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.address.line1}, ${site.address.line2}`,
      addressLocality: site.address.city,
      postalCode: site.address.pin,
      addressRegion: site.address.state,
      addressCountry: "IN",
    },
    identifier: { "@type": "PropertyValue", name: "GST", value: site.gst },
    knowsAbout: [
      "Knitted fabric manufacturing",
      "Polyester fabric",
      "Sportswear fabric",
      "Dot knit fabric",
    ],
    slogan: site.tagline,
    location: { "@type": "Place", address: addressOneLine },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
