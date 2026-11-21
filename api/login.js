// POST /api/login  { password } -> { token }
import { checkPassword, issueToken, readBody } from './_lib/auth.js';

const attempts = new Map();

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!process.env.ADMIN_PASSWORD) return res.status(503).json({ error: 'Admin is not configured (ADMIN_PASSWORD missing).' });

  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'local';
  const now = Date.now();
  const recent = (attempts.get(ip) || []).filter((t) => now - t < 15 * 60 * 1000);
  if (recent.length >= 8) return res.status(429).json({ error: 'Too many attempts. Try again in 15 minutes.' });

  const { password } = readBody(req);
  if (!checkPassword(password)) {
    recent.push(now);
    attempts.set(ip, recent);
    await new Promise((r) => setTimeout(r, 400));
    return res.status(401).json({ error: 'Wrong password.' });
  }
  attempts.delete(ip);
  return res.status(200).json({ token: issueToken() });
}
