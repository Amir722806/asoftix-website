// POST /api/contact
// 1. Validates the inquiry on the server (same rules as the form).
// 2. Saves it to the admin inbox (/admin -> Inquiries).
// 3. Emails it through Resend when RESEND_API_KEY, CONTACT_TO and CONTACT_FROM are set.
// Succeeds when at least one of (2) or (3) worked, so no inquiry is silently lost.
import crypto from 'node:crypto';
import { validateInquiry } from '../src/utils/validate.js';
import { getJSON, setJSON } from './_lib/store.js';
import { readBody } from './_lib/auth.js';

const esc = (s = '') => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const clip = (s, n) => String(s || '').trim().slice(0, n);

// Small in-memory rate limit (per warm instance).
const hits = new Map();
function limited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

async function sendEmail(inq) {
  const { RESEND_API_KEY, CONTACT_TO, CONTACT_FROM } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO || !CONTACT_FROM) return 'skipped';
  const rows = [['Name', inq.name], ['Email', inq.email], ['Company', inq.company], ['Service', inq.service], ['Budget', inq.budget]]
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#667"><b>${k}</b></td><td>${esc(v || '-')}</td></tr>`)
    .join('');
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: CONTACT_FROM,
      to: [CONTACT_TO],
      reply_to: inq.email,
      subject: `New inquiry: ${inq.service} from ${inq.name}`.slice(0, 140),
      html: `<table>${rows}</table><p style="white-space:pre-wrap">${esc(inq.message)}</p>`,
    }),
  });
  if (!r.ok) throw new Error(`Resend ${r.status}: ${await r.text()}`);
  return 'sent';
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let body;
  try {
    body = readBody(req);
  } catch {
    return res.status(400).json({ error: 'Invalid JSON' });
  }

  // Honeypot filled: pretend success so bots learn nothing.
  if (body.website) return res.status(200).json({ ok: true });

  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'local';
  if (limited(ip)) return res.status(429).json({ error: 'Too many requests. Please try again later.' });

  const errors = validateInquiry(body);
  if (Object.keys(errors).length) return res.status(400).json({ error: 'Invalid input', fields: errors });

  const inq = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: 'New',
    name: clip(body.name, 120),
    email: clip(body.email, 200),
    company: clip(body.company, 160),
    service: clip(body.service, 120),
    budget: clip(body.budget, 80),
    message: clip(body.message, 4000),
    page: clip(body.page, 200),
  };

  let saved = false;
  let emailed = 'skipped';
  try {
    const list = (await getJSON('inquiries', [])) || [];
    list.unshift(inq);
    await setJSON('inquiries', list.slice(0, 1000));
    saved = true;
  } catch (e) {
    console.error('Could not save inquiry:', e.message);
  }
  try {
    emailed = await sendEmail(inq);
  } catch (e) {
    console.error('Could not email inquiry:', e.message);
    emailed = 'failed';
  }

  if (!saved && emailed !== 'sent') return res.status(503).json({ error: 'Form temporarily unavailable' });
  return res.status(200).json({ ok: true, saved, emailed });
}
