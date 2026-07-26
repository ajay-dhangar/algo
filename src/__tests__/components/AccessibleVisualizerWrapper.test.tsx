import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AccessibleVisualizerWrapper from '../../components/Visualizing/AccessibleVisualizerWrapper';

const TestVisualizer = () => {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const total = 5;

  return (
    <AccessibleVisualizerWrapper
      title="Test Algorithm"
      currentStep={step}
      totalSteps={total}
      isPlaying={isPlaying}
      onPlayPause={() => setIsPlaying((p) => !p)}
      onPrevStep={() => setStep((s) => Math.max(0, s - 1))}
      onNextStep={() => setStep((s) => Math.min(total - 1, s + 1))}
      onFirstStep={() => setStep(0)}
      onLastStep={() => setStep(total - 1)}
      stepDescription={`Executing step ${step + 1}`}
    >
      <div data-testid="visualizer-content">Visualizer Content</div>
    </AccessibleVisualizerWrapper>
  );
};

describe('AccessibleVisualizerWrapper', () => {
  test('renders region role, accessible labels, and step status', () => {
    render(<TestVisualizer />);

    const region = screen.getByRole('region', { name: /test algorithm visualizer/i });
    expect(region).toBeInTheDocument();

    expect(screen.getByText('Visualizer Content')).toBeInTheDocument();
    expect(screen.getByText('Step 1 / 5')).toBeInTheDocument();
  });

  test('handles keyboard navigation shortcuts (Left, Right, Space, Home, End)', () => {
    render(<TestVisualizer />);

    expect(screen.getByText('Step 1 / 5')).toBeInTheDocument();

    // Right Arrow -> Next Step
    fireEvent.keyDown(window, { key: 'ArrowRight' });
    expect(screen.getByText('Step 2 / 5')).toBeInTheDocument();

    // Left Arrow -> Prev Step
    fireEvent.keyDown(window, { key: 'ArrowLeft' });
    expect(screen.getByText('Step 1 / 5')).toBeInTheDocument();

    // End Key -> Final Step
    fireEvent.keyDown(window, { key: 'End' });
    expect(screen.getByText('Step 5 / 5')).toBeInTheDocument();

    // Home Key -> First Step
    fireEvent.keyDown(window, { key: 'Home' });
    expect(screen.getByText('Step 1 / 5')).toBeInTheDocument();

    // Space Key -> Toggle Play/Pause
    const playBtn = screen.getByRole('button', { name: /play visualization/i });
    expect(playBtn).toBeInTheDocument();

    fireEvent.keyDown(window, { key: ' ' });
    expect(screen.getByRole('button', { name: /pause visualization/i })).toBeInTheDocument();
  });

  test('prevents keyboard shortcuts when typing inside text inputs', () => {
    render(
      <div>
        <input data-testid="text-input" />
        <TestVisualizer />
      </div>
    );

    const input = screen.getByTestId('text-input');
    input.focus();

    expect(screen.getByText('Step 1 / 5')).toBeInTheDocument();

    // Right arrow pressed inside input should NOT advance step
    fireEvent.keyDown(input, { key: 'ArrowRight' });
    expect(screen.getByText('Step 1 / 5')).toBeInTheDocument();
  });
});
