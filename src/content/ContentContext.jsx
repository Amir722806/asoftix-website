import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { defaults, CONTENT_KEYS } from './defaults';

const Ctx = createContext(null);

function merge(saved) {
  const out = { ...defaults };
  if (saved && typeof saved === 'object') {
    for (const k of CONTENT_KEYS) if (saved[k] !== undefined) out[k] = saved[k];
    // Keep new default fields in "site"/"theme" when old saved content lacks them.
    out.site = { ...defaults.site, ...(saved.site || {}) };
    out.theme = { ...defaults.theme, ...(saved.theme || {}) };
  }
  return out;
}

export function ContentProvider({ children }) {
  const [content, setContent] = useState(defaults);
  const [meta, setMeta] = useState({ loaded: false, updatedAt: null, remote: false });

  const reload = useCallback(async () => {
    try {
      const r = await fetch('/api/content', { cache: 'no-store' });
      if (!r.ok) throw new Error();
      const saved = await r.json();
      setContent(merge(saved));
      setMeta({ loaded: true, updatedAt: saved.updatedAt || null, remote: true });
    } catch {
      // No API (static hosting): keep the bundled content.
      setMeta({ loaded: true, updatedAt: null, remote: false });
    }
  }, []);

  useEffect(() => { reload(); }, [reload]);

  const value = useMemo(() => {
    const { services, projects } = content;
    return {
      ...content,
      meta,
      reload,
      setContent,
      liveServices: services.filter((s) => s.status === 'live'),
      plannedServices: services.filter((s) => s.status === 'planned'),
      featuredProjects: projects.filter((p) => p.featured),
      projectCategories: ['All', ...new Set(projects.map((p) => p.category).filter(Boolean))],
      getProject: (slug) => projects.find((p) => p.slug === slug),
    };
  }, [content, meta, reload]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useContent = () => useContext(Ctx);
