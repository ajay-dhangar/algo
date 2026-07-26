import React, { useRef, useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useFocusTrap } from '../../hooks/useFocusTrap';

const TestModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useFocusTrap(modalRef, { isOpen, onClose });

  if (!isOpen) return null;

  return (
    <div ref={modalRef} role="dialog" aria-modal="true" data-testid="modal">
      <input data-testid="input-1" placeholder="First Field" />
      <button data-testid="btn-2">Action</button>
      <button data-testid="btn-close" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

const ModalWrapper = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button data-testid="trigger-btn" onClick={() => setIsOpen(true)}>
        Open Modal
      </button>
      <TestModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

describe('useFocusTrap', () => {
  test('focuses the first focusable element when modal opens', () => {
    render(<ModalWrapper />);

    const triggerBtn = screen.getByTestId('trigger-btn');
    triggerBtn.focus();
    expect(document.activeElement).toBe(triggerBtn);

    fireEvent.click(triggerBtn);

    const input1 = screen.getByTestId('input-1');
    expect(document.activeElement).toBe(input1);
  });

  test('traps focus inside the modal during Tab navigation', () => {
    render(<ModalWrapper />);

    fireEvent.click(screen.getByTestId('trigger-btn'));

    const input1 = screen.getByTestId('input-1');
    const btn2 = screen.getByTestId('btn-2');
    const btnClose = screen.getByTestId('btn-close');

    expect(document.activeElement).toBe(input1);

    fireEvent.keyDown(input1, { key: 'Tab' });
    btn2.focus();
    expect(document.activeElement).toBe(btn2);

    fireEvent.keyDown(btn2, { key: 'Tab' });
    btnClose.focus();
    expect(document.activeElement).toBe(btnClose);

    // Tab from last element wraps around to first element
    fireEvent.keyDown(btnClose, { key: 'Tab' });
    expect(document.activeElement).toBe(input1);
  });

  test('traps focus backwards during Shift+Tab navigation', () => {
    render(<ModalWrapper />);

    fireEvent.click(screen.getByTestId('trigger-btn'));

    const input1 = screen.getByTestId('input-1');
    const btnClose = screen.getByTestId('btn-close');

    expect(document.activeElement).toBe(input1);

    // Shift + Tab from first element wraps to last element
    fireEvent.keyDown(input1, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(btnClose);
  });

  test('dismisses modal when Escape key is pressed', () => {
    render(<ModalWrapper />);

    fireEvent.click(screen.getByTestId('trigger-btn'));
    expect(screen.getByTestId('modal')).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });
});
