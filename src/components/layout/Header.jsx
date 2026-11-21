import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from '../ui/Logo';
import Button from '../ui/Button';
import Icon from '../ui/Icon';
import Container from './Container';
import ThemeToggle from '../ui/ThemeToggle';
import { nav } from '../../data/site';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const toggleRef = useRef(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    document.body.classList.add('no-scroll');
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.classList.remove('no-scroll');
    };
  }, [open]);

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <Container className="header-inner">
        <Logo />
        <nav aria-label="Main" className={`main-nav ${open ? 'open' : ''}`} id="main-nav">
          <ul>
            {nav.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.to === '/'}>{item.label}</NavLink>
              </li>
            ))}
          </ul>
          <Button to="/contact" className="nav-cta-mobile">Get a Quote</Button>
        </nav>
        <div className="header-actions">
          <ThemeToggle />
          <Button to="/contact" size="sm" className="nav-cta">Get a Quote</Button>
          <button
            ref={toggleRef}
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="main-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name={open ? 'close' : 'menu'} size={24} />
          </button>
        </div>
      </Container>
    </header>
  );
}
