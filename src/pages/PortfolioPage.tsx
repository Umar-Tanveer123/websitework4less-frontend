import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../components/SectionWrapper';
import SectionHeading from '../components/SectionHeading';
import PortfolioGridItem from '../components/PortfolioGridItem';
import Button from '../components/Button';
import { AnimatedSection, useScrollToTop } from '../hooks/useAnimations';
import { ArrowRightIcon, SparklesIcon } from '../components/Icons';

import { categories, projects } from '../data/portfolio';

export default function PortfolioPage() {
  useScrollToTop();
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="overflow-hidden">
      {/* Cinematic Hero */}
      <section className="relative min-h-[70vh] flex items-center pt-32 pb-20 lg:pt-40 lg:pb-32 bg-primary">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ 
              x: [0, 100, 0], 
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
              rotate: [0, 45, 0]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-20%] right-[-10%] h-[1000px] w-[1000px] rounded-full bg-accent/15 blur-[150px]" 
          />
          <motion.div 
            animate={{ 
              x: [0, -100, 0], 
              y: [0, -50, 0],
              scale: [1.2, 1, 1.2],
              rotate: [0, -45, 0]
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[-20%] left-[-10%] h-[900px] w-[900px] rounded-full bg-accent-light/10 blur-[130px]" 
          />
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection animation="fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-widest mb-8">
              <SparklesIcon className="h-4 w-4" />
              Digital Craftsmanship
            </div>
            <h1 className="text-5xl lg:text-8xl font-black text-text-primary leading-[1] mb-8">
              Work That <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-light">Redefines Limits</span>
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-xl text-text-secondary leading-relaxed">
              Explore our gallery of high-performance digital products, built with precision 
              and designed to dominate the competitive landscape.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Portfolio Section */}
      <SectionWrapper className="!pt-0">
        <div className="flex flex-col items-center mb-16">
          <AnimatedSection className="text-center mb-12">
            <SectionHeading
              label="Selected Works"
              title="Our Masterpieces"
              description="From complex enterprise solutions to sleek consumer apps, we build it all."
            />
          </AnimatedSection>

          {/* Premium Filter UI */}
          <AnimatedSection animation="scale-in" className="w-full max-w-4xl">
            <div className="flex flex-wrap justify-center p-2 rounded-2xl bg-surface-alt border border-border shadow-inner">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative px-6 py-2.5 text-sm font-bold transition-all duration-300 cursor-pointer rounded-xl ${
                    activeCategory === cat
                      ? 'text-white'
                      : 'text-text-secondary hover:text-accent hover:bg-accent/5'
                  }`}
                >
                  {activeCategory === cat && (
                    <motion.div
                      layoutId="activeFilter"
                      className="absolute inset-0 bg-accent rounded-xl shadow-lg shadow-accent/20"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              ))}
            </div>
          </AnimatedSection>
        </div>

        {/* Grid with AnimatePresence */}
        <motion.div
          layout
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.4 }}
              >
                <PortfolioGridItem {...project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </SectionWrapper>

      {/* Modern Footer CTA */}
      <section className="relative py-32 bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--color-accent)_0%,_transparent_40%)] opacity-10" />
        <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-4xl lg:text-6xl font-bold text-text-primary mb-8">
              Inspired by Our Work?
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-text-secondary mb-12">
              Your project could be our next success story. Let's collaborate to build something 
              that stands out in the digital crowd.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button as="link" to="/contact" size="lg" className="px-10 py-5 text-lg shadow-2xl shadow-accent/20">
                Let's Talk Business
                <ArrowRightIcon className="ml-3 h-5 w-5" />
              </Button>
              <div className="flex items-center gap-3 text-text-muted">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="h-10 w-10 rounded-full border-2 border-primary bg-surface-alt" />
                  ))}
                </div>
                <span className="text-sm font-medium">Join 200+ happy clients</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
