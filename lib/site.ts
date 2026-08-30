/**
 * Single source of truth for company facts.
 *
 * These are REAL, verified details recovered from the existing site.
 * Never invent, embellish or alter anything in this file.
 */

export const site = {
  name: "K.K Knitwear Club",
  shortName: "K.K Knitwear",
  tagline: "Mill-direct knitted fabric. Small lots, quick turnaround.",
  supportingLine: "Knitting for Ludhiana's garment trade since 1990.",
  established: 1990,

  url: "https://www.kkknitwearclub.com",

  owner: "Avnish Jain",
  legalStatus: "Proprietorship",
  natureOfBusiness: "Manufacturer",
  employees: "11 to 25 people",
  gst: "03ABLPJ0347H1ZZ",
  gstRegistered: "01-07-2017",
  banker: "HDFC Bank",

  address: {
    line1: "Street No-1, K.K Knitwear Club",
    line2: "Kabir Nagar, Sekhonwal Road",
    city: "Ludhiana",
    pin: "141008",
    state: "Punjab",
    country: "India",
  },

  /**
   * TODO: confirm with client — the number listed on the old site
   * (07942802251) is an IndiaMART virtual number and will NOT work for
   * WhatsApp or direct dialling. Replace both values before launch.
   */
  phone: "+919876543210",
  phoneDisplay: "+91 98765 43210",
  whatsapp: "919876543210",
  email: "info@kkknitwearclub.com",

  hours: "Monday – Saturday, 9:30 am – 7:00 pm",
} as const;

export const addressOneLine = [
  site.address.line1,
  site.address.line2,
  `${site.address.city} - ${site.address.pin}`,
  site.address.state,
  site.address.country,
].join(", ");

/** Years in business, derived so it never goes stale. */
export const yearsInBusiness = new Date().getFullYear() - site.established;
