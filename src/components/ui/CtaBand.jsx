import Button from './Button';
import Container from '../layout/Container';
import { useContent } from '../../content/ContentContext';

export default function CtaBand({ title = 'Have a project in mind?', text }) {
  const { site } = useContent();
  return (
    <section className="cta-band">
      <Container>
        <div className="cta-inner">
          <div>
            <h2>{title}</h2>
            <p>{text || `Tell us what you need and we will reply ${site.responseTime} with next steps and an honest estimate.`}</p>
          </div>
          <div className="cta-actions">
            <Button to="/contact" icon="arrow">Start a Project</Button>
            <Button href={`mailto:${site.email}`} variant="ghost">Email us</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
