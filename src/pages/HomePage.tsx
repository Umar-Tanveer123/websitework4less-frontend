import SectionWrapper from '../components/SectionWrapper';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import Card from '../components/Card';
import PortfolioGridItem from '../components/PortfolioGridItem';
import { AnimatedSection, useStaggerReveal } from '../hooks/useAnimations';
import { services } from '../data/services';
import { projects } from '../data/portfolio';
import { testimonials } from '../data/testimonials';
import {
  ChatBubbleIcon,
  LightBulbIcon,
  WrenchScrewdriverIcon,
  RocketLaunchIcon,
  ArrowRightIcon,
} from '../components/Icons';

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

const stats = [
  { value: '200+', label: 'Projects Delivered' },
  { value: '50', label: 'States Served' },
  { value: '3+', label: 'Years Experience' },
  { value: '50+', label: 'Team Members' },
];

export default function HomePage() {
  const [servicesRef, serviceVisible] = useStaggerReveal(services.length, 100);
  const [processRef, processVisible] = useStaggerReveal(processSteps.length, 150);
  const [portfolioRef, portfolioVisible] = useStaggerReveal(4, 100);

  return (
    <>
      {/* ==================== HERO ==================== */}
      <section className="relative overflow-hidden bg-surface pt-32 pb-20 lg:pt-40 lg:pb-32">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-accent/5 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-accent/3 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Left Content */}
            <AnimatedSection animation="slide-in-left">
              <span className="mb-6 inline-block rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
                Professional Web Development
              </span>
              <h1 className="text-3xl font-extrabold leading-[1.1] text-text-primary sm:text-4xl lg:text-5xl">
                <span className="bg-gradient-to-r from-accent via-blue-400 to-accent bg-[length:200%_auto] animate-gradient-x bg-clip-text text-transparent">
                  Websites That Define Your Brand
                </span>
                <br />
                <span className="relative inline-block mt-2">
                  and Drive Growth
                  <svg
                    className="absolute -bottom-2 left-0 w-full text-accent/30"
                    viewBox="0 0 200 8"
                    fill="none"
                  >
                    <path
                      d="M1 5.5Q50 1 100 5.5T199 5.5"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
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

            {/* Right - Dashboard Mockup */}
            <AnimatedSection animation="slide-in-right" delay={200}>
              <div className="relative">
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
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ==================== TRUSTED BY ==================== */}
      <section className="border-y border-border bg-surface-alt py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <p className="mb-8 text-center text-sm font-medium uppercase tracking-wider text-text-muted">
              Trusted by companies nationwide
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
              {clientLogos.map((name) => (
                <span
                  key={name}
                  className="text-lg font-bold text-text-muted/40 transition-colors duration-300 hover:text-text-muted/70"
                >
                  {name}
                </span>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ==================== SERVICES ==================== */}
      <SectionWrapper id="services" background="white">
        <AnimatedSection>
          <SectionHeading
            label="What We Do"
            title="Strategic Services for Lasting Growth"
            description="We provide end-to-end web development and digital solutions, engineered to strengthen your presence, attract the right audience, and accelerate your growth online."
          />
        </AnimatedSection>

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
      <SectionWrapper id="process" background="light">
        <AnimatedSection>
          <SectionHeading
            label="Our Process"
            title="How We Bring Your Vision to Life"
            description="A proven four-step process that ensures every project is delivered on time, on budget, and beyond expectations."
          />
        </AnimatedSection>

        <div ref={processRef} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <div
              key={step.step}
              className={`relative text-center transition-all duration-500 ${
                processVisible[i]
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              {/* Connector line (desktop) */}
              {i < processSteps.length - 1 && (
                <div className="absolute top-12 left-[60%] hidden h-0.5 w-[calc(100%-20%)] bg-border lg:block" />
              )}

              <div className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-surface border border-border shadow-md">
                <span className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-xs font-bold text-white shadow-md">
                  {step.step}
                </span>
                <span className="text-accent">{step.icon}</span>
              </div>
              <h3 className="mb-2 text-xl font-bold text-text-primary">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-text-secondary">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* ==================== PORTFOLIO ==================== */}
      <SectionWrapper id="portfolio">
        <AnimatedSection>
          <SectionHeading
            label="Our Work"
            title="Projects That Speak for Themselves"
            description="A selection of recent projects showcasing our expertise across different industries and technologies."
          />
        </AnimatedSection>

        <div ref={portfolioRef} className="grid gap-6 sm:grid-cols-2">
          {projects.slice(0, 4).map((item, i) => (
            <div
              key={item.title}
              className={`transition-all duration-700 ease-out ${
                portfolioVisible[i]
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              }`}
            >
              <PortfolioGridItem {...item} />
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button as="link" to="/portfolio" variant="outline">
            View All Projects
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </SectionWrapper>

      {/* ==================== ABOUT PREVIEW / STATS ==================== */}
      <SectionWrapper background="light">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <AnimatedSection animation="slide-in-left">
            <span className="mb-3 inline-block rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
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

          <AnimatedSection animation="slide-in-right" delay={200}>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-border bg-surface p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-accent/20"
                >
                  <p className="text-3xl font-extrabold text-accent lg:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm font-medium text-text-secondary">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </SectionWrapper>

      {/* ==================== TESTIMONIALS ==================== */}
      <SectionWrapper background="white">
        <AnimatedSection>
          <SectionHeading
            label="Testimonials"
            title="What Our Clients Say"
            description="Don't just take our word for it. Hear from the businesses we've partnered with."
          />
        </AnimatedSection>

        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {testimonials.map((item, i) => (
            <AnimatedSection
              key={item.author}
              animation="fade-in-up"
              delay={i * 100}
            >
              <div className="relative h-full rounded-2xl border border-border bg-surface p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-accent/20 flex flex-col">
                <svg
                  className="mb-6 h-8 w-8 text-accent/20"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="flex-1 text-text-secondary leading-relaxed mb-6 italic">
                  "{item.quote}"
                </p>
                <div className="mt-auto">
                  <p className="font-bold text-text-primary">{item.author}</p>
                  <p className="text-sm text-text-muted">{item.role}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </SectionWrapper>

      {/* ==================== CTA ==================== */}
      <section className="relative overflow-hidden bg-primary py-24">
        {/* BG decoration */}
        <div className="absolute inset-0 -z-0">
          <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl leading-tight">
              Ready to Transform Your
              <br />
              Online Presence?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
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
                className="!border-white/20 !text-white hover:!bg-white/10 hover:!text-white"
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
