import { Link } from 'react-router-dom';
import Container from '../components/layout/Container';
import SectionTitle from '../components/ui/SectionTitle';
import Icon from '../components/ui/Icon';
import Button from '../components/ui/Button';
import CtaBand from '../components/ui/CtaBand';
import Accordion from '../components/ui/Accordion';
import usePageMeta from '../hooks/usePageMeta';
import { useContent } from '../content/ContentContext';

export default function Services() {
  const { liveServices, plannedServices, getProject, faqs } = useContent();
  usePageMeta('Services', 'Web design, React development, full-stack web applications, inventory systems and reporting dashboards from ASoftix.');
  return (
    <>
      <section className="page-hero">
        <Container>
          <SectionTitle as="h1" eyebrow="Services" title="What we can build for you" intro="We only list services we can deliver and support today. Each one comes with a written scope, clear deliverables and a real project behind it." />
          <nav aria-label="Services on this page" className="pill-nav">
            {liveServices.map((s) => <a key={s.slug} href={`#${s.slug}`}>{s.title}</a>)}
          </nav>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="service-list">
            {liveServices.map((s, i) => {
              const proof = s.proof && getProject(s.proof);
              return (
                <article id={s.slug} key={s.slug} className="service-detail card">
                  <div className="sd-head">
                    <span className="icon-tile"><Icon name={s.icon} size={24} /></span>
                    <div>
                      <p className="eyebrow">0{i + 1}</p>
                      <h2>{s.title}</h2>
                    </div>
                  </div>
                  <div className="sd-body">
                    <div>
                      <h3>Scope</h3>
                      <p>{s.scope}</p>
                      <h3>Ideal for</h3>
                      <p>{s.ideal}</p>
                      {proof && (
                        <p className="sd-proof">
                          <Icon name="check" size={16} /> See it in practice: <Link to={`/portfolio/${proof.slug}`}>{proof.title}</Link>
                        </p>
                      )}
                    </div>
                    <div>
                      <h3>Deliverables</h3>
                      <ul className="check-list">
                        {(s.deliverables || []).map((d) => <li key={d}><Icon name="check" size={16} />{d}</li>)}
                      </ul>
                    </div>
                  </div>
                  <Button to="/contact" variant="ghost" size="sm" icon="arrow">Request a quote</Button>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="section section-alt">
        <Container>
          <SectionTitle eyebrow="On the roadmap" title="Coming later" intro="These are in internal development. We will offer them once we can demonstrate delivery, testing and support." />
          <div className="grid grid-2">
            {plannedServices.map((s) => (
              <div key={s.slug} className="card planned-card">
                <span className="icon-tile muted-tile"><Icon name={s.icon} size={22} /></span>
                <div>
                  <h3>{s.title} <span className="badge">Planned</span></h3>
                  <p className="muted">{s.short}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section">
        <Container narrow>
          <SectionTitle eyebrow="FAQ" title="Common questions" align="center" />
          <Accordion items={faqs} />
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
