// app/error.tsx v0.0.8 - Apple Style
'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log only the error message in production to avoid leaking stack traces
    if (process.env.NODE_ENV === 'development') {
      console.error('[ErrorBoundary]', error);
    } else {
      console.error('[ErrorBoundary]', error.message, error.digest);
    }
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
      <h2
        className="text-2xl font-bold mb-3"
        style={{ color: 'var(--destructive, #ff3b30)' }}
      >
        Something went wrong
      </h2>
      <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-sm">
        We encountered an unexpected error.  Please try again.
      </p>
      <button
        onClick={() => reset()}
        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium text-white transition-opacity hover:opacity-80"
        style={{ backgroundColor: 'var(--primary, #0071e3)' }}
      >
        Try again
      </button>
    </div>
  );
}
