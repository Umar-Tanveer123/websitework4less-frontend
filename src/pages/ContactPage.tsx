import { useState } from 'react';
import type { FormEvent } from 'react';
import SectionWrapper from '../components/SectionWrapper';
import Button from '../components/Button';
import { Input, Textarea } from '../components/FormInputs';
import { AnimatedSection, useScrollToTop } from '../hooks/useAnimations';
import {
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon,
  ClockIcon,
} from '../components/Icons';

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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Simulate form submit
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({
      name: '',
      email: '',
      company: '',
      phone: '',
      service: '',
      message: '',
    });
  };

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary pt-36 pb-20 lg:pt-44 lg:pb-28">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 h-[500px] w-[500px] rounded-full bg-accent/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection animation="fade-in-up">
            <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent-light">
              Contact Us
            </span>
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl leading-tight">
              Let's Start a
              <br />
              <span className="text-accent">Conversation</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
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
            className="lg:col-span-3"
          >
            <div className="rounded-2xl border border-border bg-surface p-8 sm:p-10">
              <h2 className="text-2xl font-bold text-text-primary">
                Send Us a Message
              </h2>
              <p className="mt-2 text-text-secondary">
                Tell us about your project and we'll provide a free consultation.
              </p>

              {submitted && (
                <div className="mt-6 rounded-xl bg-green-50 border border-green-200 p-4">
                  <p className="text-sm font-medium text-green-800">
                    ✓ Thank you! Your message has been sent successfully. We'll get
                    back to you within 24 hours.
                  </p>
                </div>
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
                <div>
                  <label
                    htmlFor="contact-service"
                    className="mb-2 block text-sm font-medium text-text-primary"
                  >
                    Service Interested In
                  </label>
                  <select
                    id="contact-service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-border px-4 py-3 text-sm text-text-primary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent bg-surface"
                  >
                    <option value="">Select a service</option>
                    <option value="web-development">Web Development</option>
                    <option value="ui-ux-design">UI/UX Design</option>
                    <option value="ecommerce">E-Commerce</option>
                    <option value="seo">SEO Optimization</option>
                    <option value="other">Other</option>
                  </select>
                </div>
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
                <Button type="submit" size="lg" className="w-full sm:w-auto">
                  Send Message
                </Button>
              </form>
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
