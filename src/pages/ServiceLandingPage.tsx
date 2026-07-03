import { useEffect, useState, Fragment, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../components/SectionWrapper';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import TestimonialCarousel from '../components/TestimonialCarousel';
import { AnimatedSection, useScrollToTop } from '../hooks/useAnimations';
import {
  CheckCircleIcon,
  ArrowRightIcon,
  SparklesIcon,
  CodeIcon,
  DevicePhoneMobileIcon,
  ShoppingBagIcon,
  RocketLaunchIcon,
  WrenchScrewdriverIcon,
  MagnifyingGlassIcon,
  ChartBarIcon,
  PaletteIcon,
  MapPinIcon,
} from '../components/Icons';
import type { ServiceLanding, TitledItem, FaqItem } from '../data/landing/types';

const SITE = 'https://websitework4less.com';

/** Icon palette cycled across the "What's Included" cards for visual variety. */
const INCLUDED_ICONS = [
  CodeIcon,
  DevicePhoneMobileIcon,
  ShoppingBagIcon,
  RocketLaunchIcon,
  WrenchScrewdriverIcon,
  MagnifyingGlassIcon,
  ChartBarIcon,
  PaletteIcon,
];

/** Accent check-mark bullet list, matching the site's list styling. */
function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-4">
      {items.map((item) => {
        // Bold a leading "Label:" segment when present (used in "why us" lists).
        const idx = item.indexOf(': ');
        const hasLead = idx > 0 && idx < 40;
        return (
          <li key={item} className="flex items-start gap-3 text-text-secondary leading-relaxed">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
              <CheckCircleIcon className="h-4 w-4" />
            </span>
            <span>
              {hasLead ? (
                <>
                  <strong className="text-text-primary font-semibold">{item.slice(0, idx)}:</strong>
                  {item.slice(idx + 1)}
                </>
              ) : (
                item
              )}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

function Paragraphs({ items, className = '' }: { items: ReactNode[]; className?: string }) {
  return (
    <div className={`space-y-4 text-lg leading-relaxed text-text-secondary ${className}`}>
      {items.map((node, i) => (
        <p key={i}>{node}</p>
      ))}
    </div>
  );
}

function FaqRow({ faq, open, onToggle }: { faq: FaqItem; open: boolean; onToggle: () => void }) {
  // Render the answer, splitting in an inline <Link> when the FAQ declares one.
  let answer: ReactNode = faq.a;
  if (faq.link) {
    const at = faq.a.indexOf(faq.link.anchor);
    if (at >= 0) {
      answer = (
        <>
          {faq.a.slice(0, at)}
          <a
            href={faq.link.to}
            className="text-accent font-semibold underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
          >
            {faq.link.anchor}
          </a>
          {faq.a.slice(at + faq.link.anchor.length)}
        </>
      );
    }
  }

  return (
    <div className="border border-border rounded-2xl bg-surface overflow-hidden transition-colors hover:border-accent/30">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={open}
      >
        <span className="text-base font-semibold text-text-primary">{faq.q}</span>
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent transition-transform duration-300 ${
            open ? 'rotate-45' : ''
          }`}
        >
          <span className="text-xl leading-none">+</span>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="px-6 pb-6 text-text-secondary leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Numbered vertical/side process step. */
function ProcessStep({ step, index }: { step: TitledItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative flex gap-6 rounded-2xl border border-border bg-surface p-6 shadow-sm transition-colors hover:border-accent/30"
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent text-white font-black shadow-lg">
        {String(index + 1).padStart(2, '0')}
      </span>
      <div>
        <h3 className="mb-1.5 text-lg font-bold text-text-primary">{step.title}</h3>
        <p className="text-text-secondary leading-relaxed">{step.desc}</p>
      </div>
    </motion.div>
  );
}

export default function ServiceLandingPage({ content }: { content: ServiceLanding }) {
  useScrollToTop();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const canonical = `${SITE}/${content.slug}`;

  // Per-page SEO: title, meta description, keywords, canonical, and JSON-LD
  // (Service + FAQPage). Everything is cleaned up on unmount so navigating away
  // restores the site defaults.
  useEffect(() => {
    const DEFAULT_TITLE = 'Website Work 4 Less | Professional Web Development Agency';
    document.title = content.seo.title;

    const upsertMeta = (name: string, value: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      const prev = el.getAttribute('content') ?? '';
      el.setAttribute('content', value);
      return prev;
    };

    const prevDesc = upsertMeta('description', content.seo.description);
    const prevKeywords = upsertMeta('keywords', content.seo.keywords.join(', '));

    let canonicalEl = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const createdCanonical = !canonicalEl;
    const prevCanonical = canonicalEl?.getAttribute('href') ?? `${SITE}/`;
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', canonical);

    const serviceSchema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: content.seo.title.split('|')[0].trim(),
      serviceType: content.seo.serviceType,
      description: content.seo.description,
      url: canonical,
      areaServed: [
        { '@type': 'City', name: 'Lakewood', address: { '@type': 'PostalAddress', addressRegion: 'NJ', addressCountry: 'US' } },
        { '@type': 'AdministrativeArea', name: 'New Jersey' },
        { '@type': 'Country', name: 'United States' },
      ],
      provider: {
        '@type': 'ProfessionalService',
        name: 'Website Work 4 Less',
        url: `${SITE}/`,
        telephone: '+1-848-368-8867',
        email: 'info@websitework4less.com',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '750 Forest Ave',
          addressLocality: 'Lakewood',
          addressRegion: 'NJ',
          postalCode: '08701',
          addressCountry: 'US',
        },
      },
    };

    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: content.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    };

    const addSchema = (id: string, data: unknown) => {
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.id = id;
      s.textContent = JSON.stringify(data);
      document.head.appendChild(s);
    };
    addSchema('landing-service-schema', serviceSchema);
    addSchema('landing-faq-schema', faqSchema);

    return () => {
      document.title = DEFAULT_TITLE;
      upsertMeta('description', prevDesc);
      upsertMeta('keywords', prevKeywords);
      if (createdCanonical) canonicalEl?.remove();
      else canonicalEl?.setAttribute('href', prevCanonical);
      document.getElementById('landing-service-schema')?.remove();
      document.getElementById('landing-faq-schema')?.remove();
    };
  }, [content, canonical]);

  return (
    <div className="overflow-hidden">
      {/* ==================== HERO ==================== */}
      <section className="relative min-h-[70vh] flex items-center pt-32 pb-20 lg:pt-40 lg:pb-28 bg-primary">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.2, 1], x: [0, 80, 0], y: [0, 40, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
            className="absolute -top-1/4 -left-1/4 w-[900px] h-[900px] bg-accent/20 rounded-full blur-[150px]"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], x: [0, -60, 0], y: [0, -30, 0] }}
            transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
            className="absolute -bottom-1/4 -right-1/4 w-[800px] h-[800px] bg-accent-light/10 rounded-full blur-[130px]"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection animation="fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-widest mb-8">
              <MapPinIcon className="h-4 w-4" />
              {content.hero.eyebrow ?? 'Lakewood, NJ'}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-text-primary leading-[1.05] mb-8">
              {content.hero.h1}
            </h1>
            <div className="mx-auto max-w-3xl">
              <Paragraphs items={content.hero.intro} className="!text-xl" />
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {content.hero.highlights.map((h) => (
                <span
                  key={h}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold text-text-primary shadow-sm"
                >
                  <CheckCircleIcon className="h-4 w-4 text-accent" />
                  {h}
                </span>
              ))}
            </div>

            <div className="mt-10">
              <Button size="lg" as="link" to="/contact" className="shadow-2xl shadow-accent/20">
                {content.hero.ctaLabel}
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ==================== VALUE ==================== */}
      <SectionWrapper background="transparent">
        <div className="mx-auto max-w-3xl">
          <AnimatedSection>
            <SectionHeading title={content.value.heading} align="left" />
            <Paragraphs items={content.value.body} />
            {content.value.bulletsIntro && (
              <p className="mt-6 mb-4 text-lg font-semibold text-text-primary">{content.value.bulletsIntro}</p>
            )}
            {content.value.bullets && (
              <div className="mt-2">
                <BulletList items={content.value.bullets} />
              </div>
            )}
            {content.value.outro && (
              <p className="mt-6 text-lg leading-relaxed text-text-secondary">{content.value.outro}</p>
            )}
          </AnimatedSection>
        </div>
      </SectionWrapper>

      {/* ==================== PRICING / TRANSPARENCY ==================== */}
      <section className="relative py-20 md:py-28 bg-surface-alt border-y border-border overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--color-accent)_0%,_transparent_45%)] opacity-5" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeading title={content.pricing.heading} align="left" />
            <Paragraphs items={content.pricing.body} className="mb-8" />
            <BulletList items={content.pricing.bullets} />
            {content.pricing.outro && (
              <p className="mt-6 text-lg leading-relaxed text-text-secondary">{content.pricing.outro}</p>
            )}
            <div className="mt-10">
              <Button size="lg" as="link" to="/contact">
                {content.pricing.ctaLabel}
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ==================== PROBLEM / WHY IT MATTERS ==================== */}
      <SectionWrapper background="transparent">
        <div className="mx-auto max-w-3xl">
          <AnimatedSection>
            <SectionHeading title={content.problem.heading} align="left" />
            <Paragraphs items={content.problem.body} className="mb-6" />
            {content.problem.bulletsIntro && (
              <p className="mb-4 text-lg font-semibold text-text-primary">{content.problem.bulletsIntro}</p>
            )}
            <BulletList items={content.problem.bullets} />
            {content.problem.outro && (
              <p className="mt-6 text-lg leading-relaxed text-text-secondary">{content.problem.outro}</p>
            )}
          </AnimatedSection>
        </div>
      </SectionWrapper>

      {/* ==================== WHAT'S INCLUDED ==================== */}
      <section className="relative py-20 md:py-28 bg-surface-alt border-y border-border overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <AnimatedSection>
              <SectionHeading title={content.included.heading} description={undefined} />
              <p className="-mt-10 text-lg leading-relaxed text-text-secondary">{content.included.intro}</p>
            </AnimatedSection>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {content.included.items.map((item, i) => {
              const Icon = INCLUDED_ICONS[i % INCLUDED_ICONS.length];
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-7 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-accent/10 hover:border-accent/30"
                >
                  <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/5 text-accent transition-all duration-500 group-hover:bg-accent group-hover:text-white group-hover:scale-110">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-text-primary">{item.title}</h3>
                  <p className="text-text-secondary leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== PROCESS ==================== */}
      <SectionWrapper background="transparent">
        <div className="mx-auto max-w-4xl">
          <AnimatedSection>
            <div className="text-center mb-14">
              <SectionHeading title={content.process.heading} description={undefined} />
              {content.process.intro && (
                <p className="-mt-10 text-lg leading-relaxed text-text-secondary max-w-2xl mx-auto">
                  {content.process.intro}
                </p>
              )}
            </div>
          </AnimatedSection>
          <div className="grid gap-5">
            {content.process.steps.map((step, i) => (
              <ProcessStep key={step.title} step={step} index={i} />
            ))}
          </div>
          {content.process.outro && (
            <p className="mt-8 text-center text-lg leading-relaxed text-text-secondary max-w-2xl mx-auto">
              {content.process.outro}
            </p>
          )}
        </div>
      </SectionWrapper>

      {/* ==================== INDUSTRIES ==================== */}
      <section className="relative py-20 md:py-28 bg-surface-alt border-y border-border overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <AnimatedSection>
              <SectionHeading title={content.industries.heading} description={undefined} />
              {content.industries.intro && (
                <p className="-mt-10 text-lg leading-relaxed text-text-secondary">{content.industries.intro}</p>
              )}
            </AnimatedSection>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {content.industries.items.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                className="rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/30"
              >
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <MapPinIcon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 text-base font-bold text-text-primary">{item.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
          {content.industries.outro && (
            <p className="mt-10 text-center text-lg leading-relaxed text-text-secondary max-w-3xl mx-auto">
              {content.industries.outro}
            </p>
          )}
        </div>
      </section>

      {/* ==================== WHY US ==================== */}
      <SectionWrapper background="transparent">
        <div className="mx-auto max-w-3xl">
          <AnimatedSection>
            <SectionHeading title={content.whyUs.heading} align="left" />
            {content.whyUs.intro && (
              <p className="mb-8 text-lg leading-relaxed text-text-secondary">{content.whyUs.intro}</p>
            )}
            <BulletList items={content.whyUs.bullets} />
            {content.whyUs.outro && (
              <p className="mt-6 text-lg leading-relaxed text-text-secondary">{content.whyUs.outro}</p>
            )}
          </AnimatedSection>
        </div>
      </SectionWrapper>

      {/* ==================== RESULTS / TESTIMONIALS ==================== */}
      <section className="relative overflow-hidden bg-surface-alt border-y border-border py-20 md:py-24">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-accent/10 blur-[160px] rounded-full pointer-events-none opacity-30 -z-0" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <AnimatedSection>
              <SectionHeading label="Success Stories" title={content.results.heading} description={undefined} />
              <p className="-mt-10 text-lg leading-relaxed text-text-secondary">{content.results.body}</p>
            </AnimatedSection>
          </div>
          <AnimatedSection animation="fade-in" delay={200}>
            <TestimonialCarousel />
          </AnimatedSection>
        </div>
      </section>

      {/* ==================== FINAL CTA ==================== */}
      <section className="relative overflow-hidden bg-primary py-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-3xl" />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-text-primary sm:text-4xl lg:text-5xl leading-tight mb-6">
              {content.finalCta.heading}
            </h2>
            <Paragraphs items={content.finalCta.body} className="mx-auto max-w-2xl" />
            <div className="mt-10">
              <Button size="lg" as="link" to="/contact" className="shadow-2xl shadow-accent/20">
                {content.finalCta.ctaLabel}
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ==================== FAQ ==================== */}
      <SectionWrapper background="transparent">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-14">
            <AnimatedSection>
              <SectionHeading label="FAQ" title="Frequently Asked Questions" description={undefined} />
            </AnimatedSection>
          </div>
          <div className="space-y-4">
            {content.faqs.map((faq, i) => (
              <Fragment key={faq.q}>
                <FaqRow faq={faq} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />
              </Fragment>
            ))}
          </div>
          <div className="mt-14 text-center">
            <div className="inline-flex items-center gap-2 text-accent mb-4">
              <SparklesIcon className="h-5 w-5" />
            </div>
            <Button as="link" to="/contact" size="lg" variant="outline">
              Get a Free Consultation
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
