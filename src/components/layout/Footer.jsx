import { Link } from 'react-router-dom';
import Logo from '../ui/Logo';
import Icon from '../ui/Icon';
import Container from './Container';
import { useContent } from '../../content/ContentContext';
import { nav } from '../../data/site';

export default function Footer() {
  const { site, liveServices } = useContent();
  return (
    <footer className="site-footer">
      <Container>
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo />
            <p>{site.tagline} A Lahore-based studio building websites, web apps and business systems.</p>
            <ul className="social">
              {site.social.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                    <Icon name={s.icon} size={20} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="footer-h">Company</h2>
            <ul>{nav.map((n) => <li key={n.to}><Link to={n.to}>{n.label}</Link></li>)}</ul>
          </div>
          <div>
            <h2 className="footer-h">Services</h2>
            <ul>{liveServices.map((s) => <li key={s.slug}><Link to={`/services#${s.slug}`}>{s.title}</Link></li>)}</ul>
          </div>
          <div>
            <h2 className="footer-h">Contact</h2>
            <ul className="footer-contact">
              <li><Icon name="mail" size={16} /><a href={`mailto:${site.email}`}>{site.email}</a></li>
              <li><Icon name="whatsapp" size={16} /><a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer">{site.whatsappDisplay}</a></li>
              <li><Icon name="pin" size={16} /><span>{site.location}</span></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <Link to="/privacy">Privacy notice</Link>
        </div>
      </Container>
    </footer>
  );
}
