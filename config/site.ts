export const site = {
  name: "Structora India Constructions",
  brand: "STRUCTORA",
  domain: "structoraindia.com",
  cin: "U45209TN2021PTC140989",
  nav: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Work", href: "/projects" },
    { label: "About", href: "/about" },
    { label: "Blogs", href: "/blogs" },
    { label: "Contact", href: "/contact" }
  ],
  offices: ["Kumbakonam", "Kovilpatti"],
  contact: {
    whatsapp: "919677770797", // confirmed via client form
    phones: ["82483 62020", "99529 13079"],
    email: "structoraindia@gmail.com",
    hours: "8.30am to 7.00pm", // days not specified by client, confirm
    addresses: [
      { name: "Kumbakonam", lines: "Plot No: 4, Mangalambikai Homes, Annai Anjugam Nagar, Ullur, Kumbakonam, Thanjavur District - 612 001" },
      { name: "Kovilpatti", lines: "354 M4D/4, Nalattinputtur, Kovilpatti, Thoothukudi - 628 716" }
    ]
  },
  services: [
    { slug: "residential", num: "01", name: "Residential", desc: "Independent houses and villas, designed around how a family actually lives." },
    { slug: "commercial", num: "02", name: "Commercial", desc: "Retail, office and mixed-use buildings, delivered to plan and on schedule." },
    { slug: "industrial", num: "03", name: "Industrial", desc: "Durable industrial structures, engineered for the loads they carry." },
    { slug: "renovation", num: "04", name: "Renovation", desc: "Considered restoration and reworking of existing structures." },
    { slug: "multi-floor", num: "05", name: "Multi-floor, G+1 / G+2", desc: "Vertical builds engineered for strength and future growth." }
  ],
  // Real rates from client form (Jul 2026). Kumbakonam 2400, Kovilpatti 2200 per sqft.
  estimatorRates: { Kumbakonam: 2400, Kovilpatti: 2200 } as Record<string, number>,
  // Real package prices: Basic 2400, Standard 2700, Premium 3000 -> multipliers on base
  packageMultiplier: { Basic: 1.0, Standard: 1.125, Premium: 1.25 } as Record<string, number>,
  packagePrices: { Basic: 2400, Standard: 2700, Premium: 3000 } as Record<string, number>,
  materials: ["JSW Steel", "TATA Steel", "UltraTech 53", "Dalmia Cement", "Kajaria Tiles", "Finolex", "First-class teak"]
};
