// Admin authentication: one admin password (ADMIN_PASSWORD env var) exchanged for a signed,
// expiring token. The token is an HMAC so the server needs no session storage.
import crypto from 'node:crypto';

const TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

function secret() {
  const s = process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD;
  if (!s) throw new Error('ADMIN_PASSWORD is not set');
  return s;
}
const b64 = (s) => Buffer.from(s).toString('base64url');
const sign = (data) => crypto.createHmac('sha256', secret()).update(data).digest('base64url');

function safeEqual(a, b) {
  const x = Buffer.from(String(a));
  const y = Buffer.from(String(b));
  return x.length === y.length && crypto.timingSafeEqual(x, y);
}

export function checkPassword(password) {
  const expected = process.env.ADMIN_PASSWORD;
  return Boolean(expected) && safeEqual(password || '', expected);
}

export function issueToken() {
  const payload = b64(JSON.stringify({ role: 'admin', exp: Date.now() + TTL_MS }));
  return `${payload}.${sign(payload)}`;
}

export function isAdmin(req) {
  try {
    const token = (req.headers.authorization || '').replace(/^Bearer /, '');
    const [payload, sig] = token.split('.');
    if (!payload || !sig || !safeEqual(sig, sign(payload))) return false;
    const { exp } = JSON.parse(Buffer.from(payload, 'base64url').toString());
    return exp > Date.now();
  } catch {
    return false;
  }
}

export function readBody(req) {
  if (!req.body) return {};
  return typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body;
}
