// app/components/ErrorBoundary.tsx v0.0.7
'use client';

import React, { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    if (process.env.NODE_ENV === 'development') {
      console.error('[ErrorBoundary] Rendering error:', error, info);
    }
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div
          role="alert"
          className="flex min-h-[300px] items-center justify-center p-6"
        >
          <div className="w-full max-w-md rounded-3xl bg-white/80 p-8 text-center shadow-xl ring-1 ring-black/5 backdrop-blur dark:bg-slate-800/80 dark:ring-white/10">
            <h2 className="mb-2 text-xl font-semibold text-slate-900 dark:text-white">
              Something went wrong
            </h2>
            <p className="mb-6 text-sm text-slate-600 dark:text-slate-300">
              We hit an unexpected error while rendering this section.  You
              can try refreshing, or continue exploring other features.
            </p>
            <button
              type="button"
              onClick={this.handleReset}
              className="rounded-full px-5 py-2 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
              style={{ backgroundColor: '#0071e3' }}
            >
              Try again
            </button>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <pre className="mt-4 overflow-auto rounded-xl bg-slate-900 p-3 text-left text-xs text-slate-100">
                {String(this.state.error)}
              </pre>
            )}
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
