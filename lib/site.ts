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
   * From the company's own business card. Avnish Jain's mobile is the
   * primary line and the one WhatsApp reaches; the factory number is a
   * secondary contact. The old site's 07942802251 was an IndiaMART virtual
   * number and is deliberately not used anywhere.
   */
  phone: "+919316915363",
  phoneDisplay: "+91 93169 15363",
  whatsapp: "919316915363",
  factoryPhone: "+919815737965",
  factoryPhoneDisplay: "+91 98157 37965",
  email: "avnishjain10@yahoo.co.in",

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
