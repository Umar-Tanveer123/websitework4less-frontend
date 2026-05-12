import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, MouseEvent } from 'react';
import SectionWrapper from '../components/SectionWrapper';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import { AnimatedSection, useScrollToTop } from '../hooks/useAnimations';
import { services } from '../data/services';
import { CheckCircleIcon, ArrowRightIcon, SparklesIcon } from '../components/Icons';

function ServiceCard({ service, index }: { service: any; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative p-8 rounded-[2rem] border border-border bg-surface shadow-2xl shadow-black/5 hover:border-accent/30 transition-colors duration-500"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]" />
      
      <div style={{ transform: "translateZ(50px)" }} className="relative z-10">
        <div className="h-16 w-16 rounded-2xl bg-surface-alt border border-border flex items-center justify-center text-accent mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-sm">
          {service.icon}
        </div>
        
        <h3 className="text-2xl font-bold text-text-primary mb-4 group-hover:text-accent transition-colors">
          {service.title}
        </h3>
        
        <p className="text-text-secondary leading-relaxed mb-8">
          {service.longDescription}
        </p>

        <ul className="space-y-4">
          {service.features.map((feature: string) => (
            <li key={feature} className="flex items-center gap-3 text-sm font-medium text-text-secondary group/item">
              <div className="h-6 w-6 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover/item:bg-accent group-hover/item:text-white transition-all duration-300">
                <CheckCircleIcon className="h-4 w-4" />
              </div>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* Floating Sparkle on Hover */}
      <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <SparklesIcon className="h-6 w-6 text-accent/30 animate-pulse" />
      </div>

      {/* 3D Border Effect */}
      <div className="absolute inset-0 z-0 rounded-[2rem] border-2 border-transparent group-hover:border-accent/10 pointer-events-none transition-colors duration-500" />
    </motion.div>
  );
}

export default function ServicesPage() {
  useScrollToTop();

  return (
    <div className="overflow-hidden">
      {/* Cinematic Hero */}
      <section className="relative min-h-[80vh] flex items-center pt-32 pb-20 lg:pt-40 lg:pb-32 bg-primary">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              x: [0, 80, 0],
              y: [0, 40, 0] 
            }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="absolute -top-1/4 -left-1/4 w-[1000px] h-[1000px] bg-accent/20 rounded-full blur-[150px]"
          />
          <motion.div 
            animate={{ 
              scale: [1.2, 1, 1.2],
              x: [0, -60, 0],
              y: [0, -30, 0] 
            }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-1/4 -right-1/4 w-[900px] h-[900px] bg-accent-light/10 rounded-full blur-[130px]"
          />
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection animation="fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-widest mb-8">
                <SparklesIcon className="h-4 w-4" />
                Unmatched Expertise
              </div>
              <h1 className="text-6xl lg:text-8xl font-black text-text-primary leading-[1] mb-8">
                Building the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-light">Elite Digital</span> Experience
              </h1>
              <p className="mt-8 text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto">
                We don't just build websites; we craft powerful digital assets that 
                drive revenue, automate growth, and scale your business to the next level.
              </p>
              <div className="mt-12 flex flex-wrap justify-center gap-6">
                <Button size="lg" as="link" to="/contact" className="shadow-2xl shadow-accent/20">
                  Explore Solutions
                </Button>
                <div className="flex items-center gap-3 text-text-muted">
                  <div className="flex -space-x-2">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="h-10 w-10 rounded-full border-2 border-primary bg-surface-alt" />
                    ))}
                  </div>
                  <span className="text-sm font-semibold italic">Join 200+ global brands</span>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <SectionWrapper className="relative">
        {/* Section Heading with staggered text */}
        <div className="text-center mb-20">
          <AnimatedSection>
            <SectionHeading
              label="Our Capabilities"
              title="End-to-End Solutions"
              description="A full suite of digital services designed for high-growth enterprises and ambitious startups."
            />
          </AnimatedSection>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </SectionWrapper>

      {/* Cinematic FAQ/Strategy CTA */}
      <section className="relative py-32 bg-surface-alt border-y border-border overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--color-accent)_0%,_transparent_50%)] opacity-5" />
        <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-4xl lg:text-6xl font-bold text-text-primary mb-8 tracking-tight">
              Ready to Accelerate <br />
              <span className="text-accent">Your Business?</span>
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-text-secondary mb-12">
              Our experts are ready to audit your current digital stack and provide a custom 
              roadmap for your transformation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <Button as="link" to="/contact" size="lg" className="px-10 py-5 text-lg shadow-2xl shadow-accent/20">
                Book a Strategy Call
                <ArrowRightIcon className="ml-3 h-5 w-5" />
              </Button>
              <div className="flex flex-col items-start text-left">
                <p className="text-sm font-bold text-text-primary">Response Time:</p>
                <p className="text-sm text-text-muted">&lt; 12 hours guaranteed</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
