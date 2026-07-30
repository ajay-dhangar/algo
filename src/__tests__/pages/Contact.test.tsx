import React from 'react';
import { render, screen } from '@testing-library/react';
import Contact from '../../pages/contact/index';

jest.mock('../../utils/supabaseClient', () => ({
  supabase: {
    from: jest.fn(() => ({
      insert: jest.fn().mockResolvedValue({ error: null }),
    })),
  },
}));

describe('Contact Page', () => {
  it('renders successfully without throwing', () => {
    render(<Contact />);
    expect(screen.getByText('VOICE INTEGRATE')).toBeInTheDocument();
  });

  it('renders the Voice Interface Node icon with exactly one d attribute on its path element', () => {
    const { container } = render(<Contact />);
    const voiceCardHeading = screen.getByText('VOICE INTEGRATE');
    const voiceCard = voiceCardHeading.closest('div.min-w-0')?.parentElement;

    expect(voiceCard).toBeTruthy();
    const svgElement = voiceCard?.querySelector('svg');
    expect(svgElement).toBeTruthy();

    const pathElements = svgElement?.querySelectorAll('path');
    expect(pathElements?.length).toBe(1);

    const path = pathElements?.[0];
    expect(path).toBeTruthy();
    expect(path?.hasAttribute('d')).toBe(true);

    const dAttributeValue = path?.getAttribute('d');
    expect(dAttributeValue).toBe(
      'M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-6 15h9'
    );
    expect(dAttributeValue).not.toContain('6.622k');
  });
});
