import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '../components/SectionWrapper';
import SectionHeading from '../components/SectionHeading';
import PortfolioGridItem from '../components/PortfolioGridItem';
import Button from '../components/Button';
import { AnimatedSection, useStaggerReveal, useScrollToTop } from '../hooks/useAnimations';
import { ArrowRightIcon } from '../components/Icons';

import { categories, projects } from '../data/portfolio';

export default function PortfolioPage() {
  useScrollToTop();
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const [gridRef, gridVisible] = useStaggerReveal(filteredProjects.length, 80);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary pt-36 pb-20 lg:pt-44 lg:pb-28">
        {/* Cinematic Background Mesh */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ x: [0, 70, 0], y: [0, 40, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-15%] right-[-10%] h-[900px] w-[900px] rounded-full bg-accent/20 blur-[160px] opacity-40" 
          />
          <motion.div 
            animate={{ x: [0, -60, 0], y: [0, -30, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[-20%] left-[-5%] h-[800px] w-[800px] rounded-full bg-accent-light/10 blur-[140px] opacity-30" 
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection animation="fade-in-up">
            <span className="mb-4 inline-block rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
              Our Portfolio
            </span>
            <h1 className="text-4xl font-extrabold text-text-primary sm:text-5xl lg:text-6xl leading-tight">
              Work That Makes an
              <br />
              <span className="text-accent">Impact</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-text-secondary">
              Browse our portfolio of websites, applications, and digital
              experiences crafted for businesses across diverse industries.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Portfolio Grid */}
      <SectionWrapper>
        <AnimatedSection>
          <SectionHeading
            label="Featured Projects"
            title="Selected Works"
            description="Each project represents our commitment to quality, innovation, and measurable results."
          />
        </AnimatedSection>

        {/* Category Filter */}
        <AnimatedSection className="mb-12">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-accent text-white shadow-md'
                    : 'bg-surface-muted text-text-secondary hover:bg-accent/10 hover:text-accent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredProjects.map((project, i) => (
            <div
              key={project.title}
              className={`transition-all duration-500 ${
                gridVisible[i]
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <PortfolioGridItem {...project} />
            </div>
          ))}
        </div>
      </SectionWrapper>

      <section className="bg-surface-alt py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">
              Want to See Your Business Here?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary">
              Let's create something amazing together. Start a conversation about
              your next project today.
            </p>
            <Button as="link" to="/contact" size="lg" className="mt-8">
              Start Your Project
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
