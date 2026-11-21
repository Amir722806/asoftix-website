import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import CaseStudy from './pages/CaseStudy';
import Team from './pages/Team';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import NotFound from './pages/NotFound';

// The admin panel is loaded only when someone opens /admin.
const Admin = lazy(() => import('./admin/AdminRoutes'));

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="services" element={<Services />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="portfolio/:slug" element={<CaseStudy />} />
        <Route path="about" element={<About />} />
        <Route path="team" element={<Team />} />
        <Route path="contact" element={<Contact />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="admin/*" element={<Suspense fallback={<p className="admin-loading">Loading admin…</p>}><Admin /></Suspense>} />
    </Routes>
  );
}
