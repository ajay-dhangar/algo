import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class VisualizerErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Visualizer Error Boundary caught an error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '20px',
          border: '2px solid #ef4444',
          borderRadius: '8px',
          backgroundColor: '#fef2f2',
          color: '#991b1b',
          margin: '20px 0',
          fontFamily: 'system-ui, sans-serif'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#b91c1c' }}>Interactive Visualizer Error</h3>
          <p style={{ margin: '0 0 10px 0', fontSize: '14px' }}>
            Something went wrong while rendering this interactive visualization.
          </p>
          <pre style={{
            margin: 0,
            padding: '10px',
            backgroundColor: '#fee2e2',
            borderRadius: '4px',
            overflowX: 'auto',
            fontSize: '12px',
            color: '#7f1d1d',
            fontFamily: 'monospace'
          }}>
            {this.state.error?.toString()}
          </pre>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{
              marginTop: '12px',
              padding: '8px 16px',
              backgroundColor: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Retry
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export function withVisualizerErrorBoundary<T extends object>(
  WrappedComponent: React.ComponentType<T>
): React.FC<T> {
  return function SafeComponent(props: T) {
    return (
      <VisualizerErrorBoundary>
        <WrappedComponent {...props} />
      </VisualizerErrorBoundary>
    );
  };
}
