import React, { useEffect, useCallback } from 'react';
import { useAriaAnnouncer } from '../../hooks/useAriaAnnouncer';

export interface AccessibleVisualizerWrapperProps {
  title: string;
  currentStep: number;
  totalSteps: number;
  isPlaying: boolean;
  onPlayPause: () => void;
  onPrevStep: () => void;
  onNextStep: () => void;
  onFirstStep?: () => void;
  onLastStep?: () => void;
  stepDescription?: string;
  speed?: number;
  onSpeedChange?: (speed: number) => void;
  children: React.ReactNode;
  className?: string;
}

export function isInteractiveInput(element: Element | null): boolean {
  if (!element) return false;
  const tagName = element.tagName.toLowerCase();
  if (['input', 'textarea', 'select'].includes(tagName)) return true;
  if (element.getAttribute('contenteditable') === 'true') return true;
  if (element.closest('.monaco-editor, [role="code"], [role="textbox"]')) return true;
  return false;
}

export default function AccessibleVisualizerWrapper({
  title,
  currentStep,
  totalSteps,
  isPlaying,
  onPlayPause,
  onPrevStep,
  onNextStep,
  onFirstStep,
  onLastStep,
  stepDescription,
  speed,
  onSpeedChange,
  children,
  className = '',
}: AccessibleVisualizerWrapperProps) {
  const { announce } = useAriaAnnouncer();

  // Announce step descriptions on step changes
  useEffect(() => {
    if (stepDescription) {
      announce(`Step ${currentStep + 1} of ${totalSteps}. ${stepDescription}`);
    } else if (totalSteps > 0) {
      announce(`Step ${currentStep + 1} of ${totalSteps}`);
    }
  }, [currentStep, totalSteps, stepDescription, announce]);

  // Global keyboard shortcuts for visualizer navigation
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Ignore if focus is in an input or text field
      if (isInteractiveInput(document.activeElement)) {
        return;
      }

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          onPrevStep();
          break;
        case 'ArrowRight':
          event.preventDefault();
          onNextStep();
          break;
        case ' ':
        case 'Spacebar':
          event.preventDefault();
          onPlayPause();
          break;
        case 'Home':
          event.preventDefault();
          if (onFirstStep) onFirstStep();
          else if (currentStep !== 0) onPrevStep();
          break;
        case 'End':
          event.preventDefault();
          if (onLastStep) onLastStep();
          else if (currentStep !== totalSteps - 1) onNextStep();
          break;
        default:
          break;
      }
    },
    [onPrevStep, onNextStep, onPlayPause, onFirstStep, onLastStep, currentStep, totalSteps]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div
      role="region"
      aria-label={`${title} Visualizer`}
      className={`accessible-visualizer-container ${className}`}
    >
      {/* Keyboard Shortcuts Instruction Badge for Assistive Technology */}
      <div className="sr-only">
        Keyboard controls available: Left Arrow for previous step, Right Arrow for next step, Space for play or pause, Home for first step, End for final step.
      </div>

      {children}

      {/* Accessible Control Bar */}
      <div
        role="group"
        aria-label="Algorithm Controls"
        className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-900 border-t border-slate-800 rounded-b-xl text-white text-xs font-mono"
      >
        <div className="flex items-center gap-2">
          {onFirstStep && (
            <button
              type="button"
              onClick={onFirstStep}
              disabled={currentStep === 0}
              aria-label="Jump to first step"
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              ⏮ First
            </button>
          )}

          <button
            type="button"
            onClick={onPrevStep}
            disabled={currentStep === 0}
            aria-label="Previous step"
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            ◀ Prev
          </button>

          <button
            type="button"
            onClick={onPlayPause}
            aria-label={isPlaying ? 'Pause visualization' : 'Play visualization'}
            className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 font-bold transition-colors"
          >
            {isPlaying ? '⏸ Pause' : '▶ Play'}
          </button>

          <button
            type="button"
            onClick={onNextStep}
            disabled={totalSteps === 0 || currentStep >= totalSteps - 1}
            aria-label="Next step"
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Next ▶
          </button>

          {onLastStep && (
            <button
              type="button"
              onClick={onLastStep}
              disabled={totalSteps === 0 || currentStep >= totalSteps - 1}
              aria-label="Jump to final step"
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              ⏭ Last
            </button>
          )}
        </div>

        {/* Step Progress & Slider */}
        <div className="flex items-center gap-3">
          <span aria-live="polite" className="text-slate-400 font-semibold">
            Step {totalSteps > 0 ? currentStep + 1 : 0} / {totalSteps}
          </span>

          <input
            type="range"
            min={0}
            max={Math.max(0, totalSteps - 1)}
            value={currentStep}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (val < currentStep) {
                for (let i = currentStep; i > val; i--) onPrevStep();
              } else if (val > currentStep) {
                for (let i = currentStep; i < val; i++) onNextStep();
              }
            }}
            role="slider"
            aria-label="Visualization step progress"
            aria-valuemin={0}
            aria-valuemax={Math.max(0, totalSteps - 1)}
            aria-valuenow={currentStep}
            aria-valuetext={`Step ${totalSteps > 0 ? currentStep + 1 : 0} of ${totalSteps}`}
            className="w-28 cursor-pointer accent-indigo-500"
          />

          {speed !== undefined && onSpeedChange && (
            <div className="flex items-center gap-1.5">
              <label htmlFor="speed-slider" className="text-slate-400">
                Speed:
              </label>
              <input
                id="speed-slider"
                type="range"
                min={200}
                max={2000}
                step={100}
                value={2200 - speed}
                onChange={(e) => onSpeedChange(2200 - Number(e.target.value))}
                role="slider"
                aria-label="Playback speed"
                aria-valuemin={200}
                aria-valuemax={2000}
                aria-valuenow={2200 - speed}
                aria-valuetext={`${speed} milliseconds per step`}
                className="w-20 cursor-pointer accent-indigo-500"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
