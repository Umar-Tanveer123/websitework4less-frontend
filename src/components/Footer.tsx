import { Link } from 'react-router-dom';
import { services } from '../data/services';
import Logo from './Logo';

const footerLinks = {
  Company: [
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' },
  ],
  Services: services.slice(0, 4).map(s => ({
    label: s.title,
    path: '/services'
  })),
  Support: [
    { label: 'Help Center', path: '/contact' },
    { label: 'Privacy Policy', path: '/' },
    { label: 'Terms of Service', path: '/' },
    { label: 'FAQ', path: '/' },
  ],
};


export default function Footer() {
  return (
    <footer className="bg-primary text-text-primary border-t border-border/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 gap-12 border-b border-border/50 py-16 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center">
              <Logo className="h-12" />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-text-secondary">
              We build high-performance websites and digital experiences that help
              businesses grow. Professional, reliable, and results-driven.
            </p>

          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-muted">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-sm text-text-secondary transition-colors duration-200 hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 py-8 md:flex-row">
          <p className="text-sm text-text-muted">
            &copy; {new Date().getFullYear()} Website Work 4 Less. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              to="/"
              className="text-sm text-text-muted transition-colors hover:text-text-primary"
            >
              Privacy Policy
            </Link>
            <Link
              to="/"
              className="text-sm text-text-muted transition-colors hover:text-text-primary"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
