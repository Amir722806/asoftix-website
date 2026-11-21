import { useEffect } from 'react';
import { site } from '../data/site';

// Sets the document title, meta description and canonical URL per page.
export default function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title ? `${title} | ${site.name}` : `${site.name} | ${site.tagline.replace(/\.$/, '')}`;
    if (description) {
      document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    }
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = site.url + window.location.pathname;
  }, [title, description]);
}
