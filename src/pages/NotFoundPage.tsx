import { useEffect } from 'react';
import SectionWrapper from '../components/SectionWrapper';
import Button from '../components/Button';
import { useScrollToTop } from '../hooks/useAnimations';

const DEFAULT_TITLE = 'Website Work 4 Less | Professional Web Development Agency';

export default function NotFoundPage() {
  useScrollToTop();

  useEffect(() => {
    document.title = 'Page Not Found | Website Work 4 Less';
    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, []);

  return (
    <SectionWrapper className="min-h-[70vh] flex items-center justify-center text-center">
      <div className="max-w-xl mx-auto">
        <p className="text-6xl sm:text-8xl font-bold text-accent mb-4">404</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4">
          This page couldn&rsquo;t be found
        </h1>
        <p className="text-text-secondary mb-8">
          The page you&rsquo;re looking for may have moved or never existed. Let&rsquo;s
          get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button as="link" to="/" variant="primary" size="lg">
            Back to Home
          </Button>
          <Button as="link" to="/services" variant="outline" size="lg">
            View Our Services
          </Button>
        </div>
      </div>
    </SectionWrapper>
  );
}
