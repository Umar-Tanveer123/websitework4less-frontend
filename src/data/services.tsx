import type { ReactNode } from 'react';
import {
  ChartBarIcon,
  CodeIcon,
  DevicePhoneMobileIcon,
  MagnifyingGlassIcon,
  PaletteIcon,
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
      'We create technically sound websites with responsive layouts, reliable functionality, fast performance, and a structure that supports both users and future growth.',
    path: '/web-development-nj',
    icon: <CodeIcon className="h-7 w-7" />,
  },
  {
    id: 'web-design',
    title: 'Web Design',
    description:
      'Your website should communicate your value within seconds. We create clean, intuitive designs that reflect your brand while making it easier for visitors to navigate and take action.',
    path: '/web-design-nj',
    icon: <PaletteIcon className="h-7 w-7" />,
  },
  {
    id: 'seo',
    title: 'Search Engine Optimization (SEO)',
    description:
      'Our SEO campaigns focus on improving organic visibility, attracting relevant search traffic, and building a stronger foundation for sustainable online growth.',
    path: '/seo-nj',
    icon: <MagnifyingGlassIcon className="h-7 w-7" />,
  },
  {
    id: 'local-seo',
    title: 'Local SEO',
    description:
      "We help businesses strengthen their visibility in local search so nearby customers can find the services and products they need when they're ready to act.",
    path: '/local-seo-nj',
    icon: <MagnifyingGlassIcon className="h-7 w-7" />,
  },
  {
    id: 'ppc',
    title: 'Pay Per Click (PPC) Marketing',
    description:
      'Targeted PPC campaigns connect your business with people actively searching for relevant products and services while keeping campaign performance measurable.',
    path: '/ppc-management-nj',
    icon: <ChartBarIcon className="h-7 w-7" />,
  },
  {
    id: 'social-media-marketing',
    title: 'Social Media Marketing (SMM)',
    description:
      'We develop social strategies that increase brand visibility, encourage meaningful engagement, and give your business a consistent presence across relevant platforms.',
    path: '/social-media-marketing-nj',
    icon: <DevicePhoneMobileIcon className="h-7 w-7" />,
  },
];
