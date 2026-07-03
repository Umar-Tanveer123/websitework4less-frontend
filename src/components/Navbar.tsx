import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import { SunIcon, MoonIcon } from './Icons';
import Logo from './Logo';
import { landingPages } from '../data/landing';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'About', path: '/about' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });
  const location = useLocation();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // Only use white text on the Home page (if it has a dark hero)
  // Or just default to dark text everywhere if backgrounds are light.
  const isWhiteText = !scrolled && location.pathname === '/dark-hero-page'; // Assuming no dark hero for now, text will be dark.

  // Show background if scrolled OR if not on the Home page
  const showBackground = scrolled || location.pathname !== '/';

  // Highlight "Services" when on the hub page or any of its landing pages.
  const landingPaths = landingPages.map((p) => `/${p.slug}`);
  const isServicesActive =
    location.pathname === '/services' || landingPaths.includes(location.pathname);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${showBackground
          ? 'bg-surface/80 backdrop-blur-xl shadow-sm border-b border-border/50'
          : 'bg-transparent'
        }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-20">
        {/* Logo */}
        <Link
          to="/"
          className="relative z-[70] flex items-center"
        >
          <Logo className="h-12 sm:h-14" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) =>
            link.label === 'Services' ? (
              <div key={link.path} className="relative group">
                <Link
                  to={link.path}
                  className={`flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${isServicesActive
                      ? `text-accent ${isWhiteText ? 'bg-white/10' : 'bg-accent/5'}`
                      : `${isWhiteText ? 'text-white/70 hover:text-white hover:bg-white/10' : 'text-text-secondary hover:text-text-primary hover:bg-surface-muted'}`
                    }`}
                >
                  {link.label}
                  <svg
                    className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </Link>
                {/* Dropdown */}
                <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  <div className="w-80 rounded-2xl border border-border bg-surface p-2 shadow-2xl shadow-black/10">
                    <Link
                      to="/services"
                      className="block rounded-xl px-4 py-2.5 text-sm font-semibold text-text-primary transition-colors hover:bg-accent/5 hover:text-accent"
                    >
                      All Services
                    </Link>
                    <div className="my-1 h-px bg-border" />
                    {landingPages.map((page) => (
                      <Link
                        key={page.slug}
                        to={`/${page.slug}`}
                        className={`block rounded-xl px-4 py-2.5 text-sm font-medium transition-colors hover:bg-accent/5 hover:text-accent ${location.pathname === `/${page.slug}` ? 'text-accent' : 'text-text-secondary'
                          }`}
                      >
                        {page.navLabel}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.path}
                to={link.path}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${location.pathname === link.path
                    ? `text-accent ${isWhiteText ? 'bg-white/10' : 'bg-accent/5'}`
                    : `${isWhiteText ? 'text-white/70 hover:text-white hover:bg-white/10' : 'text-text-secondary hover:text-text-primary hover:bg-surface-muted'}`
                  }`}
              >
                {link.label}
              </Link>
            ),
          )}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={() => setIsDark(!isDark)}
            className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${isWhiteText ? 'hover:bg-white/10 text-white' : 'hover:bg-surface-muted text-text-primary'
              }`}
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isDark ? 'dark' : 'light'}
                initial={{ y: -20, opacity: 0, rotate: -45 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: 20, opacity: 0, rotate: 45 }}
                transition={{ duration: 0.2 }}
              >
                {isDark ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
              </motion.div>
            </AnimatePresence>
          </button>
          <Button
            as="link"
            to="/contact"
            size="sm"
            variant={isWhiteText ? 'outline' : 'primary'}
            className={isWhiteText ? '!border-white/20 !text-white hover:!bg-white/10' : ''}
          >
            Get Started
          </Button>
        </div>

        {/* Mobile Toggle Group */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setIsDark(!isDark)}
            className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${isWhiteText ? 'hover:bg-white/10 text-white' : 'hover:bg-surface-muted text-text-primary'
              }`}
            aria-label="Toggle theme"
          >
            {isDark ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`relative z-[70] flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${isWhiteText ? 'hover:bg-white/10' : 'hover:bg-surface-muted'
              }`}
            aria-label="Toggle menu"
          >
            <div className="relative h-5 w-6">
              <span
                className={`absolute left-0 h-0.5 w-full transition-all duration-300 ${isWhiteText ? 'bg-white' : 'bg-text-primary'} ${mobileOpen ? 'top-2.5 rotate-45' : 'top-0'
                  }`}
              />
              <span
                className={`absolute left-0 top-2.5 h-0.5 w-full transition-all duration-300 ${isWhiteText ? 'bg-white' : 'bg-text-primary'} ${mobileOpen ? 'opacity-0' : 'opacity-100'
                  }`}
              />
              <span
                className={`absolute left-0 h-0.5 w-full transition-all duration-300 ${isWhiteText ? 'bg-white' : 'bg-text-primary'} ${mobileOpen ? 'top-2.5 -rotate-45' : 'top-5'
                  }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed inset-0 z-[60] bg-surface transition-all duration-500 ease-[var(--ease-out-premium)] lg:hidden ${mobileOpen
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-4 pointer-events-none'
            }`}
        >
          <div className="flex h-full flex-col items-center justify-center gap-6 px-6 pt-20 overflow-y-auto">
            {navLinks.map((link, index) => (
              <div
                key={link.path}
                className={`flex flex-col items-center transition-all duration-500 ease-[var(--ease-out-premium)] ${mobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <Link
                  to={link.path}
                  className={`text-2xl font-semibold ${location.pathname === link.path ? 'text-accent' : 'text-text-primary hover:text-accent'
                    }`}
                >
                  {link.label}
                </Link>
                {link.label === 'Services' && (
                  <div className="mt-3 flex flex-col items-center gap-2.5">
                    {landingPages.map((page) => (
                      <Link
                        key={page.slug}
                        to={`/${page.slug}`}
                        className={`text-sm font-medium ${location.pathname === `/${page.slug}` ? 'text-accent' : 'text-text-muted hover:text-accent'
                          }`}
                      >
                        {page.navLabel}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div
              className={`mt-4 transition-all duration-500 ease-[var(--ease-out-premium)] ${mobileOpen
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
                }`}
              style={{ transitionDelay: `${navLinks.length * 100}ms` }}
            >
              <Button as="link" to="/contact" size="lg">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
