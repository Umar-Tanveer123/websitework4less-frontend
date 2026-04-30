import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from './Button';

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
  const location = useLocation();

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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-surface/80 backdrop-blur-xl shadow-sm border-b border-border/50'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-20">
        {/* Logo */}
        <Link
          to="/"
          className="relative z-50 flex items-center gap-2 text-xl font-bold"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent">
            <svg
              className="h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
              />
            </svg>
          </div>
          <span className={`transition-colors duration-300 ${isWhiteText ? 'text-white' : 'text-text-primary'}`}>
            Website Work <span className="text-accent">4</span> Less
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                location.pathname === link.path
                  ? `text-accent ${isWhiteText ? 'bg-white/10' : 'bg-accent/5'}`
                  : `${isWhiteText ? 'text-white/70 hover:text-white hover:bg-white/10' : 'text-text-secondary hover:text-text-primary hover:bg-surface-muted'}`
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
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

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`relative z-50 flex h-10 w-10 items-center justify-center rounded-lg lg:hidden transition-colors ${
            isWhiteText ? 'hover:bg-white/10' : 'hover:bg-surface-muted'
          }`}
          aria-label="Toggle menu"
        >
          <div className="relative h-5 w-6">
            <span
              className={`absolute left-0 h-0.5 w-full transition-all duration-300 ${isWhiteText ? 'bg-white' : 'bg-text-primary'} ${
                mobileOpen ? 'top-2.5 rotate-45' : 'top-0'
              }`}
            />
            <span
              className={`absolute left-0 top-2.5 h-0.5 w-full transition-all duration-300 ${isWhiteText ? 'bg-white' : 'bg-text-primary'} ${
                mobileOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`absolute left-0 h-0.5 w-full transition-all duration-300 ${isWhiteText ? 'bg-white' : 'bg-text-primary'} ${
                mobileOpen ? 'top-2.5 -rotate-45' : 'top-5'
              }`}
            />
          </div>
        </button>

        {/* Mobile Menu */}
        <div
          className={`fixed inset-0 z-40 bg-surface transition-all duration-500 ease-[var(--ease-out-premium)] lg:hidden ${
            mobileOpen
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
        >
          <div className="flex h-full flex-col items-center justify-center gap-8">
            {navLinks.map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-2xl font-semibold transition-all duration-500 ease-[var(--ease-out-premium)] ${
                  location.pathname === link.path
                    ? 'text-accent'
                    : 'text-text-primary hover:text-accent'
                } ${
                  mobileOpen 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {link.label}
              </Link>
            ))}
            <div 
              className={`mt-4 transition-all duration-500 ease-[var(--ease-out-premium)] ${
                mobileOpen 
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
