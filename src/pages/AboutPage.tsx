import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import SectionWrapper from '../components/SectionWrapper';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import { AnimatedSection, useStaggerReveal, useScrollToTop } from '../hooks/useAnimations';
import { CheckCircleIcon, RocketLaunchIcon, HeartIcon, UsersIcon, LightBulbIcon } from '../components/Icons';

const stats = [
  { value: '200+', label: 'Projects Completed', icon: RocketLaunchIcon },
  { value: '50', label: 'States Served', icon: UsersIcon },
  { value: '3+', label: 'Years in Business', icon: HeartIcon },
  { value: '50+', label: 'Team Members', icon: LightBulbIcon },
];

const values = [
  {
    title: 'Quality First',
    icon: <CheckCircleIcon className="h-8 w-8" />,
    description:
      'We never compromise on quality. Every project receives the same level of care, attention, and craftsmanship regardless of scope.',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'border-blue-500/30'
  },
  {
    title: 'Transparent Communication',
    icon: <UsersIcon className="h-8 w-8" />,
    description:
      "Open, honest communication is the foundation of every successful project. You'll always know where things stand.",
    gradient: 'from-purple-500/20 to-pink-500/20',
    borderColor: 'border-purple-500/30'
  },
  {
    title: 'Results-Driven',
    icon: <RocketLaunchIcon className="h-8 w-8" />,
    description:
      'Beautiful design means nothing without results. We measure success by the impact our work has on your business.',
    gradient: 'from-orange-500/20 to-red-500/20',
    borderColor: 'border-orange-500/30'
  },
  {
    title: 'Continuous Innovation',
    icon: <LightBulbIcon className="h-8 w-8" />,
    description:
      'The web never stops evolving, and neither do we. We stay at the forefront of technology to deliver modern solutions.',
    gradient: 'from-emerald-500/20 to-teal-500/20',
    borderColor: 'border-emerald-500/30'
  },
];

const timeline = [
  { year: '2023', title: 'The Beginning', desc: 'Started as a small creative studio focusing on high-impact web design.' },
  { year: '2024', title: 'Expansion', desc: 'Scaled our development team to handle enterprise-level React applications.' },
  { year: '2025', title: 'Nationwide Growth', desc: 'Established a presence across 50 states, serving diverse industries.' },
  { year: '2026', title: 'Future-Ready', desc: 'Leading the way in AI-integrated web solutions and premium digital experiences.' },
];

export default function AboutPage() {
  useScrollToTop();
  const [valuesRef, valuesVisible] = useStaggerReveal(values.length, 150);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 lg:pt-40 lg:pb-32">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              x: [0, 100, 0],
              y: [0, 50, 0] 
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] bg-accent/20 rounded-full blur-[120px]"
          />
          <motion.div
            animate={{ 
              scale: [1.2, 1, 1.2],
              rotate: [0, -90, 0],
              x: [0, -80, 0],
              y: [0, -40, 0] 
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-1/4 -left-1/4 w-[700px] h-[700px] bg-accent-light/10 rounded-full blur-[100px]"
          />
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection animation="fade-in-up">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-widest mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
                Our Vision
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold text-text-primary leading-[1.1]">
                Crafting the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-light">Future of Web</span>
              </h1>
              <p className="mt-8 text-xl text-text-secondary leading-relaxed max-w-xl">
                We bridge the gap between imagination and reality, delivering 
                high-performance digital solutions that empower businesses to 
                scale without limits.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button size="lg" as="link" to="/contact">Start a Project</Button>
                <div className="flex -space-x-4">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="h-12 w-12 rounded-full border-2 border-surface bg-surface-alt overflow-hidden">
                      <img src={`https://i.pravatar.cc/150?u=${i+10}`} alt="Team" className="h-full w-full object-cover" />
                    </div>
                  ))}
                  <div className="h-12 w-12 rounded-full border-2 border-surface bg-accent flex items-center justify-center text-white text-xs font-bold">
                    +50
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <motion.div 
              style={{ y: y1 }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10 rounded-3xl overflow-hidden bg-surface-alt/50 backdrop-blur-sm border border-white/10 shadow-2xl p-4 sm:p-8 min-h-[400px] flex items-center justify-center">
                <svg viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-w-[350px]">
                  {/* Circuitry Background Lines */}
                  <g opacity="0.2">
                    <path d="M50 50 L100 50 L100 150 M350 450 L300 450 L300 350" stroke="var(--color-accent)" strokeWidth="1" />
                    <path d="M50 450 L100 450 L100 350 M350 50 L300 50 L300 150" stroke="var(--color-accent-light)" strokeWidth="1" />
                    <circle cx="100" cy="150" r="3" fill="var(--color-accent)" />
                    <circle cx="300" cy="350" r="3" fill="var(--color-accent)" />
                  </g>

                  {/* Floating Code Blocks */}
                  <motion.rect 
                    animate={{ y: [0, -15, 0], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 6, repeat: Infinity }}
                    x="240" y="100" width="80" height="12" rx="6" fill="url(#grad1)" 
                  />
                  <motion.rect 
                    animate={{ y: [0, 20, 0], opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 8, repeat: Infinity, delay: 1 }}
                    x="80" y="380" width="100" height="12" rx="6" fill="url(#grad2)" 
                  />

                  {/* Central Laptop/Dev Workspace Silhouette */}
                  <motion.g initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }}>
                    {/* Screen */}
                    <rect x="100" y="160" width="200" height="140" rx="12" fill="#1e1e1e" stroke="var(--color-accent)" strokeWidth="2" />
                    <rect x="110" y="170" width="180" height="120" rx="4" fill="#0d0d0d" />
                    
                    {/* Code Brackets on Screen */}
                    <motion.path 
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      d="M140 210 L125 220 L140 230 M260 210 L275 220 L260 230" 
                      stroke="var(--color-accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" 
                    />
                    
                    {/* Pulsing Core */}
                    <circle cx="200" cy="220" r="20" fill="var(--color-accent)" filter="url(#glow-it)" opacity="0.2" />
                    <motion.circle 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      cx="200" cy="220" r="8" fill="var(--color-accent)" 
                    />

                    {/* Keyboard/Base */}
                    <path d="M80 300 L320 300 L340 330 L60 330 Z" fill="#2a2a2a" />
                    <rect x="140" y="310" width="120" height="10" rx="5" fill="#3a3a3a" />
                  </motion.g>

                  {/* Floating Tech Icons / Nodes */}
                  <motion.g animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }}>
                    <circle cx="340" cy="220" r="12" fill="url(#grad1)" />
                    <circle cx="60" cy="220" r="10" fill="url(#grad2)" />
                  </motion.g>

                  {/* Gradients & Filters */}
                  <defs>
                    <filter id="glow-it">
                      <feGaussianBlur stdDeviation="6" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                    <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="var(--color-accent)" />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                    <linearGradient id="grad2" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="var(--color-accent-light)" />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              
              {/* Floating Glass Cards */}
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -left-10 p-6 rounded-2xl bg-surface/40 backdrop-blur-xl border border-white/20 shadow-2xl z-20"
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-accent flex items-center justify-center text-white">
                    <RocketLaunchIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-text-primary">200+</p>
                    <p className="text-xs text-text-muted">Launch successes</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-10 -right-10 p-6 rounded-2xl bg-surface/40 backdrop-blur-xl border border-white/20 shadow-2xl z-20"
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-emerald-500 flex items-center justify-center text-white">
                    <CheckCircleIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-text-primary">100%</p>
                    <p className="text-xs text-text-muted">Client satisfaction</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar with Counter-like feel */}
      <section className="relative py-24 bg-surface-alt border-y border-border overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-accent)_0%,_transparent_70%)]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {stats.map((stat, i) => (
              <AnimatedSection key={stat.label} delay={i * 100} className="text-center group">
                <div className="mb-4 flex justify-center">
                  <div className="h-14 w-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
                    <stat.icon className="h-7 w-7" />
                  </div>
                </div>
                <h3 className="text-4xl lg:text-5xl font-bold text-text-primary mb-2 tracking-tight">
                  {stat.value}
                </h3>
                <p className="text-sm font-semibold text-text-muted uppercase tracking-widest">
                  {stat.label}
                </p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Story Timeline */}
      <SectionWrapper className="relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent hidden lg:block" />
        
        <div className="space-y-24 relative z-10">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-20">
            <SectionHeading
              label="Our Journey"
              title="A Legacy in the Making"
              description="How we evolved from a passionate solo venture to a nationwide leader in digital craftsmanship."
            />
          </AnimatedSection>

          {timeline.map((item, i) => (
            <div key={item.year} className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <AnimatedSection 
                animation={i % 2 === 0 ? 'slide-in-left' : 'slide-in-right'} 
                className={`flex flex-col ${i % 2 === 1 ? 'lg:order-2 lg:items-start text-left' : 'lg:items-end text-right'}`}
              >
                <div className="text-6xl font-black text-accent/10 mb-4">{item.year}</div>
                <h3 className="text-2xl font-bold text-text-primary mb-4">{item.title}</h3>
                <p className="text-text-secondary text-lg max-w-md">{item.desc}</p>
              </AnimatedSection>
              
              <AnimatedSection 
                animation="scale-in"
                className={`relative hidden lg:flex justify-center items-center ${i % 2 === 1 ? 'lg:order-1' : ''}`}
              >
                <div className="h-12 w-12 rounded-full bg-accent border-4 border-surface shadow-xl z-20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-32 w-32 rounded-full bg-accent/5 animate-pulse" />
                </div>
              </AnimatedSection>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Values Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-20">
            <SectionHeading
              label="Core Values"
              title="The Principles We Live By"
              description="Guided by integrity, fueled by innovation, and committed to your absolute success."
            />
          </AnimatedSection>

          <div ref={valuesRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={valuesVisible[i] ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className={`relative p-8 rounded-3xl border ${value.borderColor} bg-surface shadow-xl shadow-black/5 group overflow-hidden`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className="h-16 w-16 rounded-2xl bg-surface-alt border border-border flex items-center justify-center text-accent mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 shadow-sm">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-4">{value.title}</h3>
                  <p className="text-text-secondary leading-relaxed text-sm">
                    {value.description}
                  </p>
                </div>

                <div className="absolute -bottom-2 -right-2 h-20 w-20 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/10 transition-colors" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern CTA */}
      <SectionWrapper>
        <AnimatedSection className="relative rounded-[3rem] bg-accent overflow-hidden px-8 py-20 lg:py-28 text-center text-white">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-accent via-accent to-accent-light" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl lg:text-6xl font-bold mb-8 leading-tight">
              Ready to Build Your <br /> Digital Legacy?
            </h2>
            <p className="text-white/80 text-xl mb-12 max-w-xl mx-auto">
              Join the 200+ businesses that have transformed their online presence with our premium expertise.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button 
                as="link" 
                to="/contact" 
                size="lg" 
                variant="secondary"
                className="!bg-white !text-accent hover:!scale-105 transition-transform px-10 py-5 text-lg shadow-2xl shadow-black/20"
              >
                Get Started Now
              </Button>
              <div className="flex items-center gap-4 text-white/90">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <img key={i} src={`https://i.pravatar.cc/100?u=${i+20}`} className="h-10 w-10 rounded-full border-2 border-accent" alt="User" />
                  ))}
                </div>
                <span className="text-sm font-medium italic">50+ experts ready to help</span>
              </div>
            </div>
          </div>

          {/* Decorative shapes */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-accent-light/30 rounded-full blur-3xl animate-pulse" />
        </AnimatedSection>
      </SectionWrapper>
    </div>
  );
}
