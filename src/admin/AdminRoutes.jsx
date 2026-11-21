import { Route, Routes } from 'react-router-dom';
import { AdminProvider } from './AdminContext';
import { AdminHomepage, AdminInquiries, AdminLayout, AdminLogin, AdminOverview, AdminProjects, AdminServices, AdminSettings, AdminTeam } from './pages';
import '../styles/admin.css';

export default function AdminRoutes() {
  return (
    <AdminProvider>
      <Routes>
        <Route path="login" element={<AdminLogin />} />
        <Route element={<AdminLayout />}>
          <Route index element={<AdminOverview />} />
          <Route path="team" element={<AdminTeam />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="homepage" element={<AdminHomepage />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="inquiries" element={<AdminInquiries />} />
        </Route>
      </Routes>
    </AdminProvider>
  );
}
