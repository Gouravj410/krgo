import nodemailer from "nodemailer";

const ADMIN_EMAIL = "gouravjangid410@gmail.com";

const buildTransport = () => {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
};

export const sendLeadEmail = async (lead) => {
  const transporter = buildTransport();
  if (!transporter) {
    console.warn("SMTP not configured. Skipping lead email notification.");
    return;
  }

  const submittedAt = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });

  const text = [
    "New lead received",
    "",
    `Name: ${lead.name}`,
    `Phone: ${lead.phone}`,
    `Business Type: ${lead.businessType || "-"}`,
    `Message: ${lead.message || "-"}`,
    `Submitted At: ${submittedAt}`,
  ].join("\n");

  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: ADMIN_EMAIL,
    subject: "New Website Inquiry Lead",
    text,
  });
};
