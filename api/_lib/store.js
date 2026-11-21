// Tiny JSON key/value store used by the API.
// - Production (Vercel): Upstash Redis / Vercel KV over REST. Set KV_REST_API_URL + KV_REST_API_TOKEN
//   (or UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN).
// - Local development: JSON files in ./.data (Vercel's filesystem is read-only, so this is dev only).
import fs from 'node:fs/promises';
import path from 'node:path';

const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const DIR = path.join(process.cwd(), '.data');
const PREFIX = 'asoftix:';

async function redis(cmd) {
  const r = await fetch(URL_, {
    method: 'POST',
    headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(cmd),
  });
  if (!r.ok) throw new Error(`Storage error ${r.status}`);
  return (await r.json()).result;
}

export function storageReady() {
  return Boolean(URL_ && TOKEN) || !process.env.VERCEL;
}

export async function getJSON(key, fallback = null) {
  if (URL_ && TOKEN) {
    const v = await redis(['GET', PREFIX + key]);
    return v ? JSON.parse(v) : fallback;
  }
  if (process.env.VERCEL) throw new Error('Storage is not configured');
  try {
    return JSON.parse(await fs.readFile(path.join(DIR, `${key}.json`), 'utf8'));
  } catch {
    return fallback;
  }
}

export async function setJSON(key, value) {
  if (URL_ && TOKEN) return redis(['SET', PREFIX + key, JSON.stringify(value)]);
  if (process.env.VERCEL) throw new Error('Storage is not configured');
  await fs.mkdir(DIR, { recursive: true });
  await fs.writeFile(path.join(DIR, `${key}.json`), JSON.stringify(value, null, 2));
}

export async function delKey(key) {
  if (URL_ && TOKEN) return redis(['DEL', PREFIX + key]);
  await fs.rm(path.join(DIR, `${key}.json`), { force: true });
}
