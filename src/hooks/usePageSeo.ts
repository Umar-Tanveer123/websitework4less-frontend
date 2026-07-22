import { useEffect } from 'react';

interface PageSeo {
  title: string;
  description: string;
  keywords: string[];
}

function upsertMeta(name: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[name=${name}]`);
  const created = !element;

  if (!element) {
    element = document.createElement('meta');
    element.name = name;
    document.head.appendChild(element);
  }

  const previousContent = element.getAttribute('content');
  element.content = content;

  return () => {
    if (created) {
      element.remove();
    } else if (previousContent === null) {
      element.removeAttribute('content');
    } else {
      element.content = previousContent;
    }
  };
}

/** Keeps route-specific title, description, and keywords in sync in the SPA. */
export function usePageSeo({ title, description, keywords }: PageSeo) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    const restoreDescription = upsertMeta('description', description);
    const restoreKeywords = upsertMeta('keywords', keywords.join(', '));

    return () => {
      document.title = previousTitle;
      restoreDescription();
      restoreKeywords();
    };
  }, [title, description, keywords]);
}
