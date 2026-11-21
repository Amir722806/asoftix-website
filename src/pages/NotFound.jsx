import Container from '../components/layout/Container';
import Button from '../components/ui/Button';
import usePageMeta from '../hooks/usePageMeta';

export default function NotFound() {
  usePageMeta('Page not found');
  return (
    <section className="section not-found">
      <Container narrow>
        <p className="eyebrow mono">404</p>
        <h1>This page does not exist</h1>
        <p className="lead">The link may be broken, or the page may have moved.</p>
        <div className="hero-actions">
          <Button to="/">Go home</Button>
          <Button to="/contact" variant="ghost">Contact us</Button>
        </div>
      </Container>
    </section>
  );
}
