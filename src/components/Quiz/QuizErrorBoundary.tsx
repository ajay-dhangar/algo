import React, { Component, ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string;
  isMounted: boolean;
}

class QuizErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    errorMessage: "",
    isMounted: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMessage: error.message, isMounted: true };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Quiz Error:", error, errorInfo);
  }

  public componentDidMount() {
    this.setState({ isMounted: true });
  }

  public render() {
    let content;
    if (this.state.hasError) {
      content = (
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center p-8 mt-12 bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-200 dark:border-red-900/50">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Something went wrong</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-6 text-center">
            There was an error loading the quiz. Please try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl transition-colors"
          >
            Try Again
          </button>
        </div>
      );
    } else {
      content = this.props.children;
    }

    return (
      <>
        {content}
        {this.state.isMounted && <ToastContainer theme="dark" position="top-right" toastClassName="font-mono text-sm" />}
      </>
    );
  }
}

export default QuizErrorBoundary;
