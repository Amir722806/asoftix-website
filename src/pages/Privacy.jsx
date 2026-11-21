import { Link } from 'react-router-dom';
import Container from '../components/layout/Container';
import usePageMeta from '../hooks/usePageMeta';
import { useContent } from '../content/ContentContext';

// TODO: have this reviewed against the privacy rules where ASoftix operates before launch.
export default function Privacy() {
  const { site } = useContent();
  usePageMeta('Privacy notice', 'How ASoftix collects and handles the information you send through this website.');
  return (
    <section className="section">
      <Container narrow className="prose">
        <p className="eyebrow">Legal</p>
        <h1>Privacy notice</h1>
        <p className="muted">Last updated: November 2026</p>

        <h2>Who we are</h2>
        <p>{site.name} is a software studio based in {site.location}. You can contact us about privacy at <a href={`mailto:${site.email}`}>{site.email}</a>.</p>

        <h2>What we collect</h2>
        <p>When you use the <Link to="/contact">inquiry form</Link> we collect your name, email address, and optionally your company name, the service you are interested in, a budget range and the project details you write.</p>
        <p>This website does not use advertising cookies or tracking pixels. If we add analytics later, we will use a privacy-conscious tool and update this notice first.</p>

        <h2>How we use it</h2>
        <ul>
          <li>To reply to your inquiry and discuss your project.</li>
          <li>To prepare a quote or proposal you asked for.</li>
        </ul>
        <p>We do not sell your information or add you to marketing lists.</p>

        <h2>Where it is stored</h2>
        <p>Form submissions are delivered to our business inbox through a transactional email provider. We keep inquiry emails for up to 24 months, unless they become part of an active project.</p>

        <h2>Your choices</h2>
        <p>You can ask us at any time to see, correct or delete the information you sent. Email <a href={`mailto:${site.email}`}>{site.email}</a> and we will respond within 30 days.</p>
      </Container>
    </section>
  );
}
