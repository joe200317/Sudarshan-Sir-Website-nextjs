import nodemailer from "nodemailer";

function smtpConfigured() {
  return Boolean(
    process.env.SMTP_HOST?.trim() &&
      process.env.SMTP_USER?.trim() &&
      process.env.SMTP_PASS?.trim(),
  );
}

function getTransporter() {
  const host = process.env.SMTP_HOST?.trim();
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  if (!host || !user || !pass) return null;

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

export type RegistrationNotifyPayload = {
  to: string;
  workshopSlug: string;
  programTitle: string;
  name: string;
  phone: string;
  profession: string;
  monthlyIncome: string;
  isSerious: boolean;
  paid?: boolean;
  amount?: number | null;
};

/**
 * Email the workshop owner (notificationEmail for that slug)
 * when someone submits the landing form.
 */
export async function sendRegistrationNotificationEmail(
  opts: RegistrationNotifyPayload,
): Promise<boolean> {
  const to = opts.to.trim().toLowerCase();
  if (!to || !to.includes("@")) {
    console.warn("[email] invalid notification address, skip");
    return false;
  }

  if (!smtpConfigured()) {
    console.warn(
      "[email] SMTP not configured (set SMTP_HOST, SMTP_USER, SMTP_PASS). Notification skipped for",
      to,
    );
    return false;
  }

  const transporter = getTransporter();
  if (!transporter) return false;

  const from =
    process.env.SMTP_FROM?.trim() ||
    process.env.SMTP_USER?.trim() ||
    "noreply@mindtrainer.local";

  const paymentLine = opts.paid
    ? `<p><strong>Payment:</strong> Paid${opts.amount ? ` · ₹${opts.amount}` : ""}</p>`
    : opts.amount
      ? `<p><strong>Amount:</strong> ₹${opts.amount} (pending)</p>`
      : `<p><strong>Payment:</strong> Not required</p>`;

  const subject = opts.paid
    ? `Payment received · ${opts.programTitle} · ${opts.workshopSlug}`
    : `New registration · ${opts.programTitle} · ${opts.workshopSlug}`;

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.5;color:#111">
      <h2 style="margin:0 0 12px">${opts.paid ? "Payment confirmed" : "New form submission"}</h2>
      <p style="margin:0 0 8px;color:#555">Workshop slug: <code>${opts.workshopSlug}</code></p>
      <p style="margin:0 0 16px"><strong>Program:</strong> ${opts.programTitle}</p>
      <hr style="border:none;border-top:1px solid #eee;margin:16px 0" />
      <p><strong>Name:</strong> ${opts.name}</p>
      <p><strong>Phone:</strong> ${opts.phone}</p>
      <p><strong>Profession:</strong> ${opts.profession}</p>
      <p><strong>Monthly income:</strong> ${opts.monthlyIncome}</p>
      <p><strong>Serious:</strong> ${opts.isSerious ? "Yes" : "No"}</p>
      ${paymentLine}
      <p style="margin-top:20px;font-size:12px;color:#888">
        This email was sent because this address is set as the notification email
        for this workshop landing page.
      </p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from,
      to,
      subject,
      html,
      text:
        `${subject}\n\n` +
        `Slug: ${opts.workshopSlug}\n` +
        `Program: ${opts.programTitle}\n` +
        `Name: ${opts.name}\n` +
        `Phone: ${opts.phone}\n` +
        `Profession: ${opts.profession}\n` +
        `Income: ${opts.monthlyIncome}\n` +
        `Serious: ${opts.isSerious ? "Yes" : "No"}\n`,
    });
    return true;
  } catch (err) {
    console.warn("[email] send failed", err);
    return false;
  }
}

export type HomeLeadNotifyPayload = {
  fullName: string;
  mobile: string;
  city: string;
  describesYou: string;
  availability: string;
  interestedIn708: string;
};

const HOME_LEAD_NOTIFY_EMAILS = [
  "ajaygunde.sgoc@gmail.com",
  "reynachandnani@gmail.com",
];

/**
 * Email the sales team when someone submits the home page lead form.
 */
export async function sendHomeLeadNotificationEmail(
  opts: HomeLeadNotifyPayload,
): Promise<boolean> {
  if (!smtpConfigured()) {
    console.warn(
      "[email] SMTP not configured (set SMTP_HOST, SMTP_USER, SMTP_PASS). Home lead notification skipped.",
    );
    return false;
  }

  const transporter = getTransporter();
  if (!transporter) return false;

  const from =
    process.env.SMTP_FROM?.trim() ||
    process.env.SMTP_USER?.trim() ||
    "noreply@mindtrainer.local";

  const subject = `New Home Page Lead · ${opts.fullName}`;

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.5;color:#111">
      <h2 style="margin:0 0 12px">New lead from home page</h2>
      <hr style="border:none;border-top:1px solid #eee;margin:16px 0" />
      <p><strong>Full Name:</strong> ${opts.fullName}</p>
      <p><strong>Mobile Number:</strong> ${opts.mobile}</p>
      <p><strong>City:</strong> ${opts.city}</p>
      <p><strong>What best describes you:</strong> ${opts.describesYou}</p>
      <p><strong>Available 9 AM – 6 PM for LIVE seminar:</strong> ${opts.availability}</p>
      <p><strong>Interested in FREE Training at 4-Star Hotel (₹708 food charge):</strong> ${opts.interestedIn708}</p>
      <p style="margin-top:20px;font-size:12px;color:#888">
        This email was sent because a visitor submitted the lead form on the home page.
      </p>
    </div>
  `;

  const text =
    `${subject}\n\n` +
    `Full Name: ${opts.fullName}\n` +
    `Mobile: ${opts.mobile}\n` +
    `City: ${opts.city}\n` +
    `Describes you: ${opts.describesYou}\n` +
    `Available 9-6 for LIVE seminar: ${opts.availability}\n` +
    `Interested in 4-Star Hotel + ₹708 food charge: ${opts.interestedIn708}\n`;

  try {
    await transporter.sendMail({
      from,
      to: HOME_LEAD_NOTIFY_EMAILS.join(", "),
      subject,
      html,
      text,
    });
    return true;
  } catch (err) {
    console.warn("[email] home lead send failed", err);
    return false;
  }
}
