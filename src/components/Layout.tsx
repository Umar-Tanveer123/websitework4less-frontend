import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useEffect } from 'react';

export default function Layout() {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Keep a dynamic canonical tag in sync with the current route
  useEffect(() => {
    const base = 'https://websitework4less.com';
    const path = location.pathname;
    // Normalize: root stays "/", others drop any trailing slash
    const canonicalUrl =
      path === '/' ? `${base}/` : `${base}${path.replace(/\/+$/, '')}`;

    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = canonicalUrl;
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <Navbar />
      <main key={location.pathname} className="flex-grow animate-fade-in overflow-x-hidden">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
