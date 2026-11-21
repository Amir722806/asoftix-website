// Shared by the contact form and the /api/contact endpoint.
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateInquiry(v) {
  const e = {};
  if (!v.name?.trim() || v.name.trim().length < 2) e.name = 'Please enter your name.';
  if (!EMAIL_RE.test(v.email?.trim() || '')) e.email = 'Please enter a valid email address.';
  if (!v.service) e.service = 'Please choose a service.';
  if (!v.message?.trim() || v.message.trim().length < 20) e.message = 'Please describe your project in at least 20 characters.';
  if (v.message && v.message.length > 4000) e.message = 'Please keep the message under 4000 characters.';
  if (!v.consent) e.consent = 'Please agree so we can reply to your inquiry.';
  return e;
}
