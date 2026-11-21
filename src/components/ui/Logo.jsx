import { Link } from 'react-router-dom';

// ASoftix mark: a hexagon (stable, engineered) holding an "A" drawn as a code caret,
// with a cursor dot for the crossbar. Colours follow the brand settings in the admin.
export function LogoMark({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" className="logo-mark">
      <defs>
        <linearGradient id="asx-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: 'var(--blue)' }} />
          <stop offset="1" style={{ stopColor: 'var(--cyan)' }} />
        </linearGradient>
      </defs>
      <path d="M24 2.5 42.6 13.25V34.75L24 45.5 5.4 34.75V13.25Z" fill="url(#asx-g)" stroke="url(#asx-g)" strokeWidth="3" strokeLinejoin="round" />
      <path d="M15 34.5 24 14 33 34.5" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="24" cy="28.5" r="2.8" fill="#c4f1fb" />
    </svg>
  );
}

export default function Logo() {
  return (
    <Link to="/" className="logo" aria-label="ASoftix home">
      <LogoMark />
      <span className="logo-text">A<span>Softix</span></span>
    </Link>
  );
}
