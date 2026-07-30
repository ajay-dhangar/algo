import React from 'react';
import { render, screen } from '@testing-library/react';
import InfoWrapper from '../../theme/Admonition/Icon/Info';

jest.mock(
  '@theme-original/Admonition/Icon/Info',
  () => {
    return function MockOriginalInfo(props: Record<string, unknown>) {
      return <svg data-testid="original-info-icon" {...props} />;
    };
  },
  { virtual: true }
);

describe('InfoWrapper', () => {
  it('renders successfully and forwards props to original Info icon component', () => {
    render(<InfoWrapper className="custom-icon-class" aria-hidden="true" />);

    const icon = screen.getByTestId('original-info-icon');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('custom-icon-class');
    expect(icon).toHaveAttribute('aria-hidden', 'true');
  });
});
