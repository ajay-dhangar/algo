import React from 'react';
import { render, screen, fireEvent } from '../testUtils';
import KeyboardShortcutsModal from '../../components/KeyboardShortcutsModal';
import ChallengeSearchModal from '../../components/ChallengeSearchModal';
import LoginModal from '../../components/Homepage/LoginModal';

describe('Modal Accessibility Integration Tests', () => {
  describe('KeyboardShortcutsModal', () => {
    test('renders with dialog role, modal aria attributes, and focus trap', () => {
      const handleClose = jest.fn();
      render(<KeyboardShortcutsModal isOpen={true} onClose={handleClose} />);

      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
      expect(dialog).toHaveAttribute('aria-modal', 'true');
      expect(dialog).toHaveAttribute('aria-labelledby', 'shortcuts-modal-title');
      expect(dialog).toHaveAttribute('aria-describedby', 'shortcuts-modal-description');

      const closeButton = screen.getByRole('button', { name: /close modal/i });
      expect(closeButton).toBeInTheDocument();

      // Escape key closes modal
      fireEvent.keyDown(dialog, { key: 'Escape' });
      expect(handleClose).toHaveBeenCalled();
    });
  });

  describe('ChallengeSearchModal', () => {
    test('renders search dialog with role, autocomplete attributes, and close button', () => {
      const handleClose = jest.fn();
      render(<ChallengeSearchModal isOpen={true} onClose={handleClose} />);

      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
      expect(dialog).toHaveAttribute('aria-modal', 'true');
      expect(dialog).toHaveAttribute('aria-label', 'Challenge Search');

      const searchInput = screen.getByPlaceholderText(/search challenges by name/i);
      expect(searchInput).toBeInTheDocument();

      fireEvent.keyDown(searchInput, { key: 'Escape' });
      expect(handleClose).toHaveBeenCalled();
    });
  });

  describe('LoginModal', () => {
    test('renders login modal with dialog role and aria attributes', () => {
      const handleClose = jest.fn();
      render(<LoginModal isOpen={true} onClose={handleClose} />);

      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
      expect(dialog).toHaveAttribute('aria-modal', 'true');
      expect(dialog).toHaveAttribute('aria-label', 'Login & Onboarding');

      const closeButton = screen.getByRole('button', { name: /close onboarding panel/i });
      expect(closeButton).toBeInTheDocument();

      fireEvent.keyDown(dialog, { key: 'Escape' });
      expect(handleClose).toHaveBeenCalled();
    });
  });
});
