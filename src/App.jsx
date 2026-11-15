import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/ui/ScrollToTop";
import BackToTop from "./components/ui/BackToTop";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";

// Admin imports
import AdminLayout from "./admin/layouts/AdminLayout";
import AdminLogin from "./admin/pages/AdminLogin";
import Dashboard from "./admin/pages/Dashboard";
import SkillsManagement from "./admin/pages/SkillsManagement";
import ProjectsManagement from "./admin/pages/ProjectsManagement";
import ArticlesManagement from "./admin/pages/ArticlesManagement";
import ExperiencesManagement from './admin/pages/ExperiencesManagement';
import CertificatesManagement from './admin/pages/CertificatesManagement';

// Inner component to handle the location logic
function AppContent() {
  const location = useLocation();
  
  // Check if the current URL starts with '/admin'
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="flex min-h-dvh flex-col bg-base text-body">
      <ScrollToTop />
      
      {/* Only show Navbar on public pages */}
      {!isAdminRoute && <Navbar />}

      <main className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="skills" element={<SkillsManagement />} />
            <Route path="projects" element={<ProjectsManagement />} />
            <Route path="experience" element={<ExperiencesManagement />} />
            <Route path="certificates" element={<CertificatesManagement />} />
            <Route path="articles" element={<ArticlesManagement />} />
          </Route>
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Only show Footer and BackToTop on public pages */}
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <BackToTop />}
    </div>
  );
}

// Export AppContent directly (since main.jsx handles the BrowserRouter)
export default function App() {
  return <AppContent />;
}