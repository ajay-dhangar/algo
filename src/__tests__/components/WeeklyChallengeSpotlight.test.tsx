import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import WeeklyChallengeSpotlight from '../../components/WeeklyChallengeSpotlight';
import * as safeStorage from '../../utils/safeStorage';

jest.mock('@docusaurus/Link', () => {
  return ({ children, to, ...rest }: any) => (
    <a href={to} {...rest}>
      {children}
    </a>
  );
});

describe('WeeklyChallengeSpotlight Component', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('renders weekly challenge spotlight details', () => {
    render(<WeeklyChallengeSpotlight />);

    expect(screen.getByText(/Challenge of the Week/i)).toBeInTheDocument();
    expect(screen.getByText(/Solve Now/i)).toBeInTheDocument();
    expect(screen.getByText(/Mark Solved/i)).toBeInTheDocument();
  });

  it('reads solved state using safeGetItem on mount', () => {
    const safeGetSpy = jest.spyOn(safeStorage, 'safeGetItem');
    render(<WeeklyChallengeSpotlight />);

    expect(safeGetSpy).toHaveBeenCalledWith(expect.stringMatching(/^weekly_challenge_solved_/));
  });

  it('uses safeSetItem when marking challenge as solved', () => {
    const safeSetSpy = jest.spyOn(safeStorage, 'safeSetItem');
    render(<WeeklyChallengeSpotlight />);

    const markBtn = screen.getByText(/Mark Solved/i);
    fireEvent.click(markBtn);

    expect(safeSetSpy).toHaveBeenCalledWith(
      expect.stringMatching(/^weekly_challenge_solved_/),
      'solved'
    );
    expect(screen.getByText(/Solved ✅/i)).toBeInTheDocument();
  });

  it('uses safeRemoveItem when unmarking solved challenge', () => {
    const safeRemoveSpy = jest.spyOn(safeStorage, 'safeRemoveItem');
    render(<WeeklyChallengeSpotlight />);

    const markBtn = screen.getByText(/Mark Solved/i);
    // Mark as solved
    fireEvent.click(markBtn);
    expect(screen.getByText(/Solved ✅/i)).toBeInTheDocument();

    // Unmark
    fireEvent.click(screen.getByText(/Solved ✅/i));
    expect(safeRemoveSpy).toHaveBeenCalledWith(
      expect.stringMatching(/^weekly_challenge_solved_/)
    );
    expect(screen.getByText(/Mark Solved/i)).toBeInTheDocument();
  });
});
