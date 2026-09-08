import { PhoneIcon } from './Icons';

export default function FloatingPhoneButton() {
  return (
    <a
      href="tel:+18483688867"
      aria-label="Call Website Work 4 Less at (848) 368-8867"
      className="fixed bottom-5 right-4 z-40 inline-flex min-h-12 items-center gap-2 rounded-full border border-white/20 bg-accent px-4 py-3 text-sm font-bold text-white shadow-2xl shadow-black/25 transition hover:-translate-y-1 hover:bg-accent-hover focus:outline-none focus:ring-4 focus:ring-accent/25 sm:bottom-6 sm:right-6"
    >
      <PhoneIcon className="h-5 w-5" />
      <span>(848) 368-8867</span>
    </a>
  );
}
