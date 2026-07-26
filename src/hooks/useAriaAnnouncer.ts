import { useContext, useCallback, useRef } from 'react';
import { AriaAnnouncerContext, Politeness } from '../contexts/AriaAnnouncerContext';

export function useAriaAnnouncer() {
  const context = useContext(AriaAnnouncerContext);
  const fallbackRef = useRef<HTMLDivElement | null>(null);

  const fallbackAnnounce = useCallback((message: string, politeness: Politeness = 'polite') => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    if (!fallbackRef.current) {
      let el = document.getElementById('a11y-announcer-fallback') as HTMLDivElement;
      if (!el) {
        el = document.createElement('div');
        el.id = 'a11y-announcer-fallback';
        el.className = 'sr-only';
        el.setAttribute('aria-live', politeness);
        el.setAttribute('aria-atomic', 'true');
        document.body.appendChild(el);
      }
      fallbackRef.current = el;
    }

    fallbackRef.current.setAttribute('aria-live', politeness);
    fallbackRef.current.textContent = '';
    setTimeout(() => {
      if (fallbackRef.current) {
        fallbackRef.current.textContent = message;
      }
    }, 10);
  }, []);

  const announce = useCallback(
    (message: string, politeness: Politeness = 'polite') => {
      if (context && typeof context.announce === 'function') {
        context.announce(message, politeness);
      } else {
        fallbackAnnounce(message, politeness);
      }
    },
    [context, fallbackAnnounce]
  );

  const clearAnnouncement = useCallback(() => {
    if (context && typeof context.clearAnnouncement === 'function') {
      context.clearAnnouncement();
    } else if (fallbackRef.current) {
      fallbackRef.current.textContent = '';
    }
  }, [context]);

  return { announce, clearAnnouncement };
}
