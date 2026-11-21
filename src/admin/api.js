const KEY = 'asoftix-admin-token';

export const getToken = () => { try { return sessionStorage.getItem(KEY); } catch { return null; } };
export const setToken = (t) => { try { t ? sessionStorage.setItem(KEY, t) : sessionStorage.removeItem(KEY); } catch { /* ignore */ } };

export class AuthError extends Error {}

export async function api(path, { method = 'GET', body } = {}) {
  const res = await fetch(`/api/${path}`, {
    method,
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken() || ''}` },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  let data = null;
  try { data = await res.json(); } catch { /* no body */ }
  if (res.status === 401) { setToken(null); throw new AuthError(data?.error || 'Please log in again.'); }
  if (!res.ok) throw new Error(data?.error || `Request failed (${res.status})`);
  return data;
}

// Resize an uploaded image in the browser and return a JPEG data URL,
// so photos stay small enough to store with the content.
export function imageToDataUrl(file, maxSize = 1000, quality = 0.82) {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) return reject(new Error('Please choose an image file.'));
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
      const c = document.createElement('canvas');
      c.width = Math.round(img.width * scale);
      c.height = Math.round(img.height * scale);
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      resolve(c.toDataURL('image/jpeg', quality));
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Could not read that image.')); };
    img.src = url;
  });
}

export const slugify = (s = '') => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
