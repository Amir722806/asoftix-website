// GET  /api/content  -> saved website content (or {} when nothing is saved yet)
// PUT  /api/content  -> save content (admin only)
// DELETE /api/content -> reset to the defaults bundled in the code (admin only)
import { delKey, getJSON, setJSON } from './_lib/store.js';
import { isAdmin, readBody } from './_lib/auth.js';

const KEYS = ['site', 'services', 'projects', 'team', 'whyUs', 'process', 'faqs', 'techStack', 'theme'];
const MAX_BYTES = 4 * 1024 * 1024;

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      res.setHeader('Cache-Control', 'no-store');
      return res.status(200).json((await getJSON('content', {})) || {});
    }
    if (!isAdmin(req)) return res.status(401).json({ error: 'Please log in again.' });

    if (req.method === 'PUT') {
      const body = readBody(req);
      const clean = {};
      for (const k of KEYS) if (body[k] !== undefined) clean[k] = body[k];
      const size = Buffer.byteLength(JSON.stringify(clean));
      if (size > MAX_BYTES) return res.status(413).json({ error: 'Content is too large. Use smaller images.' });
      await setJSON('content', { ...clean, updatedAt: new Date().toISOString() });
      return res.status(200).json({ ok: true });
    }
    if (req.method === 'DELETE') {
      await delKey('content');
      return res.status(200).json({ ok: true });
    }
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e.message });
  }
}
