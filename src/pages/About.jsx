import Container from '../components/layout/Container';
import SectionTitle from '../components/ui/SectionTitle';
import Icon from '../components/ui/Icon';
import CtaBand from '../components/ui/CtaBand';
import usePageMeta from '../hooks/usePageMeta';
import { useContent } from '../content/ContentContext';

const principles = [
  { title: 'Honest by default', text: 'No fake statistics, invented clients or services we cannot deliver. Every project is labelled with its real status.' },
  { title: 'Scope before code', text: 'We agree in writing what will be built, what will not, and how we will know it is done.' },
  { title: 'Built to be used', text: 'Software is only useful if staff can use it on a busy day, so we design for real workflows, phones included.' },
  { title: 'Leave it maintainable', text: 'Clean structure, content in data files, and a handover guide so your site is not locked to us.' },
];

export default function About() {
  const { site } = useContent();
  usePageMeta('About', 'ASoftix is a Lahore-based software studio combining operations experience with modern web development.');
  return (
    <>
      <section className="page-hero">
        <Container>
          <SectionTitle as="h1" eyebrow="About ASoftix" title="Turning ideas into digital solutions" intro="ASoftix is a software and digital-solutions studio in Lahore, building modern websites and practical software for businesses." />
        </Container>
      </section>

      <section className="section section-tight">
        <Container>
          <div className="about-grid">
            <div>
              <h2>Our story</h2>
              <p>
                ASoftix started from a simple observation made over six years on warehouse floors and in back offices:
                most small businesses run on spreadsheets, paper registers and software that does not quite fit how they work.
                Stock goes missing between two files, invoices get paid twice, and reports take a day to build by hand.
              </p>
              <p>
                Our founder spent those years fixing exactly these problems with Excel and Google Sheets systems, before
                building proper web applications for them. ASoftix brings both sides together: modern web development, and a
                practical understanding of inventory, purchasing, ledgers and reporting.
              </p>
              <p>
                Today we focus on what we can deliver well: business websites, React applications and full-stack web systems
                for startups, small and medium businesses, and international clients.
              </p>
            </div>
            <div className="mv">
              <div className="card mv-card">
                <span className="icon-tile"><Icon name="spark" size={22} /></span>
                <h3>Mission</h3>
                <p>Give growing businesses software that fits how they actually work: clear, reliable and affordable.</p>
              </div>
              <div className="card mv-card">
                <span className="icon-tile"><Icon name="layers" size={22} /></span>
                <h3>Vision</h3>
                <p>To be the studio small businesses in Pakistan and abroad trust to move from spreadsheets to systems.</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section section-alt">
        <Container>
          <SectionTitle eyebrow="Principles" title="How we work" align="center" />
          <div className="grid grid-4">
            {principles.map((p, i) => (
              <div className="why-item" key={p.title}>
                <span className="process-num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="grid grid-3 info-tiles">
            <div className="card info-tile"><Icon name="pin" /><div><h3>Location</h3><p>{site.location}. We work remotely with clients anywhere.</p></div></div>
            <div className="card info-tile"><Icon name="mail" /><div><h3>Email</h3><p><a href={`mailto:${site.email}`}>{site.email}</a></p></div></div>
            <div className="card info-tile"><Icon name="clock" /><div><h3>Hours</h3><p>{site.hours}</p></div></div>
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
