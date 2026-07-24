import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { AriaAnnouncerProvider } from '../../contexts/AriaAnnouncerContext';
import { useAriaAnnouncer } from '../../hooks/useAriaAnnouncer';

const TestComponent = ({ message, politeness }: { message: string; politeness?: 'polite' | 'assertive' }) => {
  const { announce, clearAnnouncement } = useAriaAnnouncer();

  return (
    <div>
      <button onClick={() => announce(message, politeness)}>Announce</button>
      <button onClick={clearAnnouncement}>Clear</button>
    </div>
  );
};

describe('useAriaAnnouncer & AriaAnnouncerContext', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  test('renders aria-live polite and assertive region elements', () => {
    const { container } = render(
      <AriaAnnouncerProvider>
        <div>Content</div>
      </AriaAnnouncerProvider>
    );

    const politeRegion = container.querySelector('[aria-live="polite"]');
    const assertiveRegion = container.querySelector('[aria-live="assertive"]');

    expect(politeRegion).toBeInTheDocument();
    expect(assertiveRegion).toBeInTheDocument();
  });

  test('announces polite message to screen reader live region', () => {
    const { container } = render(
      <AriaAnnouncerProvider>
        <TestComponent message="Step 1. Comparing 5 and 3." politeness="polite" />
      </AriaAnnouncerProvider>
    );

    const button = screen.getByRole('button', { name: /announce/i });
    act(() => {
      fireEvent.click(button);
      jest.advanceTimersByTime(50);
    });

    const politeRegion = container.querySelector('[aria-live="polite"]');
    expect(politeRegion?.textContent).toBe('Step 1. Comparing 5 and 3.');
  });

  test('announces assertive message to assertive live region', () => {
    const { container } = render(
      <AriaAnnouncerProvider>
        <TestComponent message="Conflict detected!" politeness="assertive" />
      </AriaAnnouncerProvider>
    );

    const button = screen.getByRole('button', { name: /announce/i });
    act(() => {
      fireEvent.click(button);
      jest.advanceTimersByTime(50);
    });

    const assertiveRegion = container.querySelector('[aria-live="assertive"]');
    expect(assertiveRegion?.textContent).toBe('Conflict detected!');
  });

  test('clears announcements when clearAnnouncement is called', () => {
    const { container } = render(
      <AriaAnnouncerProvider>
        <TestComponent message="Algorithm completed" politeness="polite" />
      </AriaAnnouncerProvider>
    );

    const announceBtn = screen.getByRole('button', { name: /announce/i });
    const clearBtn = screen.getByRole('button', { name: /clear/i });

    act(() => {
      fireEvent.click(announceBtn);
      jest.advanceTimersByTime(50);
    });

    const politeRegion = container.querySelector('[aria-live="polite"]');
    expect(politeRegion?.textContent).toBe('Algorithm completed');

    act(() => {
      fireEvent.click(clearBtn);
    });
    expect(politeRegion?.textContent).toBe('');
  });
});
