import { useContext, useCallback, useRef } from 'react';
import { AriaAnnouncerContext, Politeness } from '../contexts/AriaAnnouncerContext';

export function useAriaAnnouncer(): { announce: (message: string, politeness?: Politeness) => void; clearAnnouncement: () => void } {
  const context = useContext(AriaAnnouncerContext);
  const fallbackRef = useRef<HTMLDivElement | null>(null);
  const mountedRef = useRef<boolean>(true);

  // Reset mounted flag on unmount
  if (typeof window !== 'undefined' && !mountedRef.current) {
    mountedRef.current = true;
  }

  const fallbackAnnounce = useCallback((message: string, politeness: Politeness = 'polite') => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    if (!mountedRef.current) return;

    try {
      if (!fallbackRef.current) {
        let el = document.getElementById('a11y-announcer-fallback') as HTMLDivElement | null;
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

      if (fallbackRef.current) {
        fallbackRef.current.setAttribute('aria-live', politeness);
        fallbackRef.current.textContent = '';
        setTimeout(() => {
          if (mountedRef.current && fallbackRef.current) {
            fallbackRef.current.textContent = message;
          }
        }, 10);
      }
    } catch {}
  }, []);
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
    if (!mountedRef.current) return;
    if (context && typeof context.clearAnnouncement === 'function') {
      context.clearAnnouncement();
    } else if (fallbackRef.current) {
      try {
        fallbackRef.current.textContent = '';
      } catch {}
    }
  }, [context]);

  return { announce, clearAnnouncement };
}
