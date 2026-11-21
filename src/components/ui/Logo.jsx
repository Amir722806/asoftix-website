import { Link } from 'react-router-dom';

// ASoftix logo (vector version of the official logo in public/brand/asoftix-logo-original.jpg).
// Blue parts are fixed brand blue; the dark parts use currentColor so they turn light in dark mode.
export const LOGO_BLUE = '#1F72D0';

export function LogoMark({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="107 -8 426 426" aria-hidden="true" className="logo-mark">
      <g fill="none" strokeLinecap="butt" strokeLinejoin="miter">
        <path d="M303 30 147 112V268" stroke={LOGO_BLUE} strokeWidth="24" />
        <path d="M308 14 492 112V298L320 396 147 298V290" stroke="currentColor" strokeWidth="24" />
        <path d="M226 158 188 200 226 242" stroke={LOGO_BLUE} strokeWidth="15" />
        <path d="M414 158 452 200 414 242" stroke="currentColor" strokeWidth="15" />
        <path d="M232 292 320 92 408 292" stroke={LOGO_BLUE} strokeWidth="20" />
        <path d="M266 230H374" stroke={LOGO_BLUE} strokeWidth="18" />
      </g>
    </svg>
  );
}

export default function Logo() {
  return (
    <Link to="/" className="logo" aria-label="ASoftix home">
      <LogoMark size={46} />
      <span className="logo-text">ASoftix</span>
    </Link>
  );
}
