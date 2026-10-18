export const site = {
  name: "Structora India Constructions",
  brand: "STRUCTORA",
  domain: "structoraindia.com",
  cin: "U45209TN2021PTC140989",
  nav: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/projects" },
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
    { label: "Blogs", href: "/blogs" },
    { label: "Contact Us", href: "/contact" }
  ],
  offices: ["Kumbakonam", "Kovilpatti"],
  contact: {
    whatsapp: "919677770797", // confirmed via client form
    phones: ["82483 62020", "96777 70797"],
    email: "info@structoraindia.com",
    hours: "8.30am to 7.00pm", // days not specified by client, confirm
    addresses: [
      {
        name: "Kumbakonam",
        lines: "Plot No: 4, Mangalambikai Homes, Annai Anjugam Nagar, Ullur, Kumbakonam, Thanjavur District - 612 001",
        lat: 10.973403,
        lng: 79.3960339,
        mapUrl: "https://www.google.com/maps/place/Structora+India+constructions+Pvt+Ltd+-+Kumbakonam/@10.973403,79.3960339,17z/data=!3m1!4b1!4m6!3m5!1s0x3bac99af1190d071:0xdd2d39fc3db73a7b!8m2!3d10.973403!4d79.3960339!16s%2Fg%2F11svvv9xs2"
      },
      {
        name: "Kovilpatti",
        lines: "354 M4D/4, Nalattinputtur, Kovilpatti, Thoothukudi - 628 716",
        lat: 9.1350358,
        lng: 77.8250557,
        mapUrl: "https://www.google.com/maps/place/Structora+India+Constructions+Pvt+Ltd.,+-+Kovilpatti/@9.1350358,77.8250557,17z/data=!3m1!4b1!4m6!3m5!1s0x3b06afc97dfb28cf:0x8b42cadb2511a84f!8m2!3d9.1350358!4d77.8250557!16s%2Fg%2F11zfg_plcx"
      }
    ]
  },
  services: [
    { slug: "residential", num: "01", name: "Residential", desc: "Independent houses and villas, designed around how a family actually lives.", image: "/projects/zaheer_execution.jpeg" },
    { slug: "commercial", num: "02", name: "Commercial", desc: "Retail, office and mixed-use buildings, delivered to plan and on schedule.", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80" },
    { slug: "renovation", num: "03", name: "Renovation", desc: "Considered restoration and reworking of existing structures.", image: "/projects/priyanka_thumbnail2.png" },
    { slug: "multi-floor", num: "04", name: "Multi-storey Building", desc: "Vertical builds engineered for strength and future growth.", image: "/projects/2_balaji_residence_completed_cover.webp" }
  ],
  materials: ["JSW Steel", "TATA Steel", "UltraTech 53", "Dalmia Cement", "Kajaria Tiles", "Finolex", "First-class teak"]
};
