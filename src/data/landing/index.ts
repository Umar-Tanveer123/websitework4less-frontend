import type { ServiceLanding } from './types';
import { webDevelopment } from './webDevelopment';
import { webDesign } from './webDesign';
import { ecommerceWebDevelopment } from './ecommerceWebDevelopment';
import { ecommerceWebsiteDesign } from './ecommerceWebsiteDesign';
import { seoServices } from './seoServices';
import { localSeo } from './localSeo';
import { payPerClick } from './payPerClick';
import { socialMediaMarketing } from './socialMediaMarketing';

/**
 * All Lakewood service landing pages, in navigation order. Add a new page by
 * dropping a content file next to this one and appending it here — routes, the
 * navbar dropdown, and the footer all derive from this list.
 */
export const landingPages: ServiceLanding[] = [
  webDevelopment,
  webDesign,
  ecommerceWebDevelopment,
  ecommerceWebsiteDesign,
  seoServices,
  localSeo,
  payPerClick,
  socialMediaMarketing,
];

export const landingBySlug: Record<string, ServiceLanding> = Object.fromEntries(
  landingPages.map((p) => [p.slug, p]),
);
