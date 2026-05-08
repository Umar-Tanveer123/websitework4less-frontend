import { motion } from 'framer-motion';
import SectionWrapper from '../components/SectionWrapper';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import Card from '../components/Card';
import { AnimatedSection, useStaggerReveal, useScrollToTop } from '../hooks/useAnimations';
import { services } from '../data/services';
import {
  CheckCircleIcon,
  ArrowRightIcon,
} from '../components/Icons';


export default function ServicesPage() {
  useScrollToTop();
  const [servicesRef, servicesVisible] = useStaggerReveal(services.length, 120);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary pt-36 pb-20 lg:pt-44 lg:pb-28">
        {/* Cinematic Background Mesh */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ x: [0, 50, 0], y: [0, 60, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-20%] left-[-10%] h-[900px] w-[900px] rounded-full bg-accent/20 blur-[170px] opacity-40" 
          />
          <motion.div 
            animate={{ x: [0, -70, 0], y: [0, -30, 0] }}
            transition={{ duration: 19, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[-10%] right-[-15%] h-[800px] w-[800px] rounded-full bg-accent-light/10 blur-[150px] opacity-30" 
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection animation="fade-in-up">
            <span className="mb-4 inline-block rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
              Our Services
            </span>
            <h1 className="text-4xl font-extrabold text-text-primary sm:text-5xl lg:text-6xl leading-tight">
              Everything You Need to
              <br />
              <span className="text-accent">Succeed Online</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-text-secondary">
              From design to development to ongoing optimization, we provide
              end-to-end web solutions tailored to your business.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Grid */}
      <SectionWrapper>
        <AnimatedSection>
          <SectionHeading
            label="What We Offer"
            title="Comprehensive Digital Services"
            description="Each service is designed to work independently or as part of a complete digital strategy."
          />
        </AnimatedSection>

        <div ref={servicesRef} className="grid gap-8 lg:grid-cols-2">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`transition-all duration-500 ${
                servicesVisible[i]
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <Card
                icon={service.icon}
                title={service.title}
                description={service.longDescription}
                className="h-full"
              >
                <ul className="mt-5 space-y-2.5">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-text-secondary"
                    >
                      <CheckCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          ))}
        </div>
      </SectionWrapper>


      <section className="bg-surface-alt py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">
              Not Sure Which Service You Need?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary">
              Schedule a free consultation and we'll help you identify the right
              solution for your business goals.
            </p>
            <Button as="link" to="/contact" size="lg" className="mt-8">
              Schedule Free Consultation
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
