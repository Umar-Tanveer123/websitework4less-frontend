import { Link } from 'react-router-dom';
import Logo from './Logo';
import FooterContactForm from './FooterContactForm';
import { EnvelopeIcon, PhoneIcon } from './Icons';
import { landingPages } from '../data/landing';

const footerLinks = {
  Company: [
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' },
  ],
  Services: landingPages.map((page) => ({
    label: page.navLabel,
    path: `/${page.slug}`,
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
    <footer className="border-t border-border/50 bg-primary text-text-primary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 border-b border-border/50 py-16 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Link to="/" className="inline-flex items-center" aria-label="Website Work 4 Less home">
              <Logo className="h-12" />
            </Link>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-text-secondary">
              Tell us what you want to build or grow. Our Lakewood team will follow up with clear next steps for your website or marketing project.
            </p>
            <h3 className="mt-7 text-xl font-bold text-text-primary">Start a conversation</h3>
            <FooterContactForm />
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-4 rounded-2xl border border-border bg-surface/70 p-5 sm:grid-cols-2">
              <a href="tel:+18483688867" className="group flex items-center gap-3 text-sm font-semibold text-text-secondary hover:text-accent">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <PhoneIcon className="h-5 w-5" />
                </span>
                <span><span className="block text-xs uppercase tracking-wider text-text-muted">Call or text</span>(848) 368-8867</span>
              </a>
              <a href="mailto:info@websitework4less.com" className="group flex items-center gap-3 text-sm font-semibold text-text-secondary hover:text-accent">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <EnvelopeIcon className="h-5 w-5" />
                </span>
                <span className="min-w-0"><span className="block text-xs uppercase tracking-wider text-text-muted">Email</span><span className="break-all">info@websitework4less.com</span></span>
              </a>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3">
              {Object.entries(footerLinks).map(([title, links]) => (
                <div key={title}>
                  <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-muted">{title}</h4>
                  <ul className="space-y-3">
                    {links.map((link) => (
                      <li key={link.label}>
                        <Link to={link.path} className="text-sm text-text-secondary transition-colors hover:text-accent">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 py-8 md:flex-row">
          <p className="text-sm text-text-muted">&copy; {new Date().getFullYear()} Website Work 4 Less. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/" className="text-sm text-text-muted transition-colors hover:text-text-primary">Privacy Policy</Link>
            <Link to="/" className="text-sm text-text-muted transition-colors hover:text-text-primary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
