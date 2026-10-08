import { useState, useEffect, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import ProjectCarousel from '../components/ProjectCarousel';
import SectionWrapper from '../components/SectionWrapper';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import Card from '../components/Card';
import { AnimatedSection, useStaggerReveal } from '../hooks/useAnimations';
import { usePageSeo } from '../hooks/usePageSeo';
import { services } from '../data/services';
import { projects } from '../data/portfolio';
import { newJerseyServiceAreas } from '../data/newJerseyServiceAreas';
import {
  ChatBubbleIcon,
  LightBulbIcon,
  WrenchScrewdriverIcon,
  RocketLaunchIcon,
  ArrowRightIcon,
  CheckCircleIcon,
} from '../components/Icons';
import { motion, AnimatePresence } from 'framer-motion';
import TestimonialCarousel from '../components/TestimonialCarousel';

const processSteps = [
  {
    step: '01',
    icon: <ChatBubbleIcon className="h-7 w-7" />,
    title: 'Discovery & Consultation',
    description:
      'We start by learning about your business, customers, competitors, current online presence, and the results you want to achieve. This gives our digital marketing consultant in New Jersey the information needed to recommend the right direction.',
  },
  {
    step: '02',
    icon: <LightBulbIcon className="h-7 w-7" />,
    title: 'Planning & Creative Direction',
    description:
      'Once we understand your requirements, we establish the structure, messaging, visual direction, marketing priorities, and functionality needed for the project.',
  },
  {
    step: '03',
    icon: <WrenchScrewdriverIcon className="h-7 w-7" />,
    title: 'Build & Implementation',
    description:
      'Our development and marketing teams turn the strategy into a working digital experience using modern tools, responsive design principles, and performance-focused practices.',
  },
  {
    step: '04',
    icon: <RocketLaunchIcon className="h-7 w-7" />,
    title: 'Launch, Measure & Improve',
    description:
      'Before launch, we test the completed work across key devices and user experiences. Once live, we can continue supporting your digital presence and identify opportunities for ongoing improvement.',
  },
];



const clientLogos = [
  'Barbux Barter',
  'Ajlead',
  'Menachems Dips',
  'Vipn Lines',
  'Mjenzi',
  'Ngpm',
  'Jrv International',
];

const stats = [
  { value: '200+', label: 'Projects Delivered' },
  { value: '50', label: 'States Served' },
  { value: '3+', label: 'Years Experience' },
  { value: '50+', label: 'Team Members' },
];

const whyChooseUs = [
  {
    title: 'Quick Project Turnarounds',
    description:
      'We understand that waiting months for a website can delay your plans. Many projects can be completed within 7 to 14 days, depending on their scope and requirements.',
  },
  {
    title: 'Pricing You Can Understand',
    description:
      "You shouldn't have to decode complicated agency packages to understand your investment. We provide straightforward pricing and clear expectations before work begins.",
  },
  {
    title: 'Flexible Ways to Pay',
    description:
      "Getting your business online shouldn't require a large upfront expense. Our flexible payment options make it easier to start your project while managing your budget.",
  },
  {
    title: '30-Day Money-Back Guarantee',
    description:
      'We stand behind the work we deliver. Our 30-day money-back guarantee provides an additional layer of confidence when starting your project with us.',
  },
  {
    title: 'Responsive Communication',
    description:
      "Questions shouldn't sit unanswered for days. Our team stays accessible throughout the project so you can receive updates and get the information you need.",
  },
];

const homeFaqs: { q: string; a: string; link?: { anchor: string; to: string } }[] = [
  {
    q: 'What does a digital marketing agency in New Jersey do?',
    a: 'A digital marketing agency helps businesses promote their products or services through online channels such as websites, search engines, paid advertising, social media, and local search. The specific strategy depends on the business, audience, competition, and growth objectives.',
  },
  {
    q: 'Which digital marketing services does Website Work 4 Less provide?',
    a: 'Our services include web design, web development, eCommerce development, SEO, local SEO, PPC marketing, and social media marketing. Businesses can use individual services or combine multiple solutions as part of a broader online growth strategy.',
  },
  {
    q: 'How long does it take to see results from digital marketing in New Jersey?',
    a: 'The timeline depends on the service and starting point. Website improvements can create immediate usability benefits, while SEO typically requires consistent work over time. Paid advertising may generate traffic and leads sooner, depending on targeting, budget, offer, and campaign setup.',
  },
  {
    q: 'Is digital marketing useful for small businesses in New Jersey?',
    a: "Yes. Small businesses can use online marketing to build local visibility, attract targeted traffic, generate inquiries, and compete for attention in their market. The strategy should match the company's budget, customer base, location, and specific business goals.",
  },
  {
    q: 'How much does digital marketing cost in New Jersey?',
    a: 'There is no single price because digital marketing requirements vary significantly. Costs depend on factors such as the services involved, website scope, advertising budget, competition, and level of ongoing management. A tailored plan provides a more useful estimate than a standard package.',
  },
  {
    q: 'Do I need SEO and PPC at the same time?',
    a: 'Not necessarily. SEO and PPC serve different purposes. SEO focuses on building organic visibility, while PPC provides paid opportunities to appear in search results and other advertising placements. Depending on your goals, one or both may form part of your marketing strategy.',
  },
  {
    q: 'Can you help improve an existing website instead of building a new one?',
    a: 'Yes. A complete rebuild is not always necessary. Depending on the condition of your current website, improvements may include redesigning key pages, improving mobile usability, strengthening calls to action, increasing speed, updating content, or addressing technical issues.',
  },
  {
    q: 'Why should I work with a New Jersey digital marketing agency?',
    a: 'Working with a New Jersey digital marketing agency can provide access to multiple digital capabilities through one team. This can make it easier to maintain consistent messaging across your website, SEO, advertising, and other online channels while keeping the strategy aligned with your business objectives.',
  },
];

const HOME_SEO = {
  title: 'Digital Marketing Agency in New Jersey | Website Work 4 Less',
  description:
    'Website Work 4 Less is the trusted digital marketing agency in New Jersey. Grow your business with web design & development, SEO, PPC & social media services.',
  keywords: [
    'digital marketing agency nj',
    'digital marketing nj',
    'digital marketing agency new jersey',
    'new jersey digital marketing company',
    'digital marketing company nj',
    'digital marketing agency in new jersey',
    'digital marketing new jersey',
    'nj digital marketing',
    'digital marketing company new jersey',
    'new jersey digital marketing agency',
    'digital marketing consultant nj',
    'digital marketing services nj',
    'nj digital marketing agency',
    'internet marketing company nj',
    'online marketing new jersey',
  ],
};

const HOME_SCHEMA_DESCRIPTION = [
  'WebsiteWork4Less is a trusted digital marketing agency nj and digital marketing company nj providing professional digital marketing services nj to businesses across New Jersey. As an experienced digital marketing agency new jersey, we help businesses build a strong online presence, improve search visibility, attract qualified customers, and achieve sustainable growth through strategic SEO, website development, online marketing, and customized digital solutions.',
  'Our digital marketing nj services are available throughout New Jersey, including businesses across Essex County, Hudson County, Bergen County, Passaic County, Morris County, Sussex County, Warren County, Union County, Middlesex County, Somerset County, Mercer County, Monmouth County, Ocean County, Camden County, Burlington County, and Atlantic County.',
  "As a new jersey digital marketing company, digital marketing company new jersey, and new jersey digital marketing agency, WebsiteWork4Less provides tailored strategies based on each business's goals, target audience, and competitive market. Our team works with businesses looking for an experienced digital marketing agency in new jersey to improve their online reach and generate meaningful results.",
  "Whether you need a digital marketing consultant nj, digital marketing services nj, nj digital marketing agency, or an internet marketing company nj, our team provides solutions designed to help businesses compete and grow in today's digital landscape. We also offer online marketing new jersey strategies to help businesses strengthen their brand visibility, reach local customers, increase website traffic, and build long-term digital growth.",
  "WebsiteWork4Less is committed to delivering effective nj digital marketing solutions for businesses throughout New Jersey and its major counties, providing practical, results-focused digital marketing strategies tailored to each client's unique requirements.",
].join(' ');


const homeFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: homeFaqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const homePageSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://websitework4less.com/#organization',
  name: 'Website Work 4 Less',
  url: 'https://websitework4less.com/',
  image: 'https://websitework4less.com/projects/project5.png',
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
  areaServed: newJerseyServiceAreas,
  description: HOME_SCHEMA_DESCRIPTION,
  keywords: HOME_SEO.keywords.join(', '),
  foundingDate: '2023',
  slogan: 'Crafting the Future of Web',
  priceRange: '$$',
  openingHours: 'Mo-Fr 00:00-23:59',
  serviceType: [
    'Digital Marketing',
    'Digital Marketing Consulting',
    'Internet Marketing',
    'Online Marketing',
    'SEO Services',
    'Web Design',
    'Web Development',
    'React Development',
    'Custom Software Development',
    'E-Commerce Solutions',
    'UI/UX Design',
    'Responsive Web Design',
    'Website Maintenance',
    'AI Web Solutions',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Digital Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Web Design Services' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Web Development Services' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Digital Marketing Services' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'SEO Services' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom Software Development' } },
    ],
  },
};

const homeSupportingSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': 'https://websitework4less.com/#digital-marketing-service',
      name: 'Digital Marketing Services',
      serviceType: 'Digital Marketing',
      url: 'https://websitework4less.com/',
      description: HOME_SCHEMA_DESCRIPTION,
      keywords: HOME_SEO.keywords.join(', '),
      provider: { '@id': 'https://websitework4less.com/#organization' },
      areaServed: newJerseyServiceAreas,
    },
    {
      '@type': 'WebPage',
      '@id': 'https://websitework4less.com/#webpage',
      url: 'https://websitework4less.com/',
      name: HOME_SEO.title,
      description: HOME_SEO.description,
      keywords: HOME_SEO.keywords.join(', '),
      about: { '@id': 'https://websitework4less.com/#organization' },
      mainEntity: { '@id': 'https://websitework4less.com/#digital-marketing-service' },
      breadcrumb: { '@id': 'https://websitework4less.com/#breadcrumb' },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://websitework4less.com/#breadcrumb',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://websitework4less.com/',
        },
      ],
    },
  ],
};

export default function HomePage() {
  usePageSeo(HOME_SEO);
  const [servicesRef, serviceVisible] = useStaggerReveal(services.length, 100);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Homepage schemas belong in the head and are removed when the SPA route changes.
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'home-page-schema';
    script.textContent = JSON.stringify(homePageSchema);
    document.head.appendChild(script);

    const faqScript = document.createElement('script');
    faqScript.type = 'application/ld+json';
    faqScript.id = 'home-faq-schema';
    faqScript.textContent = JSON.stringify(homeFaqSchema);
    document.head.appendChild(faqScript);

    const supportingScript = document.createElement('script');
    supportingScript.type = 'application/ld+json';
    supportingScript.id = 'home-supporting-schema';
    supportingScript.textContent = JSON.stringify(homeSupportingSchema);
    document.head.appendChild(supportingScript);

    return () => {
      document.getElementById('home-page-schema')?.remove();
      document.getElementById('home-faq-schema')?.remove();
      document.getElementById('home-supporting-schema')?.remove();
    };
  }, []);

  return (
    <>
      {/* ==================== HERO ==================== */}
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32 bg-transparent">
        {/* Cinematic Background Mesh (Section 1 - Hero) */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-20%] right-[-10%] h-[1000px] w-[1000px] rounded-full bg-accent/10 blur-[180px] opacity-40"
          />
          <motion.div
            animate={{
              x: [0, -80, 0],
              y: [0, -100, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[-30%] left-[-20%] h-[1200px] w-[1200px] rounded-full bg-accent-light/5 blur-[200px] opacity-30"
          />
          <div className="absolute top-[20%] left-[10%] h-[600px] w-[600px] rounded-full bg-accent/5 blur-[150px] opacity-20" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Left Content */}
            <AnimatedSection animation="slide-in-left">
              <span className="mb-6 inline-block rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
                Website Work 4 Less
              </span>
              <h1 className="text-3xl font-medium leading-[1.1] text-text-primary sm:text-4xl lg:text-5xl">
                Grow Your Business With{' '}
                <span className="text-accent">Digital Marketing Agency in New Jersey</span>
              </h1>
              <div className="mt-8 space-y-4 text-lg leading-relaxed text-text-secondary">
                <p>
                  Your website should do more than exist online. It should help people discover your business,
                  understand what you offer, and take the next step.
                </p>
                <p>
                  At Website Work 4 Less, we combine web development, SEO, paid advertising, social media, and
                  conversion-focused design to build digital experiences that support real business growth. Whether
                  you're launching a new brand or improving an established online presence, our team creates practical
                  solutions around your goals.
                </p>
                <p>
                  Our approach to digital marketing in New Jersey brings strategy, technology, and creative execution together
                  under one roof.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button as="link" to="/contact" size="lg">
                  Start Your Project
                  <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
                <Button as="link" to="/portfolio" variant="outline" size="lg">
                  View Our Work
                </Button>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slide-in-right" delay={200}>
              <motion.div
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative z-20"
              >
                {/* Background Glow Backdrop */}
                <div className="absolute inset-0 bg-accent/20 blur-[120px] -z-10 animate-pulse" />
                {/* Orbital Floating Cards */}
                <motion.div
                  animate={{ y: [0, 20, 0], x: [0, -5, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-12 -left-12 w-32 md:w-48 bg-surface/40 backdrop-blur-2xl border border-white/10 p-5 rounded-2xl shadow-2xl z-30 hidden lg:block"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/20 text-accent">
                      <RocketLaunchIcon className="h-4 w-4" />
                    </div>
                    <div className="space-y-1">
                      <div className="h-1.5 w-12 bg-accent/30 rounded-full" />
                      <div className="h-1.5 w-8 bg-text-muted/20 rounded-full" />
                    </div>
                  </div>
                  <div className="text-xl font-bold text-text-primary">+124%</div>
                  <div className="text-[10px] text-text-muted uppercase tracking-tighter">Monthly Growth</div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, -25, 0], x: [0, 10, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-10 -right-10 w-28 md:w-44 bg-surface/40 backdrop-blur-2xl border border-white/10 p-5 rounded-2xl shadow-2xl z-30 hidden lg:block"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <div className="h-1.5 w-20 bg-text-muted/20 rounded-full" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 w-full bg-border/50 rounded-full" />
                    <div className="h-2 w-3/4 bg-border/50 rounded-full" />
                  </div>
                  <div className="mt-3 text-[10px] font-bold text-accent uppercase">Live Analytics</div>
                </motion.div>
                {/* Browser frame */}
                <div className="rounded-2xl border border-border bg-surface shadow-2xl shadow-accent/10 overflow-hidden">
                  {/* Browser toolbar */}
                  <div className="flex items-center gap-2 border-b border-border bg-surface-alt px-4 py-3">
                    <div className="flex gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-red-400" />
                      <div className="h-3 w-3 rounded-full bg-yellow-400" />
                      <div className="h-3 w-3 rounded-full bg-green-400" />
                    </div>
                    <div className="ml-4 flex-1 rounded-lg bg-surface-muted px-3 py-1.5">
                      <span className="text-xs text-text-muted">
                        https://yourwebsite.com
                      </span>
                    </div>
                  </div>
                  {/* Dashboard content */}
                  <div className="bg-surface-alt p-6">
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {[
                        { label: 'Visitors', value: '24.5K', change: '+12%' },
                        { label: 'Conversions', value: '1,234', change: '+8%' },
                        { label: 'Revenue', value: '$48.2K', change: '+23%' },
                      ].map((stat) => (
                        <div
                          key={stat.label}
                          className="rounded-xl bg-surface p-4 border border-border"
                        >
                          <p className="text-xs text-text-muted">{stat.label}</p>
                          <p className="mt-1 text-lg font-bold text-text-primary">
                            {stat.value}
                          </p>
                          <span className="text-xs font-medium text-green-500">
                            {stat.change}
                          </span>
                        </div>
                      ))}
                    </div>
                    {/* Chart placeholder */}
                    <div className="rounded-xl bg-surface p-4 border border-border">
                      <div className="mb-3 flex items-center justify-between">
                        <span className="text-sm font-semibold text-text-primary">
                          Performance
                        </span>
                        <span className="text-xs text-text-muted">Last 7 days</span>
                      </div>
                      <div className="flex items-end gap-2 h-24">
                        {[40, 65, 45, 80, 55, 90, 75].map((h, i) => (
                          <div
                            key={i}
                            className="flex-1 rounded-t-md bg-accent/20 transition-all duration-300 hover:bg-accent/40"
                            style={{ height: `${h}%` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute -right-4 -bottom-4 rounded-xl border border-border bg-surface p-3 shadow-lg animate-float hidden sm:block">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                      <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-text-primary">+23%</p>
                      <p className="text-[10px] text-text-muted">Growth</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ==================== TRUSTED BY ==================== */}
      <section className="border-y border-border bg-surface/50 py-10 lg:py-12 backdrop-blur-sm relative overflow-hidden">
        {/* Gradient Masks for smooth fade */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-surface to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-surface to-transparent z-10" />

        <div className="mx-auto max-w-7xl">
          <p className="mb-10 text-center text-[10px] font-bold uppercase tracking-[0.4em] text-text-muted/60">
            Trusted by industry leaders nationwide
          </p>

          <div className="flex overflow-hidden group">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear"
              }}
              className="flex items-center gap-16 whitespace-nowrap"
            >
              {[...clientLogos, ...clientLogos].map((name, i) => (
                <span
                  key={`${name}-${i}`}
                  className="text-xl md:text-2xl font-black text-text-muted/20 transition-all duration-500 hover:text-accent/40 hover:scale-110 cursor-default"
                >
                  {name}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== MORE THAN A MARKETING COMPANY ==================== */}
      <SectionWrapper background="transparent">
        <div className="mx-auto max-w-3xl">
          <AnimatedSection>
            <SectionHeading
              label="Under One Roof"
              title="Everything You Need to Build a Stronger Online Presence"
              align="left"
            />
            <div className="space-y-4 text-lg leading-relaxed text-text-secondary">
              <p>
                A successful digital presence is rarely the result of one service working alone. Your website,
                search visibility, advertising, social channels, and customer experience all influence how people
                discover and interact with your business.
              </p>
              <p>
                As a digital marketing agency in New Jersey,{' '}
                <Link to="/about" className="font-semibold text-accent hover:text-accent-hover">
                  Website Work 4 Less
                </Link>{' '}
                brings these elements together so your marketing efforts have a consistent direction.
              </p>
            </div>
            <p className="mt-6 mb-4 text-lg font-semibold text-text-primary">
              Here's how we help businesses move forward:
            </p>
            <ul className="space-y-4">
              {[
                'Websites developed around usability, speed, mobile performance, and conversions.',
                'SEO strategies designed to improve visibility for searches that matter to your business.',
                'Paid campaigns that put your offers in front of relevant audiences.',
                'Social media strategies that keep your brand active and connected with potential customers.',
                'Ongoing optimization and support as your business, audience, and goals evolve.',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-text-secondary leading-relaxed">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <CheckCircleIcon className="h-4 w-4" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-lg leading-relaxed text-text-secondary">
              You don't need to coordinate several disconnected providers to manage your online presence. Our team
              gives you access to the skills needed to build, promote, and improve your digital ecosystem from one
              place.
            </p>
          </AnimatedSection>
        </div>
      </SectionWrapper>

      {/* ==================== SERVICES ==================== */}
      <SectionWrapper id="services" background="transparent">
        <AnimatedSection>
          <SectionHeading
            label="Our Digital Marketing Services"
            title="Digital Solutions Designed Around Your Growth"
            description="From your first website build to ongoing search and advertising campaigns, our digital marketing services in New Jersey are designed to address the different stages of your online growth."
          />
        </AnimatedSection>

        {/* Background Glow (Section 3 - Services) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1000px] h-[600px] bg-accent/[0.08] blur-[160px] rounded-full pointer-events-none -z-10" />

        <div ref={servicesRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`transition-all duration-500 ${serviceVisible[i]
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
                }`}
            >
              <Link to={service.path} className="block h-full" aria-label={`Learn more about ${service.title}`}>
                <Card
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  className="h-full"
                >
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-accent">
                    Learn more
                    <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* ==================== PROCESS ==================== */}
      <SectionWrapper id="process" background="transparent">
        <AnimatedSection>
          <SectionHeading
            label="From First Conversation to Final Launch"
            title="A Clear Process for Building Your Digital Presence"
            description="Good digital work starts with understanding the business behind it. Our four-stage process keeps communication clear while giving every project a defined direction."
          />
        </AnimatedSection>        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="relative group text-center"
            >
              {/* Connector line (desktop) */}
              {i < processSteps.length - 1 && (
                <div className="absolute top-12 left-1/2 hidden h-[2px] w-full bg-border lg:block overflow-hidden">
                  <motion.div
                    initial={{ x: "-100%" }}
                    whileInView={{ x: "0%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.2 + 0.5, ease: "easeInOut" }}
                    className="h-full w-full bg-gradient-to-r from-accent/40 to-accent relative"
                  >
                    <motion.div
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1.5 }}
                      className="absolute inset-0 w-24 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                    />
                  </motion.div>
                </div>
              )}

              {/* Step Icon Container */}
              <div className="relative mx-auto mb-8 flex h-24 w-24 items-center justify-center">
                {/* Background Glow */}
                <div className="absolute inset-0 bg-accent/5 rounded-3xl blur-xl group-hover:bg-accent/15 transition-all duration-500 scale-110" />

                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
                  className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-surface border border-border shadow-xl group-hover:border-accent/50 transition-colors duration-500 z-10"
                >
                  <span className="absolute -top-3 -right-3 flex h-9 w-9 items-center justify-center rounded-full bg-accent text-[10px] font-black text-white shadow-lg border-2 border-surface group-hover:scale-110 transition-transform duration-500">
                    {step.step}
                  </span>
                  <div className="text-accent group-hover:scale-110 transition-transform duration-500">
                    {step.icon}
                  </div>
                </motion.div>
              </div>

              {/* Content */}
              <div className="px-4">
                <h3 className="mb-3 text-xl font-bold text-text-primary tracking-tight group-hover:text-accent transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* ==================== PORTFOLIO ==================== */}
      <SectionWrapper id="portfolio" background="transparent">
        <AnimatedSection>
          <SectionHeading
            label="See What We've Built"
            title="Digital Experiences Created for Real Businesses"
            description="Our portfolio reflects work completed across different industries, business models, and digital requirements. Explore examples of our design, development, and branding capabilities."
          />
        </AnimatedSection>

        {/* Background Glow (Section 5 - Portfolio) */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/[0.07] blur-[150px] rounded-full pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/[0.05] blur-[120px] rounded-full pointer-events-none -z-10" />

        <AnimatedSection animation="fade-in" delay={200}>
          <ProjectCarousel projects={projects} />
        </AnimatedSection>

        <div className="mt-4 text-center">
          <Button as="link" to="/portfolio" variant="outline">
            View All Projects
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </SectionWrapper>

      {/* ==================== ABOUT PREVIEW / STATS ==================== */}
      <SectionWrapper background="transparent">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <AnimatedSection animation="slide-in-left">
            <span className="mb-3 inline-block rounded-full bg-accent/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-accent">
              Meet the Team Behind the Work
            </span>
            <h2 className="text-3xl font-bold sm:text-4xl text-text-primary leading-tight">
              A Digital Partner Focused on Your Business Goals
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-text-secondary">
              Website Work 4 Less brings technical expertise, creative thinking, and marketing knowledge together
              to help businesses strengthen their online presence. With 3+ years of experience and hundreds of
              completed projects, our team works with businesses at different stages of growth. We do not believe in
              delivering a website and walking away. Our goal is to create digital assets that continue to support
              your business after launch. From website development and design to search optimization and paid
              marketing, we help businesses build an online presence with a clear purpose.
            </p>
            <Button as="link" to="/about" variant="ghost" className="mt-6 !px-0">
              Learn More About Us
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Button>
          </AnimatedSection>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <motion.div
                  animate={{
                    y: [0, -12, 0],
                  }}
                  transition={{
                    duration: 8 + i * 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative group cursor-default p-[1px] rounded-2xl bg-gradient-to-br from-accent/40 via-accent/5 to-accent/40"
                >
                  {/* Background Gradient Glow (Constant) */}
                  <div className="absolute inset-0 bg-accent/5 blur-xl rounded-2xl" />

                  <div className="relative h-full rounded-[calc(1rem-1px)] bg-surface p-6 text-center transition-all duration-300 group-hover:bg-surface-alt group-hover:shadow-2xl">
                    <p className="text-3xl font-extrabold text-accent lg:text-4xl transition-transform duration-500 group-hover:scale-110">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-sm font-medium text-text-secondary">
                      {stat.label}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ==================== WHY CHOOSE US ==================== */}
      <section className="relative py-24 bg-surface-alt border-y border-border overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--color-accent)_0%,_transparent_45%)] opacity-5" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeading
              label="Why Businesses Choose Website Work 4 Less"
              title="Practical Digital Marketing Without the Agency Runaround"
              description="Choosing a New Jersey digital marketing company is about more than finding people who know how to build websites or run campaigns. You need a team that communicates clearly, respects your budget, and understands that your digital presence has a direct connection to your business."
            />
          </AnimatedSection>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                className="rounded-2xl border border-border bg-surface p-7 transition-colors hover:border-accent/30"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <CheckCircleIcon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-text-primary">{item.title}</h3>
                <p className="text-text-secondary leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
          <p className="mt-10 text-center text-lg leading-relaxed text-text-secondary max-w-3xl mx-auto">
            We are building the kind of digital marketing company in New Jersey businesses can turn to for websites,
            visibility, advertising, and ongoing online growth without unnecessary complexity.
          </p>
        </div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}
      <section className="relative overflow-hidden bg-transparent py-24">
        {/* Background Decorative Glow (Section 7 - Testimonials) */}
        <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-accent/10 blur-[180px] rounded-full pointer-events-none opacity-40 -z-10" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent/5 blur-[150px] rounded-full pointer-events-none opacity-30 -z-10" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeading
              label="Results That Matter to Our Clients"
              title="What Businesses Say About Working With Us"
              description="Businesses across different industries rely on Website Work 4 Less for practical digital solutions designed around visibility, customer experience, and growth."
            />
          </AnimatedSection>

          <AnimatedSection animation="fade-in" delay={200}>
            <TestimonialCarousel />
          </AnimatedSection>
        </div>
      </section>

      {/* ==================== FAQ ==================== */}
      <SectionWrapper background="transparent">
        <div className="mx-auto max-w-3xl">
          <AnimatedSection>
            <SectionHeading
              label="FAQs"
              title="Frequently Asked Questions"
            />
          </AnimatedSection>
          <div className="space-y-4">
            {homeFaqs.map((faq, i) => {
              const open = openFaq === i;
              let answer: ReactNode = faq.a;
              if (faq.link) {
                const at = faq.a.indexOf(faq.link.anchor);
                if (at >= 0) {
                  answer = (
                    <>
                      {faq.a.slice(0, at)}
                      <Link
                        to={faq.link.to}
                        className="font-semibold text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
                      >
                        {faq.link.anchor}
                      </Link>
                      {faq.a.slice(at + faq.link.anchor.length)}
                    </>
                  );
                }
              }
              return (
                <div
                  key={faq.q}
                  className="overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-accent/30"
                >
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
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
            })}
          </div>
        </div>
      </SectionWrapper>

      {/* ==================== CTA ==================== */}
      <section className="relative overflow-hidden bg-primary/20 backdrop-blur-md py-24 border-y border-border/50">
        {/* BG decoration */}
        <div className="absolute inset-0 -z-0">
          <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-text-primary sm:text-4xl lg:text-5xl leading-tight">
              Ready to Build a Stronger Digital Presence?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-text-secondary">
              Your customers are searching, comparing, browsing, and making decisions online every day. The right
              digital strategy helps your business become easier to discover and gives potential customers a better
              reason to choose you. Let's build a digital presence that works for your business, not just one that
              looks good.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button as="link" to="/contact" size="lg">
                Get Your Free Consultation
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
              <Button
                as="link"
                to="/services"
                size="lg"
                variant="outline"
              >
                Explore Services
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
