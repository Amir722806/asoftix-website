// Admin-only inquiry inbox.
// GET    /api/inquiries            -> list (newest first)
// PATCH  /api/inquiries {id,status}-> update status
// DELETE /api/inquiries?id=...     -> remove
import { getJSON, setJSON } from './_lib/store.js';
import { isAdmin, readBody } from './_lib/auth.js';

export const STATUSES = ['New', 'Contacted', 'Quoted', 'Won', 'Closed'];

export default async function handler(req, res) {
  if (!isAdmin(req)) return res.status(401).json({ error: 'Please log in again.' });
  try {
    const list = (await getJSON('inquiries', [])) || [];
    if (req.method === 'GET') return res.status(200).json(list);
    if (req.method === 'PATCH') {
      const { id, status } = readBody(req);
      if (!STATUSES.includes(status)) return res.status(400).json({ error: 'Invalid status' });
      const item = list.find((i) => i.id === id);
      if (!item) return res.status(404).json({ error: 'Not found' });
      item.status = status;
      await setJSON('inquiries', list);
      return res.status(200).json(item);
    }
    if (req.method === 'DELETE') {
      const id = req.query?.id || new URL(req.url, 'http://x').searchParams.get('id');
      await setJSON('inquiries', list.filter((i) => i.id !== id));
      return res.status(200).json({ ok: true });
    }
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e.message });
  }
}
