import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TreeSandbox from '../../components/Visualizing/TreeSandbox';
import { translate } from '@docusaurus/Translate';

// Mock window.alert to capture alert text
const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

describe('TreeSandbox Component & Translation Interpolation', () => {
  beforeEach(() => {
    alertSpy.mockClear();
  });

  afterAll(() => {
    alertSpy.mockRestore();
  });

  test('translate helper correctly interpolates placeholders with 2-argument signature', () => {
    const result1 = translate({ message: 'Key {key} already exists in the tree!' }, { key: 42 });
    expect(result1).toBe('Key 42 already exists in the tree!');

    const result2 = translate({ message: 'Starting {type} traversal on root.' }, { type: 'PRE' });
    expect(result2).toBe('Starting PRE traversal on root.');

    const result3 = translate(
      { message: 'Stage 1: Left rotated child {childKey}. Now preparing to Right Rotate parent {nodeKey}.' },
      { childKey: 10, nodeKey: 30 }
    );
    expect(result3).toBe('Stage 1: Left rotated child 10. Now preparing to Right Rotate parent 30.');
  });

  test('renders TreeSandbox and handles node insertion without unrendered placeholders', async () => {
    render(<TreeSandbox />);

    expect(screen.getByText(/BST & AVL Self-Balancing Tree Sandbox/i)).toBeInTheDocument();

    const input = screen.getByRole('spinbutton');
    const insertBtn = screen.getByRole('button', { name: /^Insert$/i });

    // Insert key 10
    fireEvent.change(input, { target: { value: '10' } });
    fireEvent.click(insertBtn);

    // Verify step description does not contain raw unrendered placeholders
    await waitFor(() => {
      const stepLog = screen.queryByText(/Preparing to insert key 10/i);
      expect(stepLog).toBeInTheDocument();
      expect(stepLog?.textContent).not.toContain('{key}');
    });

    // Attempt duplicate insertion of key 10 -> Alert should show interpolated key 10
    fireEvent.change(input, { target: { value: '10' } });
    fireEvent.click(insertBtn);

    const duplicateAlert = await screen.findByText('Key 10 already exists in the tree!');
    expect(duplicateAlert).toBeInTheDocument();
  });

  test('handles node deletion alerts with interpolated values', async () => {
    render(<TreeSandbox />);

    const input = screen.getByRole('spinbutton');
    const deleteBtn = screen.getByRole('button', { name: /^Delete$/i });

    // Delete key 99 which does not exist in an empty tree
    fireEvent.change(input, { target: { value: '99' } });
    fireEvent.click(deleteBtn);

    const deleteAlert = await screen.findByText('Key 99 does not exist in the tree!');
    expect(deleteAlert).toBeInTheDocument();
  });
});
