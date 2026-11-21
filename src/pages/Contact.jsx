import Container from '../components/layout/Container';
import SectionTitle from '../components/ui/SectionTitle';
import Icon from '../components/ui/Icon';
import ContactForm from '../components/ContactForm';
import usePageMeta from '../hooks/usePageMeta';
import { useContent } from '../content/ContentContext';

export default function Contact() {
  const { site } = useContent();
  usePageMeta('Contact', 'Request a quote or book an introductory call with ASoftix.');
  return (
    <>
      <section className="page-hero">
        <Container>
          <SectionTitle as="h1" eyebrow="Contact" title="Let's talk about your project" intro={`Share a few details and we will reply ${site.responseTime} with questions, next steps and an honest estimate.`} />
        </Container>
      </section>
      <section className="section section-tight">
        <Container>
          <div className="contact-grid">
            <div className="card form-card">
              <h2 className="h3">Project inquiry</h2>
              <ContactForm />
            </div>
            <aside className="contact-side">
              <a className="card info-tile link-tile" href={`mailto:${site.email}`}>
                <Icon name="mail" />
                <div><h3>Email</h3><p>{site.email}</p></div>
              </a>
              <a className="card info-tile link-tile" href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer">
                <Icon name="whatsapp" />
                <div><h3>WhatsApp</h3><p>{site.whatsappDisplay}</p></div>
              </a>
              <div className="card info-tile">
                <Icon name="clock" />
                <div><h3>Response time</h3><p>We reply {site.responseTime}. {site.hours}.</p></div>
              </div>
              <div className="card info-tile">
                <Icon name="pin" />
                <div><h3>Location</h3><p>{site.location}. Remote projects welcome worldwide.</p></div>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
