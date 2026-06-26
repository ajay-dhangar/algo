import { useEffect, useRef } from 'react';

export default function useFocusTrap(isActive: boolean) {
  const ref = useRef<any>(null);

  useEffect(() => {
    if (!isActive) return;

    const focusableElementsString =
      'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';

    const element = ref.current;
    if (!element) return;

    const focusableElements = element.querySelectorAll(focusableElementsString);
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    const previousActiveElement = document.activeElement as HTMLElement | null;

    setTimeout(() => {
      if (firstElement) firstElement.focus();
    }, 10);

    element.addEventListener('keydown', handleTabKey);

    return () => {
      element.removeEventListener('keydown', handleTabKey);
      if (previousActiveElement) {
        previousActiveElement.focus();
      }
    };
  }, [isActive]);

  return ref;
}
