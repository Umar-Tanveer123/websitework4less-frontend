import type { ReactNode } from 'react';
import {
  CodeIcon,
  PaletteIcon,
  ShoppingBagIcon,
  ChartBarIcon,
  MagnifyingGlassIcon,
  DevicePhoneMobileIcon,
} from '../components/Icons';

export interface Service {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  icon: ReactNode;
  features: string[];
}

export const services: Service[] = [
  {
    id: 'web-dev',
    title: 'Web Development',
    description: 'Custom-built websites using cutting-edge technologies for optimal speed, security, and scalability.',
    longDescription: 'We build fast, secure, and scalable websites using React, Next.js, and modern frameworks. Every line of code is crafted for performance and maintainability.',
    icon: <CodeIcon className="h-7 w-7" />,
    features: [
      'Custom front-end & back-end development',
      'API integration & third-party services',
      'Performance optimization & caching',
      'Accessibility compliance (WCAG)',
    ],
  },
  {
    id: 'ui-ux',
    title: 'UI/UX Design',
    description: 'Thoughtfully crafted interfaces that delight users and drive conversions through intuitive design.',
    longDescription: 'Our design process focuses on user needs, creating intuitive interfaces that drive engagement and conversions while reflecting your brand identity.',
    icon: <PaletteIcon className="h-7 w-7" />,
    features: [
      'User research & persona development',
      'Wireframing & interactive prototyping',
      'Visual design & branding',
      'Usability testing & iteration',
    ],
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce Solutions',
    description: 'End-to-end online stores designed to maximize sales and deliver seamless shopping experiences.',
    longDescription: 'Complete e-commerce platforms built for conversion. From product catalogs to checkout, we handle the entire shopping experience.',
    icon: <ShoppingBagIcon className="h-7 w-7" />,
    features: [
      'Shopify, WooCommerce, custom stores',
      'Payment gateway integration',
      'Inventory management systems',
      'Order tracking & analytics',
    ],
  },
  {
    id: 'seo',
    title: 'SEO Optimization',
    description: 'Search engine optimization that puts your business in front of your ideal customers.',
    longDescription: 'Get found by the right people. Our SEO strategies are data-driven and focused on sustainable, long-term organic growth.',
    icon: <MagnifyingGlassIcon className="h-7 w-7" />,
    features: [
      'Technical SEO audits & fixes',
      'Keyword research & strategy',
      'On-page & off-page optimization',
      'Performance & Core Web Vitals',
    ],
  },
  {
    id: 'responsive',
    title: 'Responsive Design',
    description: 'Responsive designs that look stunning and perform flawlessly on every device and screen size.',
    longDescription: 'Every website we build looks and works beautifully across all devices—phones, tablets, laptops, and desktops.',
    icon: <DevicePhoneMobileIcon className="h-7 w-7" />,
    features: [
      'Mobile-first design approach',
      'Cross-browser compatibility',
      'Touch-friendly interactions',
      'Adaptive layouts & images',
    ],
  },
  {
    id: 'analytics',
    title: 'Analytics & Strategy',
    description: 'Data-driven strategies to grow your online presence and understand your users better.',
    longDescription: 'Understand your users with comprehensive analytics dashboards and actionable insights that drive business decisions.',
    icon: <ChartBarIcon className="h-7 w-7" />,
    features: [
      'Google Analytics setup & config',
      'Custom KPI dashboards',
      'Conversion tracking & funnels',
      'Monthly performance reports',
    ],
  },
  {
    id: 'custom-software',
    title: 'Custom Software Solutions',
    description: 'We do custom software to help businesses run smoothly and efficiently and be able to manage everything from one dashboard.',
    longDescription: 'We do custom software to help businesses run smoothly and efficiently and be able to manage everything from one dashboard. Like workers, jobs, orders coming in and orders going out, inventory.',
    icon: <CodeIcon className="h-7 w-7" />,
    features: [
      'Employee & Job Management',
      'Order Tracking & Processing',
      'Inventory Control Systems',
      'Centralized Business Dashboard',
    ],
  },
];
