import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import LakewoodDigitalMarketingPage from './pages/LakewoodDigitalMarketingPage';
import ServicesPage from './pages/ServicesPage';
import PortfolioPage from './pages/PortfolioPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import ServiceLandingPage from './pages/ServiceLandingPage';
import NotFoundPage from './pages/NotFoundPage';
import { allLandingPages } from './data/landing';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminRegister from './pages/admin/Register';

const legacyServiceRedirects = [
  ['/web-development-services-lakewood', '/nj/ocean-county/web-development-lakewood/'],
  ['/web-design-services-lakewood', '/nj/ocean-county/web-design-lakewood/'],
  ['/ecommerce-web-development-services-lakewood', '/nj/ocean-county/ecommerce-web-design-lakewood/'],
  ['/ecommerce-website-design-services-lakewood', '/nj/ocean-county/ecommerce-web-development-lakewood/'],
  ['/seo-services-lakewood', '/nj/ocean-county/seo-lakewood/'],
  ['/local-seo-services-lakewood', '/nj/ocean-county/local-seo-company-lakewood/'],
  ['/pay-per-click-services-lakewood', '/nj/ocean-county/ppc-management-lakewood/'],
  ['/social-media-marketing-services-lakewood', '/nj/ocean-county/social-media-marketing-lakewood/'],
] as const;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {legacyServiceRedirects.map(([from, to]) => (
          <Route key={from} path={from} element={<Navigate to={to} replace />} />
        ))}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/nj/ocean-county/digital-marketing-lakewood"
            element={<LakewoodDigitalMarketingPage />}
          />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          {allLandingPages.map((page) => (
            <Route
              key={page.slug}
              path={`/${page.slug}`}
              element={<ServiceLandingPage content={page} />}
            />
          ))}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
