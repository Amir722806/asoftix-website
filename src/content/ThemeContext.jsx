import { createContext, useContext, useEffect, useState } from 'react';
import { useContent } from './ContentContext';

const Ctx = createContext(null);
const KEY = 'asoftix-theme';

function readSaved() {
  try { return localStorage.getItem(KEY); } catch { return null; }
}
const systemMode = () => (window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark');

// Light / dark mode (remembered per visitor) + brand colours from the admin settings.
export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => readSaved() || systemMode());
  const { theme } = useContent();

  useEffect(() => {
    document.documentElement.dataset.theme = mode;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', mode === 'light' ? '#f6f8fc' : '#101827');
  }, [mode]);

  useEffect(() => {
    const root = document.documentElement.style;
    if (theme?.primary) root.setProperty('--blue', theme.primary);
    if (theme?.secondary) root.setProperty('--cyan', theme.secondary);
  }, [theme?.primary, theme?.secondary]);

  // Remember the choice only when the visitor actually toggles; otherwise follow the system setting.
  const toggle = () => setMode((m) => {
    const next = m === 'light' ? 'dark' : 'light';
    try { localStorage.setItem(KEY, next); } catch { /* private mode */ }
    return next;
  });
  return <Ctx.Provider value={{ mode, toggle }}>{children}</Ctx.Provider>;
}

export const useTheme = () => useContext(Ctx);
