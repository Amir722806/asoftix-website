// Small inline stroke-icon set. Icons inherit currentColor.
const PATHS = {
  layout: (<><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></>),
  code: <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />,
  server: (<><rect x="2" y="3" width="20" height="8" rx="2" /><rect x="2" y="13" width="20" height="8" rx="2" /><path d="M6 7h.01M6 17h.01" /></>),
  box: (<><path d="M21 8 12 3 3 8v8l9 5 9-5V8z" /><path d="m3 8 9 5 9-5M12 13v8" /></>),
  chart: <path d="M3 3v18h18M7 15l4-4 3 3 5-6" />,
  phone: (<><rect x="6" y="2" width="12" height="20" rx="2" /><path d="M11 18h2" /></>),
  spark: <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" />,
  chat: <path d="M21 12a8 8 0 0 1-11.6 7.1L4 21l1.9-5.4A8 8 0 1 1 21 12z" />,
  clipboard: (<><rect x="5" y="4" width="14" height="18" rx="2" /><path d="M9 2h6v4H9zM9 13l2 2 4-4" /></>),
  layers: <path d="m12 2 10 5-10 5L2 7l10-5zM2 12l10 5 10-5M2 17l10 5 10-5" />,
  shield: (<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></>),
  mail: (<><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 6-10 7L2 6" /></>),
  pin: (<><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></>),
  clock: (<><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>),
  check: <path d="M20 6 9 17l-5-5" />,
  arrow: <path d="M5 12h14M13 5l7 7-7 7" />,
  external: <path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />,
  menu: <path d="M3 6h18M3 12h18M3 18h18" />,
  close: <path d="M18 6 6 18M6 6l12 12" />,
  plus: <path d="M12 5v14M5 12h14" />,
  github: <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />,
  whatsapp: <path d="M3 21l1.6-4.6A8.5 8.5 0 1 1 7.7 19.6L3 21zM9 8.5c0 3.5 3 6.5 6.5 6.5l1.2-1.6-2-1-1 .9c-1-.4-2.2-1.6-2.6-2.6l.9-1-1-2-1.5.8" />,
  user: (<><circle cx="12" cy="8" r="4" /><path d="M4 22a8 8 0 0 1 16 0" /></>),
  info: (<><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></>),
};

export default function Icon({ name, size = 20, className = '', title }) {
  return (
    <svg
      className={`icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
    >
      {title && <title>{title}</title>}
      {PATHS[name]}
    </svg>
  );
}
