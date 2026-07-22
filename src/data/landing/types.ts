import type { ReactNode } from 'react';

/** A titled item with a description — used for "What's Included", process steps, industries. */
export interface TitledItem {
  title: string;
  desc: ReactNode;
}

/**
 * A single FAQ. The answer is kept as a plain string so it can also feed the
 * FAQPage JSON-LD. If the answer contains an internal link, set `link` and the
 * template will turn the first occurrence of `anchor` inside `a` into a <Link>.
 */
export interface FaqItem {
  q: string;
  a: string;
  link?: { anchor: string; to: string };
}

/**
 * All content for one Lakewood service landing page. Every page in the set
 * shares this exact shape, which is why a single template can render them all.
 * Body fields are ReactNode so the authored copy can embed internal <Link>s
 * exactly where the source document places them.
 */
export interface ServiceLanding {
  /** URL slug, e.g. 'web-development-services-lakewood' (no leading/trailing slash). */
  slug: string;

  /** Short label for navigation menus (navbar dropdown + footer). */
  navLabel: string;

  seo: {
    title: string;
    description: string;
    keywords: string[];
    /** Long-form description supplied for the page's Service JSON-LD. */
    schemaDescription: string;
    /** serviceType used in the Service JSON-LD (e.g. 'Web Development'). */
    serviceType: string;
  };

  hero: {
    eyebrow?: string;
    h1: string;
    intro: ReactNode[];
    highlights: string[];
    ctaLabel: string;
  };

  /** "Built around your business" value section. */
  value: {
    heading: string;
    body: ReactNode[];
    bulletsIntro?: ReactNode;
    bullets?: string[];
    outro?: ReactNode;
  };

  /** Pricing / transparency section (usually holds the "Website Work 4 Less" → / link). */
  pricing: {
    heading: string;
    body: ReactNode[];
    bullets: string[];
    outro?: ReactNode;
    ctaLabel: string;
  };

  /** "Why it matters / what poor X costs you" problem section. */
  problem: {
    heading: string;
    body: ReactNode[];
    bulletsIntro?: ReactNode;
    bullets: string[];
    outro?: ReactNode;
  };

  /** "What's Included" grid (holds the "services" → /services link in its intro). */
  included: {
    heading: string;
    intro: ReactNode;
    items: TitledItem[];
  };

  process: {
    heading: string;
    intro?: ReactNode;
    steps: TitledItem[];
    outro?: ReactNode;
  };

  /** Industries served grid (its outro sometimes holds a → /portfolio or → /services link). */
  industries: {
    heading: string;
    intro?: ReactNode;
    items: TitledItem[];
    outro?: ReactNode;
  };

  /** "What sets us apart" section. */
  whyUs: {
    heading: string;
    intro?: ReactNode;
    bullets: string[];
    outro?: ReactNode;
  };

  /** Results / reviews lead-in (rendered above the shared testimonial carousel). */
  results: {
    heading: string;
    body: ReactNode;
  };

  finalCta: {
    heading: string;
    body: ReactNode[];
    ctaLabel: string;
  };

  faqs: FaqItem[];
}
