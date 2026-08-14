import { useEffect } from 'react';

export interface TOCHighlightObserverConfig {
  linkClassName?: string;
  linkActiveClassName?: string;
  minHeadingLevel?: number;
  maxHeadingLevel?: number;
}

/**
 * Custom hook to dynamically highlight current section in Table of Contents while scrolling.
 * Uses IntersectionObserver API to track visible document headings in real-time.
 */
export function useTOCHighlightObserver(config: TOCHighlightObserverConfig | undefined): void {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    if (!config || !config.linkClassName || !config.linkActiveClassName) {
      return;
    }

    const {
      linkClassName,
      linkActiveClassName,
      minHeadingLevel = 2,
      maxHeadingLevel = 4,
    } = config;

    const linkClasses = linkClassName.trim().split(/\s+/).join('.');
    const linkSelector = `a.${linkClasses}`;

    let observer: IntersectionObserver | null = null;
    let headingElements: HTMLElement[] = [];

    const updateActiveLink = (activeId: string | null) => {
      const links = Array.from(document.querySelectorAll<HTMLAnchorElement>(linkSelector));
      links.forEach((link) => {
        const href = link.getAttribute('href');
        const isMatch = Boolean(
          activeId && (href === `#${activeId}` || href === `#${encodeURIComponent(activeId)}`)
        );

        if (isMatch) {
          link.classList.add(linkActiveClassName);
          link.classList.add('active');

          // Keep active TOC link within visible container scroll area
          const tocContainer = link.closest('.table-of-contents, .thin-scrollbar');
          if (tocContainer) {
            const linkTop = link.offsetTop;
            const containerScrollTop = tocContainer.scrollTop;
            const containerHeight = tocContainer.clientHeight;
            if (linkTop < containerScrollTop || linkTop > containerScrollTop + containerHeight - 40) {
              tocContainer.scrollTop = Math.max(0, linkTop - containerHeight / 2);
            }
          }
        } else {
          link.classList.remove(linkActiveClassName);
          link.classList.remove('active');
        }
      });
    };

    const getHeadingElements = (): HTMLElement[] => {
      const selectors: string[] = [];
      for (let i = minHeadingLevel; i <= maxHeadingLevel; i++) {
        selectors.push(`h${i}[id]`);
      }
      if (selectors.length === 0) return [];
      return Array.from(document.querySelectorAll<HTMLElement>(selectors.join(', ')));
    };

    const determineActiveHeading = () => {
      headingElements = getHeadingElements();
      if (headingElements.length === 0) return;

      const navbarOffset = 90;

      // Handle top of page
      if (window.scrollY < 80) {
        updateActiveLink(headingElements[0].id);
        return;
      }

      // Handle bottom of page (only if page content overflows viewport height)
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      const isBottom =
        scrollHeight > window.innerHeight &&
        window.innerHeight + Math.round(window.scrollY) >= scrollHeight - 60;

      if (isBottom) {
        updateActiveLink(headingElements[headingElements.length - 1].id);
        return;
      }

      let activeId: string | null = null;

      for (let i = 0; i < headingElements.length; i++) {
        const heading = headingElements[i];
        const rect = heading.getBoundingClientRect();

        if (rect.top <= navbarOffset + 20) {
          activeId = heading.id;
        } else {
          break;
        }
      }

      if (!activeId && headingElements.length > 0) {
        activeId = headingElements[0].id;
      }

      if (activeId) {
        updateActiveLink(activeId);
      }
    };

    if (typeof IntersectionObserver !== 'undefined') {
      try {
        observer = new IntersectionObserver(
          () => {
            determineActiveHeading();
          },
          {
            rootMargin: '-80px 0px -40% 0px',
            threshold: [0, 0.25, 0.5, 0.75, 1.0],
          }
        );

        headingElements = getHeadingElements();
        headingElements.forEach((heading) => observer?.observe(heading));
      } catch {
        // Fallback gracefully
      }
    }

    const handleScroll = () => {
      determineActiveHeading();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    determineActiveHeading();

    return () => {
      if (observer) {
        observer.disconnect();
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [config]);
}
