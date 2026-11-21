import { Link } from 'react-router-dom';
import ProjectVisual from './ProjectVisual';
import Icon from './Icon';

export default function ProjectCard({ project, detailed = false }) {
  return (
    <article className="card project-card">
      <Link to={`/portfolio/${project.slug}`} className="project-media" tabIndex={-1} aria-hidden="true">
        {project.screenshots?.[0] ? (
          <img className="project-cover" src={project.screenshots[0].src} alt="" width="1440" height="900" loading="lazy" />
        ) : (
          <ProjectVisual kind={project.visual} />
        )}
      </Link>
      <div className="project-body">
        <p className="project-type">{project.type}</p>
        <h3><Link to={`/portfolio/${project.slug}`} className="stretched">{project.title}</Link></h3>
        {detailed ? (
          <dl className="ps">
            <div><dt>Problem</dt><dd>{project.challenge}</dd></div>
            <div><dt>Solution</dt><dd>{project.summary}</dd></div>
          </dl>
        ) : (
          <p className="muted">{project.summary}</p>
        )}
        <ul className="tags">
          {(project.stack || []).slice(0, 5).map((t) => <li key={t}>{t}</li>)}
        </ul>
        <p className="project-label"><Icon name="info" size={14} /> {project.label}</p>
        <div className="project-links">
          <span className="link-arrow">Case study <Icon name="arrow" size={16} /></span>
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="link-ext">
              Live demo <Icon name="external" size={14} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
