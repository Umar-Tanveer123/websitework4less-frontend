import type { ReactNode } from 'react';
import {
  ChartBarIcon,
  CodeIcon,
  DevicePhoneMobileIcon,
  MagnifyingGlassIcon,
  PaletteIcon,
  ShoppingBagIcon,
} from '../components/Icons';

export interface Service {
  id: string;
  title: string;
  description: string;
  path: string;
  icon: ReactNode;
}

export const services: Service[] = [
  {
    id: 'web-development',
    title: 'Web Development',
    description:
      'Custom-built websites focused on performance, security, scalability, and seamless user experiences.',
    path: '/web-development-services-lakewood',
    icon: <CodeIcon className="h-7 w-7" />,
  },
  {
    id: 'web-design',
    title: 'Web Design',
    description:
      'Modern, responsive, and user-friendly website designs created to engage visitors and strengthen your brand.',
    path: '/web-design-services-lakewood',
    icon: <PaletteIcon className="h-7 w-7" />,
  },
  {
    id: 'ecommerce-development',
    title: 'eCommerce Development',
    description:
      'Powerful eCommerce solutions designed to streamline online selling, improve performance, and drive business growth.',
    path: '/ecommerce-web-development-services-lakewood',
    icon: <ShoppingBagIcon className="h-7 w-7" />,
  },
  {
    id: 'ecommerce-website-design',
    title: 'eCommerce Website Design',
    description:
      'Conversion-focused eCommerce designs that make online shopping simple, intuitive, and engaging.',
    path: '/ecommerce-website-design-services-lakewood',
    icon: <DevicePhoneMobileIcon className="h-7 w-7" />,
  },
  {
    id: 'seo',
    title: 'Search Engine Optimization (SEO)',
    description:
      'Data-driven SEO strategies that improve search visibility, attract qualified traffic, and grow your business online.',
    path: '/seo-services-lakewood',
    icon: <MagnifyingGlassIcon className="h-7 w-7" />,
  },
  {
    id: 'local-seo',
    title: 'Local SEO',
    description:
      'Local search optimization that helps your business appear in front of nearby customers searching for your services.',
    path: '/local-seo-services-lakewood',
    icon: <MagnifyingGlassIcon className="h-7 w-7" />,
  },
  {
    id: 'ppc',
    title: 'Pay Per Click (PPC) Marketing',
    description:
      'Targeted PPC campaigns designed to reach the right audience, generate qualified leads, and maximize your advertising budget.',
    path: '/pay-per-click-services-lakewood',
    icon: <ChartBarIcon className="h-7 w-7" />,
  },
  {
    id: 'social-media-marketing',
    title: 'Social Media Marketing (SMM)',
    description:
      'Strategic social media campaigns that build brand awareness, engage your audience, and drive meaningful business results.',
    path: '/social-media-marketing-services-lakewood',
    icon: <DevicePhoneMobileIcon className="h-7 w-7" />,
  },
];
