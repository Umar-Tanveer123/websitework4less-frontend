import { landingPages } from './landing';

export const serviceOptions = landingPages.map((page) => ({
  value: page.slug,
  label: page.navLabel,
}));
