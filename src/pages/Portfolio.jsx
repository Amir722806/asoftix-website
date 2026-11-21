import { useState } from 'react';
import Container from '../components/layout/Container';
import SectionTitle from '../components/ui/SectionTitle';
import ProjectCard from '../components/ui/ProjectCard';
import CtaBand from '../components/ui/CtaBand';
import usePageMeta from '../hooks/usePageMeta';
import { useContent } from '../content/ContentContext';

export default function Portfolio() {
  const { projectCategories, projects } = useContent();
  usePageMeta('Portfolio', 'Case studies from ASoftix: a company website with CMS, a full e-commerce platform, a book shop management system and a mobile app.');
  const [filter, setFilter] = useState('All');
  const shown = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      <section className="page-hero">
        <Container>
          <SectionTitle as="h1" eyebrow="Portfolio" title="Work we have built" intro="Every project is labelled with its real status, whether built for a business, self-initiated or still in progress, so you know exactly what you are looking at." />
          <div className="filters" role="group" aria-label="Filter projects">
            {projectCategories.map((c) => (
              <button key={c} className={`filter ${filter === c ? 'active' : ''}`} aria-pressed={filter === c} onClick={() => setFilter(c)}>
                {c}
              </button>
            ))}
          </div>
        </Container>
      </section>
      <section className="section section-tight">
        <Container>
          <p className="sr-only" aria-live="polite">{shown.length} projects shown</p>
          <div className="grid grid-2">
            {shown.map((p) => <ProjectCard key={p.slug} project={p} />)}
          </div>
        </Container>
      </section>
      <CtaBand title="Want something similar?" />
    </>
  );
}
