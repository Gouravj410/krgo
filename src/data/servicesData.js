export const services = [
  {
    slug: "website-development",
    title: "Website Development",
    shortDescription:
      "Fast, mobile-friendly, conversion-focused business websites.",
    details:
      "We build modern websites tailored to your brand, goals, and customers. Every site is responsive, SEO-ready, and designed to generate real inquiries.",
    deliverables: [
      "Custom design based on your business",
      "Mobile + desktop optimization",
      "Lead form and WhatsApp integration",
      "Basic SEO setup and speed optimization",
    ],
  },
  {
    slug: "website-maintenance",
    title: "Website Maintenance",
    shortDescription:
      "Regular updates, bug fixes, backups, and uptime monitoring.",
    details:
      "Keep your website secure, fresh, and reliable. We handle content updates, plugin/version maintenance, and performance checks so you can focus on business.",
    deliverables: [
      "Monthly updates and fixes",
      "Security checks and backups",
      "Image/content updates on request",
      "Performance and availability monitoring",
    ],
  },
  {
    slug: "seo-and-google-visibility",
    title: "SEO & Google Visibility",
    shortDescription:
      "Improve ranking and local discoverability for your business.",
    details:
      "We improve your online discoverability through on-page SEO, local listing optimization, and keyword-focused content guidance.",
    deliverables: [
      "Keyword and competitor research",
      "On-page SEO for core pages",
      "Google Business Profile optimization",
      "Search Console and Analytics setup",
    ],
  },
  {
    slug: "portfolio-websites",
    title: "Portfolio Websites",
    shortDescription:
      "Showcase your work with a clean and professional portfolio.",
    details:
      "Best for freelancers, creators, photographers, and agencies. We create portfolio sites that highlight projects, achievements, and contact details effectively.",
    deliverables: [
      "Project gallery and case studies",
      "About, skills, and achievement sections",
      "Contact + social profile integration",
      "Fast-loading visual layout",
    ],
  },
  {
    slug: "college-projects",
    title: "College Projects",
    shortDescription:
      "Academic-ready project websites and full-stack project support.",
    details:
      "We help students build project websites and practical demos with documentation support. Useful for submissions, viva, and portfolio building.",
    deliverables: [
      "Frontend or full-stack project setup",
      "Project report/documentation guidance",
      "Deployment support",
      "Demo-ready interface",
    ],
  },
  {
    slug: "inventory-management-sites",
    title: "Inventory Management Sites",
    shortDescription:
      "Track stock, sales, and purchases with custom dashboards.",
    details:
      "We build inventory systems for shops and small businesses with product tracking, stock alerts, and reporting for better operations.",
    deliverables: [
      "Product and stock management",
      "Sales and purchase tracking",
      "Low-stock alerts",
      "Role-based admin dashboard",
    ],
  },
];

export const servicesBySlug = services.reduce((acc, service) => {
  acc[service.slug] = service;
  return acc;
}, {});
