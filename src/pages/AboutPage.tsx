import SectionWrapper from '../components/SectionWrapper';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import { AnimatedSection, useStaggerReveal, useScrollToTop } from '../hooks/useAnimations';
import { ArrowRightIcon, CheckCircleIcon } from '../components/Icons';

const stats = [
  { value: '200+', label: 'Projects Completed' },
  { value: '50', label: 'States Served' },
  { value: '3+', label: 'Years in Business' },
  { value: '50+', label: 'Team Members' },
];

const values = [
  {
    title: 'Quality First',
    description:
      'We never compromise on quality. Every project receives the same level of care, attention, and craftsmanship regardless of scope.',
  },
  {
    title: 'Transparent Communication',
    description:
      "Open, honest communication is the foundation of every successful project. You'll always know where things stand.",
  },
  {
    title: 'Results-Driven',
    description:
      'Beautiful design means nothing without results. We measure success by the impact our work has on your business.',
  },
  {
    title: 'Continuous Innovation',
    description:
      'The web never stops evolving, and neither do we. We stay at the forefront of technology to deliver modern solutions.',
  },
];

export default function AboutPage() {
  useScrollToTop();
  const [valuesRef, valuesVisible] = useStaggerReveal(values.length, 120);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary pt-36 pb-20 lg:pt-44 lg:pb-28">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-0 h-[500px] w-[500px] rounded-full bg-accent/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection animation="fade-in-up">
            <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent-light">
              About Us
            </span>
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl leading-tight">
              The People Behind
              <br />
              <span className="text-accent">Your Success</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
              We&apos;re a team of designers, developers, and strategists passionate
              about helping businesses thrive in the digital world.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-b border-border bg-surface-alt py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat) => (
              <AnimatedSection key={stat.label} className="text-center">
                <p className="text-3xl font-extrabold text-accent lg:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm font-medium text-text-secondary">
                  {stat.label}
                </p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <SectionWrapper>
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <AnimatedSection animation="slide-in-left">
            <span className="mb-3 inline-block rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
              Our Story
            </span>
            <h2 className="text-3xl font-bold sm:text-4xl text-text-primary leading-tight">
              From a Small Studio to a
              <br />
              Full-Service Agency
            </h2>
            <div className="mt-6 space-y-4">
              <div className="relative pl-6 before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-accent">
                <h3 className="font-bold text-text-primary">2023</h3>
                <p className="text-sm text-text-secondary">Worked as a freelancer focusing on standard websites and affordable pricing.</p>
              </div>
              <div className="relative pl-6 before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-accent">
                <h3 className="font-bold text-text-primary">2024</h3>
                <p className="text-sm text-text-secondary">Word spread quickly and we hired 5 developers to keep up with demand.</p>
              </div>
              <div className="relative pl-6 before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-accent">
                <h3 className="font-bold text-text-primary">2025</h3>
                <p className="text-sm text-text-secondary">Quickly became the USA go-to for any size job, from small to large, expanding our team to over 20.</p>
              </div>
              <div className="relative pl-6 before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-accent">
                <h3 className="font-bold text-text-primary">2026</h3>
                <p className="text-sm text-text-secondary">Launched the enterprise solutions department, expanding our project range from minor website fixes to complex custom frameworks. We now have a team comprising over 50+ experts.</p>
              </div>
            </div>
            <p className="mt-6 text-lg font-medium text-accent">
              From small businesses to larger operations, clients choose us for our flexible pricing, quick turnaround times, and reliable, always-available support.
            </p>
          </AnimatedSection>

          <AnimatedSection animation="slide-in-right" delay={200}>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl shadow-accent/10">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                  alt="Our team collaborating"
                  className="w-full h-auto object-cover"
                />
              </div>
              {/* Floating element */}
              <div className="absolute -bottom-6 -left-6 rounded-2xl border border-border bg-surface p-5 shadow-xl hidden sm:block">
                <p className="text-3xl font-extrabold text-accent">3+</p>
                <p className="text-sm text-text-secondary">Years of Excellence</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </SectionWrapper>

      {/* Values */}
      <SectionWrapper>
        <AnimatedSection>
          <SectionHeading
            label="Our Values"
            title="What We Stand For"
            description="The principles that guide every decision we make and every project we deliver."
          />
        </AnimatedSection>

        <div ref={valuesRef} className="grid gap-6 sm:grid-cols-2">
          {values.map((value, i) => (
            <div
              key={value.title}
              className={`flex gap-4 rounded-2xl border border-border bg-surface p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:border-accent/20 ${
                valuesVisible[i]
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="shrink-0">
                <CheckCircleIcon className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-text-primary">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* CTA */}
      <section className="bg-primary py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Want to Work With Us?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
              We&apos;d love to hear about your project. Reach out and let&apos;s explore
              how we can bring your vision to life.
            </p>
            <Button as="link" to="/contact" size="lg" className="mt-8">
              Get in Touch
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
