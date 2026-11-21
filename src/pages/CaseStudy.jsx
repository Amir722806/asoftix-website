import { Link, useParams } from 'react-router-dom';
import Container from '../components/layout/Container';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import ProjectVisual from '../components/ui/ProjectVisual';
import Gallery from '../components/ui/Gallery';
import CtaBand from '../components/ui/CtaBand';
import usePageMeta from '../hooks/usePageMeta';
import NotFound from './NotFound';
import { useContent } from '../content/ContentContext';

export default function CaseStudy() {
  const { getProject, projects } = useContent();
  const { slug } = useParams();
  const p = getProject(slug);
  usePageMeta(p?.title || 'Project not found', p?.summary);
  if (!p) return <NotFound />;

  const idx = projects.indexOf(p);
  const next = projects[(idx + 1) % projects.length];

  return (
    <>
      <section className="page-hero">
        <Container>
          <Link to="/portfolio" className="back-link"><Icon name="arrow" size={16} className="flip" /> All projects</Link>
          <p className="eyebrow">{p.type}</p>
          <h1>{p.title}</h1>
          <p className="lead">{p.summary}</p>
          <p className="project-label lg"><Icon name="info" size={16} /> {p.label}</p>
          <div className="hero-actions">
            {p.demo && <Button href={p.demo} icon="external">Live demo</Button>}
            {p.repo && <Button href={p.repo} variant="ghost" icon="github">Repository</Button>}
            {!p.demo && !p.repo && <Button to="/contact" variant="ghost">Request a walkthrough</Button>}
          </div>
        </Container>
      </section>

      <section className="section section-tight">
        <Container>
          {p.screenshots?.length ? (
            <Gallery shots={p.screenshots} title={p.title} />
          ) : (
            <div className="cs-visual"><ProjectVisual kind={p.visual} /></div>
          )}
          <div className="cs-layout">
            <div className="cs-main">
              <h2>The challenge</h2>
              <p>{p.challenge}</p>
              <h2>The solution</h2>
              <p>{p.solution}</p>
              <h2>Key features</h2>
              <ul className="check-list">
                {(p.features || []).map((f) => <li key={f}><Icon name="check" size={16} />{f}</li>)}
              </ul>
              <h2>Known limitations</h2>
              <p className="limitations">{p.limitations}</p>
            </div>
            <aside className="cs-side card" aria-label="Project facts">
              <dl>
                <div><dt>Project type</dt><dd>{p.type}</dd></div>
                <div><dt>Date</dt><dd>{p.date}</dd></div>
                <div><dt>Intended users</dt><dd>{p.users}</dd></div>
                <div><dt>Our contribution</dt><dd>{p.contribution}</dd></div>
                <div>
                  <dt>Technology</dt>
                  <dd><ul className="tags">{(p.stack || []).map((t) => <li key={t}>{t}</li>)}</ul></dd>
                </div>
              </dl>
            </aside>
          </div>
          <Link to={`/portfolio/${next.slug}`} className="next-project card">
            <span className="muted">Next project</span>
            <strong>{next.title}</strong>
            <Icon name="arrow" />
          </Link>
        </Container>
      </section>
      <CtaBand title="Need something like this?" />
    </>
  );
}
