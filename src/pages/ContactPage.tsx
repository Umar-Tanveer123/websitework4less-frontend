import { useState } from 'react';
import type { FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../components/SectionWrapper';
import Button from '../components/Button';
import { Input, Textarea, Select } from '../components/FormInputs';
import { AnimatedSection, useScrollToTop } from '../hooks/useAnimations';
import {
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon,
  ClockIcon,
} from '../components/Icons';
import { API_URLS } from '../config';

const contactInfo = [
  {
    icon: <MapPinIcon className="h-6 w-6" />,
    title: 'Headquarters',
    details: ['Lakewood, NJ USA'],
  },
  {
    icon: <EnvelopeIcon className="h-6 w-6" />,
    title: 'Email Us',
    details: ['info@websitework4less.com'],
  },
  {
    icon: <PhoneIcon className="h-6 w-6" />,
    title: 'Call Us',
    details: ['Call or text us anytime:', '(848) 368-8867'],
  },
  {
    icon: <ClockIcon className="h-6 w-6" />,
    title: '24/6 Support',
    details: ['Available 24/6 (Closed on Saturdays)', 'If no one answers, we will return your call'],
  },
];

export default function ContactPage() {
  useScrollToTop();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(API_URLS.contact, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        service: '',
        message: '',
      });
      
      // Auto-hide success message after 8 seconds
      setTimeout(() => setSubmitted(false), 8000);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary pt-36 pb-20 lg:pt-44 lg:pb-28">
        {/* Cinematic Background Mesh */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-10%] left-[-5%] h-[800px] w-[800px] rounded-full bg-accent/20 blur-[150px] opacity-40" 
          />
          <motion.div 
            animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[-20%] right-[-10%] h-[700px] w-[700px] rounded-full bg-accent-light/10 blur-[130px] opacity-30" 
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection animation="fade-in-up">
            <span className="mb-4 inline-block rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
              Contact Us
            </span>
            <h1 className="text-4xl font-extrabold text-text-primary sm:text-5xl lg:text-6xl leading-tight">
              Let's Start a
              <br />
              <span className="text-accent">Conversation</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-text-secondary">
              Ready to take your online presence to the next level? We'd love to
              hear from you. Fill out the form below and we'll get back to you
              within 24 hours.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="relative -mt-12 z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {contactInfo.map((info, i) => (
              <AnimatedSection
                key={info.title}
                delay={i * 100}
                className="rounded-2xl border border-border bg-surface p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-accent/20"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  {info.icon}
                </div>
                <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-text-primary">
                  {info.title}
                </h3>
                {info.details.map((detail) => (
                  <p key={detail} className="text-sm text-text-secondary">
                    {detail}
                  </p>
                ))}
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Map */}
      <SectionWrapper>
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Form */}
          <AnimatedSection
            animation="slide-in-left"
            className="lg:col-span-3 relative"
          >
            {/* Form Background Glow */}
            <div className="absolute -inset-4 bg-accent/5 blur-2xl rounded-[2.5rem] -z-10" />
            
            <div className="rounded-2xl border border-border bg-surface/80 backdrop-blur-md p-8 sm:p-10 shadow-2xl relative overflow-hidden">
              {/* Decorative corner glow */}
              <div className="absolute -top-24 -right-24 h-48 w-48 bg-accent/10 blur-3xl rounded-full" />
              <h2 className="text-2xl font-bold text-text-primary">
                Send Us a Message
              </h2>
              <p className="mt-2 text-text-secondary">
                Tell us about your project and we'll provide a free consultation.
              </p>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="mt-6 rounded-2xl bg-green-500/10 border border-green-500/20 p-6 text-center"
                  >
                    <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center">
                      <motion.div 
                        animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="absolute inset-0 bg-green-500/20 blur-xl rounded-full" 
                      />
                      <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-white shadow-lg shadow-green-500/30">
                        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      
                      {/* Floating Particles */}
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ 
                            opacity: [0, 1, 0], 
                            scale: [0, 1, 0],
                            x: (i % 2 === 0 ? 1 : -1) * (Math.random() * 40 + 20),
                            y: -(Math.random() * 40 + 20)
                          }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity, 
                            delay: i * 0.3,
                            ease: "easeOut"
                          }}
                          className="absolute h-2 w-2 rounded-full bg-green-400"
                        />
                      ))}
                    </div>
                    <h3 className="text-2xl font-bold text-text-primary">Message Sent!</h3>
                    <p className="mt-4 text-text-secondary leading-relaxed max-w-sm mx-auto">
                      Thank you for reaching out. We've received your message and our team will get
                      back to you within 24 hours.
                    </p>
                    <button 
                      onClick={() => setSubmitted(false)}
                      className="mt-4 text-xs font-semibold text-green-700 hover:underline underline-offset-4"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <>
                    {error && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 rounded-xl bg-red-50 border border-red-200 p-4"
                      >
                        <p className="text-sm font-medium text-red-800">
                          ✕ {error}
                        </p>
                      </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                      <div className="grid gap-6 sm:grid-cols-2">
                        <Input
                          id="contact-name"
                          name="name"
                          label="Full Name"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                        <Input
                          id="contact-email"
                          name="email"
                          label="Email Address"
                          type="email"
                          placeholder="john@company.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="grid gap-6 sm:grid-cols-2">
                        <Input
                          id="contact-company"
                          name="company"
                          label="Company"
                          placeholder="Acme Inc."
                          value={formData.company}
                          onChange={handleChange}
                        />
                        <Input
                          id="contact-phone"
                          name="phone"
                          label="Phone Number"
                          type="tel"
                          placeholder="(555) 123-4567"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>
                      <Select
                        id="contact-service"
                        name="service"
                        label="Service Interested In"
                        value={formData.service}
                        onChange={handleChange}
                        options={[
                          { value: '', label: 'Select a service' },
                          { value: 'web-development', label: 'Web Development' },
                          { value: 'ui-ux-design', label: 'UI/UX Design' },
                          { value: 'ecommerce', label: 'E-Commerce' },
                          { value: 'seo', label: 'SEO Optimization' },
                          { value: 'other', label: 'Other' },
                        ]}
                      />
                      <Textarea
                        id="contact-message"
                        name="message"
                        label="Project Details"
                        placeholder="Tell us about your project, goals, and timeline..."
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                      <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={loading}>
                        {loading ? (
                          <span className="flex items-center gap-2">
                            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Sending...
                          </span>
                        ) : (
                          'Send Message'
                        )}
                      </Button>
                    </form>
                  </>
                )}
              </AnimatePresence>
            </div>
          </AnimatedSection>

          {/* Sidebar */}
          <AnimatedSection
            animation="slide-in-right"
            delay={200}
            className="lg:col-span-2"
          >
            <div className="space-y-8">
              {/* FAQ */}
              <div className="rounded-2xl border border-border bg-surface p-6">
                <h3 className="text-lg font-bold text-text-primary">
                  Quick Answers
                </h3>
                <div className="mt-4 space-y-4">
                  {[
                    {
                      q: 'How long does a project take?',
                      a: 'Most projects are delivered within 2-4 weeks, depending on complexity.',
                    },
                    {
                      q: 'How does your pricing work?',
                      a: 'Our pricing model is to always provide upfront quotes so that you know what the project will cost before you approve it.',
                    },
                    {
                      q: 'Do you offer ongoing support?',
                      a: 'Yes, we offer maintenance and support packages for all our clients.',
                    },
                  ].map((faq) => (
                    <div key={faq.q}>
                      <p className="text-sm font-semibold text-text-primary">
                        {faq.q}
                      </p>
                      <p className="mt-1 text-sm text-text-secondary">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </SectionWrapper>
    </>
  );
}
