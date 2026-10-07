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

export const lakewoodServices: Service[] = [
  {
    id: 'web-development',
    title: 'Web Development',
    description:
      'Custom-built websites focused on performance, security, scalability, and seamless user experiences.',
    path: '/nj/ocean-county/web-development-lakewood',
    icon: <CodeIcon className="h-7 w-7" />,
  },
  {
    id: 'web-design',
    title: 'Web Design',
    description:
      'Modern, responsive, and user-friendly website designs created to engage visitors and strengthen your brand.',
    path: '/nj/ocean-county/web-design-lakewood',
    icon: <PaletteIcon className="h-7 w-7" />,
  },
  {
    id: 'ecommerce-development',
    title: 'eCommerce Development',
    description:
      'Powerful eCommerce solutions designed to streamline online selling, improve performance, and drive business growth.',
    path: '/nj/ocean-county/ecommerce-web-development-lakewood',
    icon: <ShoppingBagIcon className="h-7 w-7" />,
  },
  {
    id: 'ecommerce-website-design',
    title: 'eCommerce Website Design',
    description:
      'Conversion-focused eCommerce designs that make online shopping simple, intuitive, and engaging.',
    path: '/nj/ocean-county/ecommerce-web-design-lakewood',
    icon: <DevicePhoneMobileIcon className="h-7 w-7" />,
  },
  {
    id: 'seo',
    title: 'Search Engine Optimization (SEO)',
    description:
      'Data-driven SEO strategies that improve search visibility, attract qualified traffic, and grow your business online.',
    path: '/nj/ocean-county/seo-lakewood',
    icon: <MagnifyingGlassIcon className="h-7 w-7" />,
  },
  {
    id: 'local-seo',
    title: 'Local SEO',
    description:
      'Local search optimization that helps your business appear in front of nearby customers searching for your services.',
    path: '/nj/ocean-county/local-seo-company-lakewood',
    icon: <MagnifyingGlassIcon className="h-7 w-7" />,
  },
  {
    id: 'ppc',
    title: 'Pay Per Click (PPC) Marketing',
    description:
      'Targeted PPC campaigns designed to reach the right audience, generate qualified leads, and maximize your advertising budget.',
    path: '/nj/ocean-county/ppc-management-lakewood',
    icon: <ChartBarIcon className="h-7 w-7" />,
  },
  {
    id: 'social-media-marketing',
    title: 'Social Media Marketing (SMM)',
    description:
      'Strategic social media campaigns that build brand awareness, engage your audience, and drive meaningful business results.',
    path: '/nj/ocean-county/social-media-marketing-lakewood',
    icon: <DevicePhoneMobileIcon className="h-7 w-7" />,
  },
];
