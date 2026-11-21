import Container from '../components/layout/Container';
import SectionTitle from '../components/ui/SectionTitle';
import Icon from '../components/ui/Icon';
import CtaBand from '../components/ui/CtaBand';
import Avatar from '../components/ui/Avatar';
import usePageMeta from '../hooks/usePageMeta';
import { useContent } from '../content/ContentContext';

export default function Team() {
  const { team } = useContent();
  usePageMeta('Team', 'Meet the people behind ASoftix, their roles, skills and experience.');
  return (
    <>
      <section className="page-hero">
        <Container>
          <SectionTitle as="h1" eyebrow="Team" title="The people who build your project" intro="A small team means you always talk to the person doing the work." />
        </Container>
      </section>

      {team.map((m) => (
        <section className="section section-tight" key={m.name}>
          <Container>
            <article className="member card">
              <div className="member-head">
                <Avatar person={m} size="xl" />
                <div>
                  <h2>{m.name}</h2>
                  <p className="role">{m.role}</p>
                  <p className="muted"><Icon name="pin" size={14} /> {m.location}</p>
                  <div className="member-links">
                    {(m.links || []).map((l) => (
                      <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
                        <Icon name="github" size={16} /> {l.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="member-grid">
                <div>
                  {(m.bio || []).map((para, i) => <p key={i}>{para}</p>)}

                  <h3>Experience</h3>
                  <ol className="timeline">
                    {(m.timeline || []).map((t) => (
                      <li key={t.what}><span className="mono">{t.when}</span><p>{t.what}</p></li>
                    ))}
                  </ol>

                  <h3>Education & certifications</h3>
                  <ul className="check-list">
                    {(m.education || []).map((e) => <li key={e}><Icon name="check" size={16} />{e}</li>)}
                  </ul>
                </div>
                <div className="skills">
                  <h3>Skills</h3>
                  {(m.skillGroups || []).map((g) => (
                    <div key={g.title} className="skill-group">
                      <h4>{g.title}</h4>
                      <ul className="tags">{g.items.map((s) => <li key={s}>{s}</li>)}</ul>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </Container>
        </section>
      ))}
      <CtaBand title="Let's talk about your project" />
    </>
  );
}
