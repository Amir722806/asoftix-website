import { useEffect, useState } from 'react';
import { Link, NavLink, Navigate, Outlet, useNavigate } from 'react-router-dom';
import Icon from '../components/ui/Icon';
import { LogoMark } from '../components/ui/Logo';
import ThemeToggle from '../components/ui/ThemeToggle';
import usePageMeta from '../hooks/usePageMeta';
import { useAdmin } from './AdminContext';
import ListEditor from './ListEditor';
import { FieldGrid } from './fields';
import { api, slugify } from './api';

// Keeps a slug in step with the title while it is still the automatic one.
// A slug the admin typed by hand is left alone. Duplicate slugs get a number.
function withAutoSlugs(list, prev) {
  const used = new Set();
  return list.map((item, i) => {
    let slug = item.slug;
    const before = prev[i];
    if (!prev.includes(item)) {
      if (!before) {
        slug = slug || slugify(item.title);
      } else if (item.title !== before.title) {
        // Title changed: follow it only if the slug was automatic and not edited in this change.
        const wasAuto = !before.slug || before.slug === slugify(before.title);
        if (wasAuto && item.slug === before.slug) slug = slugify(item.title);
      }
    }
    if (!slug) return item.slug === '' ? item : { ...item, slug: '' };
    let unique = slug;
    for (let n = 2; used.has(unique); n++) unique = `${slug}-${n}`;
    used.add(unique);
    return unique === item.slug ? item : { ...item, slug: unique };
  });
}

const ICONS = ['layout', 'code', 'server', 'box', 'chart', 'phone', 'spark', 'chat', 'clipboard', 'layers', 'shield'];

/* ------------------------------------------------------------------ Login */
export function AdminLogin() {
  usePageMeta('Admin login');
  const { authed, login } = useAdmin();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  if (authed) return <Navigate to="/admin" replace />;

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const { token } = await api('login', { method: 'POST', body: { password } });
      login(token);
      navigate('/admin');
    } catch (x) {
      setError(x.message === 'Failed to fetch' ? 'Server not reachable.' : x.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="admin-login">
      <form className="card" onSubmit={submit}>
        <LogoMark size={48} />
        <h1 className="h3">ASoftix admin</h1>
        <p className="muted">Log in to update the website.</p>
        <div className="a-field">
          <label htmlFor="pw">Admin password</label>
          <input id="pw" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required autoFocus />
        </div>
        {error && <p className="field-error" role="alert">{error}</p>}
        <button className="btn btn-primary" disabled={busy}>{busy ? 'Checking…' : 'Log in'}</button>
        <Link to="/" className="back-link small">← Back to website</Link>
      </form>
    </div>
  );
}

/* ----------------------------------------------------------------- Layout */
const ADMIN_NAV = [
  ['/admin', 'Overview', 'layout', true],
  ['/admin/team', 'Team', 'user'],
  ['/admin/projects', 'Projects', 'layers'],
  ['/admin/services', 'Services', 'box'],
  ['/admin/homepage', 'Homepage', 'clipboard'],
  ['/admin/settings', 'Settings & colours', 'spark'],
  ['/admin/inquiries', 'Inquiries', 'mail'],
];

export function AdminLayout() {
  const { authed, logout, dirty, saving, save, discard, toast } = useAdmin();
  const [menu, setMenu] = useState(false);
  if (!authed) return <Navigate to="/admin/login" replace />;

  return (
    <div className="admin">
      <aside className={`admin-side ${menu ? 'open' : ''}`}>
        <Link to="/admin" className="logo"><LogoMark size={32} /><span className="logo-text">ASoftix</span></Link>
        <nav aria-label="Admin">
          {ADMIN_NAV.map(([to, label, icon, end]) => (
            <NavLink key={to} to={to} end={end} onClick={() => setMenu(false)}><Icon name={icon} size={18} />{label}</NavLink>
          ))}
        </nav>
        <div className="admin-side-foot">
          <a href="/" target="_blank" rel="noreferrer"><Icon name="external" size={16} /> View website</a>
          <button onClick={logout}><Icon name="arrow" size={16} className="flip" /> Log out</button>
        </div>
      </aside>
      <div className="admin-main">
        <header className="admin-top">
          <button className="menu-toggle admin-menu" onClick={() => setMenu(!menu)} aria-label="Toggle admin menu" aria-expanded={menu}><Icon name="menu" /></button>
          <div className="save-state">
            {dirty ? <span className="dot-warn">Unsaved changes</span> : <span className="dot-ok">All changes saved</span>}
          </div>
          <div className="admin-top-actions">
            {dirty && <button className="btn btn-ghost btn-sm" onClick={discard} disabled={saving}>Discard</button>}
            <button className="btn btn-primary btn-sm" onClick={save} disabled={!dirty || saving}>{saving ? 'Saving…' : 'Save & publish'}</button>
            <ThemeToggle />
          </div>
        </header>
        <div className="admin-content"><Outlet /></div>
      </div>
      {toast && <div className={`toast ${toast.type}`} role="status">{toast.text}</div>}
    </div>
  );
}

function Head({ title, text }) {
  usePageMeta(`Admin: ${title}`);
  return (
    <div className="admin-head">
      <h1>{title}</h1>
      {text && <p className="muted">{text}</p>}
    </div>
  );
}

/* --------------------------------------------------------------- Overview */
export function AdminOverview() {
  const { draft, live, resetAll, handleError, update } = useAdmin();
  const [inq, setInq] = useState(null);

  useEffect(() => {
    api('inquiries').then(setInq).catch((e) => { setInq([]); handleError(e); });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(draft, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `asoftix-content-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };
  const importJson = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const data = JSON.parse(await file.text());
      for (const [k, v] of Object.entries(data)) if (k in draft) update(k, v);
    } catch { handleError(new Error('That file is not a valid content backup.')); }
    e.target.value = '';
  };

  const newCount = inq?.filter((i) => i.status === 'New').length ?? '…';
  const stats = [
    ['Team members', draft.team.length, '/admin/team', 'user'],
    ['Projects', draft.projects.length, '/admin/projects', 'layers'],
    ['Live services', draft.services.filter((s) => s.status === 'live').length, '/admin/services', 'box'],
    ['New inquiries', newCount, '/admin/inquiries', 'mail'],
  ];

  return (
    <>
      <Head title="Overview" text={live.meta.updatedAt ? `Last published ${new Date(live.meta.updatedAt).toLocaleString()}` : 'Showing the original content. Nothing has been edited yet.'} />
      <div className="stat-grid">
        {stats.map(([label, n, to, icon]) => (
          <Link key={label} to={to} className="card stat">
            <span className="icon-tile"><Icon name={icon} /></span>
            <span><small>{label}</small><strong>{n}</strong></span>
          </Link>
        ))}
      </div>

      <div className="grid grid-2" style={{ marginTop: 22 }}>
        <div className="card">
          <h2 className="h3">Latest inquiries</h2>
          {!inq ? <p className="muted">Loading…</p> : inq.length === 0 ? <p className="muted">No inquiries yet. Contact-form submissions appear here.</p> : (
            <ul className="mini-list">
              {inq.slice(0, 5).map((i) => (
                <li key={i.id}><span><strong>{i.name}</strong><small>{i.service} · {new Date(i.createdAt).toLocaleDateString()}</small></span><span className={`pill s-${i.status.toLowerCase()}`}>{i.status}</span></li>
              ))}
            </ul>
          )}
          <Link to="/admin/inquiries" className="link-arrow">Open inbox <Icon name="arrow" size={16} /></Link>
        </div>
        <div className="card">
          <h2 className="h3">Backup & restore</h2>
          <p className="muted">Download all website content as a file, or load a backup. Loading a backup still needs “Save & publish”.</p>
          <div className="btn-row">
            <button className="btn btn-ghost btn-sm" onClick={exportJson}>Download backup</button>
            <label className="btn btn-ghost btn-sm">Load backup<input type="file" accept="application/json" hidden onChange={importJson} /></label>
            <button className="btn btn-ghost btn-sm danger" onClick={() => window.confirm('Reset ALL content to the original version? This cannot be undone.') && resetAll()}>Reset to original</button>
          </div>
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------- Team */
const TEAM_FIELDS = [
  { key: 'photo', label: 'Photo', type: 'image', wide: true },
  { key: 'name', label: 'Full name' },
  { key: 'role', label: 'Role' },
  { key: 'initials', label: 'Initials (shown when there is no photo)' },
  { key: 'location', label: 'Location' },
  { key: 'short', label: 'Short intro (homepage)', type: 'textarea', wide: true },
  { key: 'bio', label: 'Biography', type: 'paragraphs', rows: 7, wide: true, help: 'Leave an empty line between paragraphs.' },
  { key: 'skillGroups', label: 'Skills', type: 'groups', rows: 6, wide: true, help: 'One group per line, e.g. “Development: React, Node.js, PostgreSQL”.' },
  { key: 'timeline', label: 'Experience', type: 'pairs', keys: ['when', 'what'], rows: 5, wide: true, help: 'One per line: “2023 to 2026 | Job title, Company”.' },
  { key: 'education', label: 'Education & certifications', type: 'lines', wide: true, help: 'One per line.' },
  { key: 'links', label: 'Links', type: 'pairs', keys: ['label', 'href'], rows: 3, wide: true, help: 'One per line: “GitHub | https://github.com/…”.' },
];

export function AdminTeam() {
  const { draft, update } = useAdmin();
  return (
    <>
      <Head title="Team" text="Publish team members only with their consent. The first member is shown on the homepage." />
      <ListEditor
        noun="member"
        titleKey="name"
        subtitle={(m) => m.role}
        thumb={(m) => (m.photo ? <img className="le-thumb round" src={m.photo} alt="" /> : <span className="le-thumb round">{m.initials}</span>)}
        items={draft.team}
        onChange={(v) => update('team', v)}
        fields={TEAM_FIELDS}
        newItem={() => ({ name: '', role: '', initials: '', photo: '', location: '', short: '', bio: [], skillGroups: [], timeline: [], education: [], links: [] })}
      />
    </>
  );
}

/* --------------------------------------------------------------- Projects */
export function AdminProjects() {
  const { draft, update } = useAdmin();
  const fields = [
    { key: 'title', label: 'Title', wide: true },
    { key: 'slug', label: 'URL slug', help: 'Used in /portfolio/slug. Lowercase and dashes.' },
    { key: 'type', label: 'Project type', help: 'e.g. Business website' },
    { key: 'category', label: 'Filter category', help: 'e.g. Website, E-commerce, Web app' },
    { key: 'date', label: 'Date' },
    { key: 'featured', label: 'Feature on homepage', type: 'checkbox' },
    { key: 'visual', label: 'Illustration (when no screenshots)', type: 'select', options: [['site', 'Website'], ['shop', 'Shop'], ['dash', 'Dashboard'], ['mobile', 'Mobile']] },
    { key: 'label', label: 'Honest status label', wide: true, help: 'e.g. “Prototype. Backend not connected yet”.' },
    { key: 'screenshots', label: 'Screenshots', type: 'images', wide: true },
    { key: 'summary', label: 'Summary', type: 'textarea', wide: true },
    { key: 'challenge', label: 'Challenge', type: 'textarea', wide: true },
    { key: 'users', label: 'Intended users', type: 'textarea', wide: true },
    { key: 'solution', label: 'Solution', type: 'textarea', rows: 4, wide: true },
    { key: 'contribution', label: 'Our contribution', type: 'textarea', wide: true },
    { key: 'stack', label: 'Technology stack', type: 'lines', wide: true, help: 'One per line.' },
    { key: 'features', label: 'Key features', type: 'lines', rows: 6, wide: true, help: 'One per line.' },
    { key: 'limitations', label: 'Known limitations', type: 'textarea', wide: true },
    { key: 'demo', label: 'Live demo URL', type: 'url' },
    { key: 'repo', label: 'Repository URL', type: 'url' },
  ];
  const onChange = (list) => update('projects', withAutoSlugs(list, draft.projects));
  return (
    <>
      <Head title="Projects" text="Portfolio case studies. Featured projects appear on the homepage." />
      <ListEditor
        noun="project"
        subtitle={(p) => `${p.type || ''}${p.featured ? ' · Featured' : ''}`}
        thumb={(p) => (p.screenshots?.[0] ? <img className="le-thumb" src={p.screenshots[0].src} alt="" /> : <span className="le-thumb"><Icon name="layers" size={16} /></span>)}
        items={draft.projects}
        onChange={onChange}
        fields={fields}
        newItem={() => ({ title: '', slug: '', type: '', category: '', date: String(new Date().getFullYear()), featured: false, visual: 'site', label: '', screenshots: [], summary: '', challenge: '', users: '', solution: '', contribution: '', stack: [], features: [], limitations: '', demo: '', repo: '' })}
      />
    </>
  );
}

/* --------------------------------------------------------------- Services */
export function AdminServices() {
  const { draft, update } = useAdmin();
  const fields = [
    { key: 'title', label: 'Title', wide: true },
    { key: 'status', label: 'Status', type: 'select', options: [['live', 'Live: offered now'], ['planned', 'Planned: coming later']] },
    { key: 'icon', label: 'Icon', type: 'select', options: ICONS },
    { key: 'slug', label: 'Anchor slug' },
    { key: 'proof', label: 'Example project', type: 'select', options: [['', 'None'], ...draft.projects.map((p) => [p.slug, p.title])] },
    { key: 'short', label: 'Short description (cards)', type: 'textarea', wide: true },
    { key: 'scope', label: 'Scope', type: 'textarea', wide: true },
    { key: 'deliverables', label: 'Deliverables', type: 'lines', rows: 6, wide: true, help: 'One per line.' },
    { key: 'ideal', label: 'Ideal for', type: 'textarea', wide: true },
  ];
  const onChange = (list) => update('services', withAutoSlugs(list, draft.services));
  return (
    <>
      <Head title="Services" text="Only mark a service “Live” when you can deliver, test and support it." />
      <ListEditor
        noun="service"
        subtitle={(s) => (s.status === 'live' ? 'Live' : 'Planned')}
        thumb={(s) => <span className="le-thumb"><Icon name={s.icon} size={16} /></span>}
        items={draft.services}
        onChange={onChange}
        fields={fields}
        newItem={() => ({ title: '', slug: '', status: 'planned', icon: 'code', short: '', scope: '', deliverables: [], ideal: '', proof: '' })}
      />
    </>
  );
}

/* --------------------------------------------------------------- Homepage */
export function AdminHomepage() {
  const { draft, update } = useAdmin();
  const [tab, setTab] = useState('why');
  const tabs = {
    why: ['Why ASoftix', <ListEditor key="why" noun="point" items={draft.whyUs} onChange={(v) => update('whyUs', v)}
      fields={[{ key: 'title', label: 'Title', wide: true }, { key: 'icon', label: 'Icon', type: 'select', options: ICONS }, { key: 'text', label: 'Text', type: 'textarea', wide: true }]}
      newItem={() => ({ title: '', icon: 'shield', text: '' })} />],
    process: ['Process steps', <ListEditor key="process" noun="step" titleKey="step" items={draft.process} onChange={(v) => update('process', v)}
      fields={[{ key: 'step', label: 'Step name', wide: true }, { key: 'text', label: 'Description', type: 'textarea', wide: true }]}
      newItem={() => ({ step: '', text: '' })} />],
    faq: ['FAQ', <ListEditor key="faq" noun="question" titleKey="q" items={draft.faqs} onChange={(v) => update('faqs', v)}
      fields={[{ key: 'q', label: 'Question', wide: true }, { key: 'a', label: 'Answer', type: 'textarea', rows: 4, wide: true }]}
      newItem={() => ({ q: '', a: '' })} />],
    tech: ['Technologies strip', (
      <div key="tech" className="card">
        <FieldGrid fields={[{ key: 'techStack', label: 'Technologies the team actually uses', type: 'lines', rows: 12, wide: true, help: 'One per line. Shown under the homepage hero.' }]}
          value={{ techStack: draft.techStack }} onChange={(v) => update('techStack', v.techStack)} />
      </div>
    )],
  };
  return (
    <>
      <Head title="Homepage" text="Sections shown on the homepage and the services page." />
      <div className="filters admin-tabs" role="tablist">
        {Object.entries(tabs).map(([k, [label]]) => (
          <button key={k} role="tab" aria-selected={tab === k} className={`filter ${tab === k ? 'active' : ''}`} onClick={() => setTab(k)}>{label}</button>
        ))}
      </div>
      {tabs[tab][1]}
    </>
  );
}

/* --------------------------------------------------------------- Settings */
const PRESETS = [
  ['Blueprint blue', '#246BCE', '#27A8C7'],
  ['Indigo', '#4f46e5', '#06b6d4'],
  ['Emerald', '#0f766e', '#22c55e'],
  ['Violet', '#7c3aed', '#ec4899'],
  ['Amber', '#d97706', '#f59e0b'],
];

export function AdminSettings() {
  const { draft, update } = useAdmin();
  const siteFields = [
    { key: 'name', label: 'Company name' },
    { key: 'tagline', label: 'Tagline' },
    { key: 'email', label: 'Business email', type: 'email' },
    { key: 'whatsapp', label: 'WhatsApp number (digits only, with country code)', help: 'e.g. 923001234567' },
    { key: 'whatsappDisplay', label: 'WhatsApp number as shown', help: 'e.g. +92 300 1234567' },
    { key: 'location', label: 'Location' },
    { key: 'hours', label: 'Working hours' },
    { key: 'responseTime', label: 'Response time', help: 'Completes “We reply …”' },
    { key: 'url', label: 'Website domain', type: 'url' },
    { key: 'social', label: 'Social links', type: 'pairs', keys: ['label', 'href'], rows: 3, wide: true, help: 'One per line: “GitHub | https://…”. Supported icons: GitHub; others show a link icon.' },
  ];
  const setSite = (v) => update('site', { ...v, social: (v.social || []).map((s) => ({ ...s, icon: s.label?.toLowerCase() === 'github' ? 'github' : 'external' })) });

  return (
    <>
      <Head title="Settings & colours" text="Company details are used in the header, footer, contact page and privacy notice." />
      <section className="card">
        <h2 className="h3">Brand colours</h2>
        <p className="muted">Applied to buttons, links, gradients and the logo across the site, in both light and dark mode.</p>
        <div className="presets">
          {PRESETS.map(([name, a, b]) => (
            <button key={name} className="preset" onClick={() => update('theme', { primary: a, secondary: b })}
              aria-pressed={draft.theme.primary.toLowerCase() === a.toLowerCase() && draft.theme.secondary.toLowerCase() === b.toLowerCase()}>
              <span style={{ background: `linear-gradient(120deg, ${a}, ${b})` }} />{name}
            </button>
          ))}
        </div>
        <FieldGrid
          fields={[{ key: 'primary', label: 'Primary colour', type: 'color' }, { key: 'secondary', label: 'Secondary colour', type: 'color' }]}
          value={draft.theme}
          onChange={(v) => update('theme', v)}
        />
        <div className="color-preview" style={{ '--blue': draft.theme.primary, '--cyan': draft.theme.secondary }}>
          <span className="btn btn-primary btn-sm">Primary button</span>
          <span className="link-arrow">Link colour <Icon name="arrow" size={16} /></span>
          <ul className="tags"><li>Tag</li></ul>
          <LogoMark size={36} />
        </div>
      </section>
      <section className="card" style={{ marginTop: 22 }}>
        <h2 className="h3">Company details</h2>
        <FieldGrid fields={siteFields} value={draft.site} onChange={setSite} />
      </section>
    </>
  );
}

/* -------------------------------------------------------------- Inquiries */
const STATUSES = ['New', 'Contacted', 'Quoted', 'Won', 'Closed'];

export function AdminInquiries() {
  const { handleError, setToast } = useAdmin();
  const [list, setList] = useState(null);
  const [filter, setFilter] = useState('All');
  const [open, setOpen] = useState(null);

  const load = () => api('inquiries').then(setList).catch((e) => { setList([]); handleError(e); });
  useEffect(() => { load(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const setStatus = async (id, status) => {
    try {
      await api('inquiries', { method: 'PATCH', body: { id, status } });
      setList((l) => l.map((i) => (i.id === id ? { ...i, status } : i)));
    } catch (e) { handleError(e); }
  };
  const remove = async (id) => {
    if (!window.confirm('Delete this inquiry permanently?')) return;
    try {
      await api(`inquiries?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
      setList((l) => l.filter((i) => i.id !== id));
      setToast({ type: 'ok', text: 'Inquiry deleted.' });
    } catch (e) { handleError(e); }
  };

  const shown = (list || []).filter((i) => filter === 'All' || i.status === filter);
  return (
    <>
      <Head title="Inquiries" text="Every contact-form submission is saved here, even when email delivery is not set up." />
      <div className="filters admin-tabs">
        {['All', ...STATUSES].map((s) => (
          <button key={s} className={`filter ${filter === s ? 'active' : ''}`} aria-pressed={filter === s} onClick={() => setFilter(s)}>
            {s} {list && <small>({s === 'All' ? list.length : list.filter((i) => i.status === s).length})</small>}
          </button>
        ))}
        <button className="filter" onClick={load}>↻ Refresh</button>
      </div>
      {!list ? <p className="muted">Loading…</p> : shown.length === 0 ? <div className="card"><p className="muted">No inquiries here.</p></div> : (
        <div className="inq-list">
          {shown.map((i) => (
            <article key={i.id} className="card inq">
              <div className="inq-head">
                <button className="inq-title" onClick={() => setOpen(open === i.id ? null : i.id)} aria-expanded={open === i.id}>
                  <strong>{i.name}</strong>
                  <small>{i.service}{i.company ? ` · ${i.company}` : ''} · {new Date(i.createdAt).toLocaleString()}</small>
                </button>
                <select value={i.status} onChange={(e) => setStatus(i.id, e.target.value)} aria-label={`Status for ${i.name}`} className={`pill s-${i.status.toLowerCase()}`}>
                  {STATUSES.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
              {open === i.id && (
                <div className="inq-body">
                  <p className="inq-msg">{i.message}</p>
                  <dl>
                    <div><dt>Email</dt><dd><a href={`mailto:${i.email}`}>{i.email}</a></dd></div>
                    {i.budget && <div><dt>Budget</dt><dd>{i.budget}</dd></div>}
                    {i.page && <div><dt>Sent from</dt><dd>{i.page}</dd></div>}
                  </dl>
                  <div className="btn-row">
                    <a className="btn btn-primary btn-sm" href={`mailto:${i.email}?subject=${encodeURIComponent(`Re: your ${i.service} inquiry`)}`}>Reply by email</a>
                    <button className="btn btn-ghost btn-sm danger" onClick={() => remove(i.id)}>Delete</button>
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </>
  );
}
