export const services = [
  {
    slug: "website-development",
    title: "Website Development",
    shortDescription:
      "We create websites that help your business attract customers and get enquiries.",
    details:
      "Get a professional online home for your business. We build fast, easy-to-use websites that make you look great, build trust, and encourage visitors to call or message you immediately.",
    deliverables: [
      "Your business looks professional and trustworthy online",
      "Your customers can easily use your website on their mobile phones",
      "Get instant customer details straight to your WhatsApp",
      "Your website loads quickly so customers don't leave",
    ],
  },
  {
    slug: "website-maintenance",
    title: "Website Maintenance",
    shortDescription:
      "Keep your website running smoothly while you focus on your business.",
    details:
      "Never worry about your website breaking or getting hacked. We take care of all the behind-the-scenes work so your website stays safe, fast, and always open for customers.",
    deliverables: [
      "Peace of mind knowing your website is always working",
      "Quick updates anytime you want to change images or text",
      "Your business stays protected from online security threats",
      "Save hours of time and avoid technical headaches",
    ],
  },
  {
    slug: "seo-and-google-visibility",
    title: "SEO & Google Visibility",
    shortDescription:
      "Be the first choice when customers search for your services on Google.",
    details:
      "Stop losing customers to your competitors. We get your business to show up on Google searches and maps so local people can find your shop or salon and contact you directly.",
    deliverables: [
      "Your business appears on Google when people search",
      "More phone calls and foot traffic to your shop or clinic",
      "Outshine your local competitors on Google Maps",
      "Know exactly how many people are looking at your business",
    ],
  },
  {
    slug: "inventory-management-sites",
    title: "Inventory Management Sites",
    shortDescription:
      "Easily track your stock and sales without confusing spreadsheets.",
    details:
      "Run your shop completely stress-free. We give you a simple digital system to see exactly what you have in stock, what you sold today, and what you need to reorder.",
    deliverables: [
      "Know exactly how much stock you have at any time",
      "Never lose a sale because a product went out of stock",
      "Easily see your daily sales and business growth",
      "Access your business details from anywhere on your phone",
    ],
  },
  {
    slug: "portfolio-websites",
    title: "Portfolio Websites",
    heading: "Build a Portfolio That Gets You Clients",
    shortDescription:
      "Show your work professionally and attract more clients with a strong online portfolio.",
    details:
      "We help freelancers and creators get more work by looking professional. Have a stunning digital space that builds your brand and lets clients reach you easily.",
    deliverables: [
      "Showcase your work in a clean and professional way",
      "Make it easy for clients to contact you",
      "Mobile-friendly design for all users",
      "Fast-loading pages so visitors stay longer",
    ],
    ctaText: "Create My Portfolio"
  },
  {
    slug: "college-projects",
    title: "College Projects",
    heading: "Complete Your College Project with Confidence",
    shortDescription:
      "Get ready-to-present project websites with clean design and proper structure for college submissions.",
    details:
      "We help students build proper project websites for seamless academic submissions. Get a structured digital demo that makes your final presentation and viva a breeze.",
    deliverables: [
      "Ready-to-present project website",
      "Clean and understandable structure for viva",
      "Easy deployment and demo setup",
      "Guidance for presentation if needed",
    ],
    ctaText: "Start My Project"
  }
];

export const servicesBySlug = services.reduce((acc, service) => {
  acc[service.slug] = service;
  return acc;
}, {});
