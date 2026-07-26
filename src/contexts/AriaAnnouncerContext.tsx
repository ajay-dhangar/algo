import React, { createContext, useState, useCallback, useRef } from 'react';

export type Politeness = 'polite' | 'assertive';

export interface AriaAnnouncerContextType {
  announce: (message: string, politeness?: Politeness) => void;
  clearAnnouncement: () => void;
}

export const AriaAnnouncerContext = createContext<AriaAnnouncerContextType>({
  announce: () => {},
  clearAnnouncement: () => {},
});

export const AriaAnnouncerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [politeMessage, setPoliteMessage] = useState('');
  const [assertiveMessage, setAssertiveMessage] = useState('');
  const lastMessageRef = useRef<string>('');
  const lastAnnounceTimeRef = useRef<number>(0);

  const announce = useCallback((message: string, politeness: Politeness = 'polite') => {
    if (!message || message.trim() === '') return;

    const now = Date.now();
    // Throttle duplicate/rapid messages within 150ms
    if (message === lastMessageRef.current && now - lastAnnounceTimeRef.current < 150) {
      return;
    }

    lastMessageRef.current = message;
    lastAnnounceTimeRef.current = now;

    if (politeness === 'assertive') {
      setAssertiveMessage('');
      // Force DOM update tick for screen readers
      setTimeout(() => setAssertiveMessage(message), 10);
    } else {
      setPoliteMessage('');
      setTimeout(() => setPoliteMessage(message), 10);
    }
  }, []);

  const clearAnnouncement = useCallback(() => {
    setPoliteMessage('');
    setAssertiveMessage('');
    lastMessageRef.current = '';
  }, []);

  return (
    <AriaAnnouncerContext.Provider value={{ announce, clearAnnouncement }}>
      {children}
      {/* Invisible screen reader live regions */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {politeMessage}
      </div>
      <div className="sr-only" aria-live="assertive" aria-atomic="true">
        {assertiveMessage}
      </div>
    </AriaAnnouncerContext.Provider>
  );
};
