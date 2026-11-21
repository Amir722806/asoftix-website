import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useContent } from '../content/ContentContext';
import { CONTENT_KEYS } from '../content/defaults';
import { api, AuthError, getToken, setToken } from './api';

const Ctx = createContext(null);
const pick = (c) => Object.fromEntries(CONTENT_KEYS.map((k) => [k, c[k]]));

export function AdminProvider({ children }) {
  const content = useContent();
  const [authed, setAuthed] = useState(Boolean(getToken()));
  const [draft, setDraft] = useState(() => pick(content));
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  // Load fresh content when it arrives from the server (unless the admin is mid-edit).
  useEffect(() => { if (!dirty) setDraft(pick(content)); }, [content]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(t);
  }, [toast]);

  const update = useCallback((key, value) => {
    setDraft((d) => ({ ...d, [key]: typeof value === 'function' ? value(d[key]) : value }));
    setDirty(true);
  }, []);

  const handleError = (e) => {
    if (e instanceof AuthError) setAuthed(false);
    setToast({ type: 'error', text: e.message });
  };

  const save = async () => {
    setSaving(true);
    try {
      await api('content', { method: 'PUT', body: draft });
      setDirty(false);
      await content.reload();
      setToast({ type: 'ok', text: 'Saved. The website is updated.' });
    } catch (e) {
      handleError(e);
    } finally {
      setSaving(false);
    }
  };

  const discard = () => { setDraft(pick(content)); setDirty(false); };

  const resetAll = async () => {
    try {
      await api('content', { method: 'DELETE' });
      setDirty(false);
      await content.reload();
      setToast({ type: 'ok', text: 'All content reset to the original version.' });
    } catch (e) { handleError(e); }
  };

  const login = (token) => { setToken(token); setAuthed(true); };
  const logout = () => { setToken(null); setAuthed(false); };

  return (
    <Ctx.Provider value={{ authed, login, logout, draft, update, dirty, saving, save, discard, resetAll, toast, setToast, handleError, live: content }}>
      {children}
    </Ctx.Provider>
  );
}

export const useAdmin = () => useContext(Ctx);
