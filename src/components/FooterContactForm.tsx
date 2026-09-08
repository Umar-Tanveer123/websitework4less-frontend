import { useState, type FormEvent } from 'react';
import { API_URLS } from '../config';
import { serviceOptions } from '../data/serviceOptions';

const inputClasses =
  'w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15';

export default function FooterContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('sending');
    setError('');

    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch(API_URLS.contact, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          company: '',
          phone: '',
          service: values.service,
          message: values.message,
        }),
      });
      const payload = (await response.json().catch(() => null)) as { error?: string } | null;

      if (!response.ok) {
        throw new Error(payload?.error || 'Unable to send your message.');
      }

      form.reset();
      setStatus('success');
    } catch (caught) {
      setStatus('idle');
      setError(caught instanceof Error ? caught.message : 'Unable to send your message.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-7 space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="sr-only" htmlFor="footer-name">Name</label>
        <input id="footer-name" name="name" type="text" autoComplete="name" required placeholder="Your name" className={inputClasses} />
        <label className="sr-only" htmlFor="footer-email">Email</label>
        <input id="footer-email" name="email" type="email" autoComplete="email" required placeholder="Email address" className={inputClasses} />
      </div>
      <label className="sr-only" htmlFor="footer-service">Service interested in</label>
      <select id="footer-service" name="service" defaultValue="" required className={inputClasses}>
        <option value="" disabled>Select a service</option>
        {serviceOptions.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
        <option value="other">Other</option>
      </select>
      <label className="sr-only" htmlFor="footer-message">Project details</label>
      <textarea id="footer-message" name="message" required rows={3} placeholder="Tell us about your project" className={`${inputClasses} resize-y`} />
      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex min-h-11 items-center justify-center rounded-xl bg-accent px-6 py-3 text-sm font-bold text-white shadow-lg shadow-accent/20 transition hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending?' : 'Send Message'}
      </button>
      <div aria-live="polite" className="min-h-5 text-sm">
        {status === 'success' && <p className="text-green-600 dark:text-green-400">Thank you. Your message has been sent.</p>}
        {error && <p className="text-red-600 dark:text-red-400">{error}</p>}
      </div>
    </form>
  );
}
