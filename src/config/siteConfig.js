export const CONTACT_PHONE = "9325791196";
export const CONTACT_PHONE_DISPLAY = "+91 93257 91196";
export const CONTACT_EMAIL = "gouravjangid410@gmail.com";
export const CALL_URL = `tel:+91${CONTACT_PHONE}`;

export const WHATSAPP_NUMBER = `91${CONTACT_PHONE}`;
export const WHATSAPP_TEXT =
  "Hi, I want to get a website for my business.";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_TEXT
)}`;

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
export const LEADS_API_PATH = "/api/leads";
