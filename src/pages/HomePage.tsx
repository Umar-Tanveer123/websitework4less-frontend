import { useState, useEffect } from 'react';
import ProjectCarousel from '../components/ProjectCarousel';
import SectionWrapper from '../components/SectionWrapper';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import Card from '../components/Card';
import { AnimatedSection, useStaggerReveal } from '../hooks/useAnimations';
import { services } from '../data/services';
import { projects } from '../data/portfolio';
import {
  ChatBubbleIcon,
  LightBulbIcon,
  WrenchScrewdriverIcon,
  RocketLaunchIcon,
  ArrowRightIcon,
} from '../components/Icons';
import { motion, AnimatePresence } from 'framer-motion';
import TestimonialCarousel from '../components/TestimonialCarousel';

const processSteps = [
  {
    step: '01',
    icon: <ChatBubbleIcon className="h-7 w-7" />,
    title: 'Discovery',
    description:
      'We learn about your business goals, target audience, and project requirements through in-depth consultation.',
  },
  {
    step: '02',
    icon: <LightBulbIcon className="h-7 w-7" />,
    title: 'Strategy & Design',
    description:
      'Our team creates wireframes and high-fidelity designs aligned with your brand identity and user needs.',
  },
  {
    step: '03',
    icon: <WrenchScrewdriverIcon className="h-7 w-7" />,
    title: 'Development',
    description:
      'We build your site with clean, performant code using modern frameworks and best practices.',
  },
  {
    step: '04',
    icon: <RocketLaunchIcon className="h-7 w-7" />,
    title: 'Launch & Support',
    description:
      'After thorough testing, we launch your site and provide ongoing support to ensure continued success.',
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

const rotatingPhrases = [
  'Define Your Brand',
  'Drive Your Growth',
  'Scale Your Business',
  'Elevate Your Presence',
  'Deliver Real Results',
];

const stats = [
  { value: '200+', label: 'Projects Delivered' },
  { value: '50', label: 'States Served' },
  { value: '3+', label: 'Years Experience' },
  { value: '50+', label: 'Team Members' },
];

export default function HomePage() {
  const [servicesRef, serviceVisible] = useStaggerReveal(services.length, 100);
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % rotatingPhrases.length);
    }, 3000);
    return () => clearInterval(timer);
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
                Professional Web Development
              </span>
              <h1 className="text-3xl font-medium leading-[1.1] text-text-primary sm:text-4xl lg:text-5xl">
                <span className="text-accent">W</span>ebsites That
                <br />
                <div className="relative inline-block mt-4 min-h-[1.5em] w-full">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={phraseIndex}
                      initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute left-0 font-medium bg-gradient-to-r from-accent via-accent-light to-accent bg-[length:200%_auto] animate-gradient-x bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                    >
                      {rotatingPhrases[phraseIndex]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </h1>
              <div className="mt-8 space-y-6 text-lg leading-relaxed text-text-secondary">
                <p className="border-l-4 border-accent/20 pl-6 py-2 bg-accent/5 rounded-r-2xl italic">
                  "We partner with ambitious businesses to design and develop exceptional digital experiences—crafted to elevate your brand, attract the right audience, and deliver measurable results."
                </p>
                <div className="space-y-4">
                  <p>
                    From bespoke websites to advanced custom software, every project is built with precision, strategy, and a deep understanding of what drives trust and conversion.
                  </p>
                  <p>
                    Our work goes beyond aesthetics. We create websites that feel seamless, look unmistakably professional, and instantly establish credibility.
                  </p>
                </div>
                <div className="flex items-center gap-4 rounded-2xl bg-surface-alt p-4 border border-border/50">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <RocketLaunchIcon className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-medium">
                    <span className="text-accent font-bold">Flexible Payments:</span> Launch now, pay over time with no upfront commitment.
                  </p>
                </div>
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

      {/* ==================== SERVICES ==================== */}
      <SectionWrapper id="services" background="transparent">
        <AnimatedSection>
          <SectionHeading
            label="What We Do"
            title="Strategic Services for Lasting Growth"
            description="We provide end-to-end web development and digital solutions, engineered to strengthen your presence, attract the right audience, and accelerate your growth online."
          />
        </AnimatedSection>

        {/* Background Glow (Section 3 - Services) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1000px] h-[600px] bg-accent/[0.08] blur-[160px] rounded-full pointer-events-none -z-10" />

        <div ref={servicesRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`transition-all duration-500 ${
                serviceVisible[i]
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <Card
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* ==================== PROCESS ==================== */}
      <SectionWrapper id="process" background="transparent">
        <AnimatedSection>
          <SectionHeading
            label="Our Process"
            title="How We Bring Your Vision to Life"
            description="A proven four-step process that ensures every project is delivered on time, on budget, and beyond expectations."
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
            label="Our Work"
            title="Projects That Speak for Themselves"
            description="A selection of recent projects showcasing our expertise across different industries and technologies."
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
              About Us
            </span>
            <h2 className="text-3xl font-bold sm:text-4xl text-text-primary leading-tight">
              A Team Dedicated to Your Digital Success
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-text-secondary">
              With 3+ years of experience, we've helped hundreds of
              businesses transform their online presence. Our team combines
              technical excellence with creative vision to deliver websites that
              not only look great but perform exceptionally.
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

      {/* ==================== TESTIMONIALS ==================== */}
      <section className="relative overflow-hidden bg-transparent py-24">
        {/* Background Decorative Glow (Section 7 - Testimonials) */}
        <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-accent/10 blur-[180px] rounded-full pointer-events-none opacity-40 -z-10" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent/5 blur-[150px] rounded-full pointer-events-none opacity-30 -z-10" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeading
              label="Success Stories"
              title="What Our Clients Say"
              description="Trusted by businesses nationwide to deliver exceptional results and measurable growth through strategic web development."
            />
          </AnimatedSection>

          <AnimatedSection animation="fade-in" delay={200}>
            <TestimonialCarousel />
          </AnimatedSection>
        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <section className="relative overflow-hidden bg-primary/20 backdrop-blur-md py-24 border-y border-border/50">
        {/* BG decoration */}
        <div className="absolute inset-0 -z-0">
          <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-text-primary sm:text-4xl lg:text-5xl leading-tight">
              Ready to Transform Your
              <br />
              Online Presence?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-text-secondary">
              Let's discuss your project and discover how we can help your business
              grow with a website that works as hard as you do.
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
