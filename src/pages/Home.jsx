import { Link } from 'react-router-dom';
import Container from '../components/layout/Container';
import Button from '../components/ui/Button';
import SectionTitle from '../components/ui/SectionTitle';
import Icon from '../components/ui/Icon';
import ProjectCard from '../components/ui/ProjectCard';
import CtaBand from '../components/ui/CtaBand';
import Avatar from '../components/ui/Avatar';
import usePageMeta from '../hooks/usePageMeta';
import { useContent } from '../content/ContentContext';

export default function Home() {
  const { liveServices, featuredProjects, team, process, techStack, whyUs } = useContent();
  usePageMeta(null, 'ASoftix builds modern websites, React apps, full-stack web applications and inventory systems for startups and small businesses.');
  const founder = team[0];

  return (
    <>
      {/* 2. Hero */}
      <section className="hero">
        <div className="hero-glow" aria-hidden="true" />
        <Container className="hero-inner">
          <div className="hero-copy">
            <p className="eyebrow"><span className="dot" /> Software studio · Lahore, Pakistan</p>
            <h1>Digital Solutions Built Around <span className="grad">Your Business.</span></h1>
            <p className="lead">
              We design and build fast websites, React applications and full-stack business systems for
              startups, small businesses and international clients. Clear scope, direct communication, working software.
            </p>
            <div className="hero-actions">
              <Button to="/contact" size="lg" icon="arrow">Start a Project</Button>
              <Button to="/portfolio" size="lg" variant="ghost">View Our Work</Button>
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="code-card">
              <div className="pv-bar"><i /><i /><i /><span>project.js</span></div>
              <pre>
<span className="c-k">const</span> project = {'{'}{'\n'}
{'  '}client: <span className="c-s">'your business'</span>,{'\n'}
{'  '}scope: <span className="c-s">'agreed in writing'</span>,{'\n'}
{'  '}stack: [<span className="c-s">'React'</span>, <span className="c-s">'Node'</span>, <span className="c-s">'Postgres'</span>],{'\n'}
{'  '}responsive: <span className="c-k">true</span>,{'\n'}
{'  '}tested: <span className="c-k">true</span>,{'\n'}
{'}'};{'\n'}
{'\n'}
<span className="c-f">launch</span>(project); <span className="c-c">// 🚀</span>
              </pre>
            </div>
            <div className="float-chip chip-a"><Icon name="check" size={16} /> Mobile-first</div>
            <div className="float-chip chip-b"><Icon name="shield" size={16} /> Secure by default</div>
          </div>
        </Container>
      </section>

      {/* 3. Trust strip: technologies actually used */}
      <section className="trust" aria-label="Technologies we work with">
        <Container>
          <p className="trust-label">Technologies we ship with</p>
          <ul className="trust-list">
            {techStack.map((t) => <li key={t}>{t}</li>)}
          </ul>
        </Container>
      </section>

      {/* 4. Services */}
      <section className="section">
        <Container>
          <SectionTitle eyebrow="What we do" title="Services built for growing businesses" intro="Focused services we can deliver today, backed by real projects in our portfolio." />
          <div className="grid grid-3 services-grid">
            {liveServices.map((s) => (
              <Link to={`/services#${s.slug}`} key={s.slug} className="card service-card">
                <span className="icon-tile"><Icon name={s.icon} size={22} /></span>
                <h3>{s.title}</h3>
                <p>{s.short}</p>
                <span className="link-arrow">Learn more <Icon name="arrow" size={16} /></span>
              </Link>
            ))}
            <Link to="/contact" className="card service-card service-card-cta">
              <h3>Not sure what you need?</h3>
              <p>Describe the problem and we will recommend the simplest solution that works.</p>
              <span className="link-arrow">Ask us <Icon name="arrow" size={16} /></span>
            </Link>
          </div>
        </Container>
      </section>

      {/* 5. Featured work */}
      <section className="section section-alt">
        <Container>
          <div className="section-head-row">
            <SectionTitle eyebrow="Featured work" title="Real projects, honestly labelled" intro="Each case study covers the problem, the solution, the stack and its known limitations." />
            <Button to="/portfolio" variant="ghost" icon="arrow">All projects</Button>
          </div>
          <div className="grid grid-3">
            {featuredProjects.map((p) => <ProjectCard key={p.slug} project={p} detailed />)}
          </div>
        </Container>
      </section>

      {/* 6. Why ASoftix */}
      <section className="section">
        <Container>
          <SectionTitle eyebrow="Why ASoftix" title="Software from people who understand operations" align="center" />
          <div className="grid grid-4">
            {whyUs.map((w) => (
              <div className="why-item" key={w.title}>
                <span className="icon-tile"><Icon name={w.icon} size={22} /></span>
                <h3>{w.title}</h3>
                <p>{w.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 7. Process */}
      <section className="section section-alt">
        <Container>
          <SectionTitle eyebrow="How we work" title="A transparent, seven-step process" align="center" />
          <ol className="process">
            {process.map((p, i) => (
              <li key={p.step}>
                <span className="process-num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{p.step}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* 8. Team intro */}
      {founder && <section className="section">
        <Container>
          <div className="team-intro card">
            <Avatar person={founder} size="lg" />
            <div>
              <p className="eyebrow">Who you will work with</p>
              <h2>{founder.name}</h2>
              <p className="role">{founder.role}</p>
              <p className="muted">{founder.short}</p>
              <ul className="tags">
                {['React', 'Node.js', 'PostgreSQL', 'Inventory systems', 'Data analysis', 'Excel dashboards'].map((t) => <li key={t}>{t}</li>)}
              </ul>
              <Button to="/team" variant="ghost" icon="arrow">Meet the team</Button>
            </div>
          </div>
        </Container>
      </section>}

      {/* 9. Testimonials: hidden until genuine, approved testimonials exist (blueprint rule). */}

      {/* 10. Final CTA */}
      <CtaBand />
    </>
  );
}
