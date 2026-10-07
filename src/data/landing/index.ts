import type { ServiceLanding } from './types';
import { webDevelopment } from './webDevelopment';
import { webDesign } from './webDesign';
import { ecommerceWebDevelopment } from './ecommerceWebDevelopment';
import { ecommerceWebsiteDesign } from './ecommerceWebsiteDesign';
import { seoServices } from './seoServices';
import { localSeo } from './localSeo';
import { payPerClick } from './payPerClick';
import { socialMediaMarketing } from './socialMediaMarketing';
import { webDevelopmentNJ } from './webDevelopmentNJ';
import { webDesignNJ } from './webDesignNJ';
import { seoNJ } from './seoNJ';
import { localSeoNJ } from './localSeoNJ';
import { ppcNJ } from './ppcNJ';
import { socialMediaNJ } from './socialMediaNJ';
import { newarkDigitalMarketing } from './newarkDigitalMarketing';
import { newarkWebDevelopment } from './newarkWebDevelopment';
import { newarkWebDesign } from './newarkWebDesign';
import { newarkSeo } from './newarkSeo';
import { newarkLocalSeo } from './newarkLocalSeo';
import { newarkPpc } from './newarkPpc';
import { newarkSocialMedia } from './newarkSocialMedia';
import { eastOrangeDigitalMarketing } from './eastOrangeDigitalMarketing';
import { eastOrangeWebDevelopment } from './eastOrangeWebDevelopment';
import { eastOrangeWebDesign } from './eastOrangeWebDesign';
import { eastOrangeSeo } from './eastOrangeSeo';
import { eastOrangeLocalSeo } from './eastOrangeLocalSeo';
import { eastOrangePpc } from './eastOrangePpc';
import { eastOrangeSocialMedia } from './eastOrangeSocialMedia';

export const newJerseyLandingPages: ServiceLanding[] = [
  webDevelopmentNJ,
  webDesignNJ,
  seoNJ,
  localSeoNJ,
  ppcNJ,
  socialMediaNJ,
];

/** Active service pages used by the navbar, footer, and contact-service lists. */
export const landingPages: ServiceLanding[] = newJerseyLandingPages;

/** Lakewood content moved to its new Ocean County canonical paths. */
export const oceanCountyLandingPages: ServiceLanding[] = [
  { ...webDevelopment, slug: 'nj/ocean-county/web-development-lakewood' },
  { ...webDesign, slug: 'nj/ocean-county/web-design-lakewood' },
  { ...ecommerceWebsiteDesign, slug: 'nj/ocean-county/ecommerce-web-design-lakewood' },
  { ...ecommerceWebDevelopment, slug: 'nj/ocean-county/ecommerce-web-development-lakewood' },
  { ...seoServices, slug: 'nj/ocean-county/seo-lakewood' },
  { ...localSeo, slug: 'nj/ocean-county/local-seo-company-lakewood' },
  { ...payPerClick, slug: 'nj/ocean-county/ppc-management-lakewood' },
  { ...socialMediaMarketing, slug: 'nj/ocean-county/social-media-marketing-lakewood' },
];

/** Newark content pages under the Essex County URL structure. */
export const newarkLandingPages: ServiceLanding[] = [
  newarkDigitalMarketing,
  newarkWebDevelopment,
  newarkWebDesign,
  newarkSeo,
  newarkLocalSeo,
  newarkPpc,
  newarkSocialMedia,
];

/** East Orange content pages under the Essex County URL structure. */
export const eastOrangeLandingPages: ServiceLanding[] = [
  eastOrangeDigitalMarketing,
  eastOrangeWebDevelopment,
  eastOrangeWebDesign,
  eastOrangeSeo,
  eastOrangeLocalSeo,
  eastOrangePpc,
  eastOrangeSocialMedia,
];

export const allLandingPages: ServiceLanding[] = [
  ...landingPages,
  ...oceanCountyLandingPages,
  ...newarkLandingPages,
  ...eastOrangeLandingPages,
];

export const landingBySlug: Record<string, ServiceLanding> = Object.fromEntries(
  allLandingPages.map((p) => [p.slug, p]),
);
