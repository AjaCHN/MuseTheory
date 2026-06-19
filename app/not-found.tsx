// app/not-found.tsx v0.0.8
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
      <p
        className="text-sm font-semibold tracking-widest uppercase mb-4"
        style={{ color: 'var(--muted-foreground, #86868b)' }}
      >
        404
      </p>
      <h1
        className="text-5xl font-light tracking-tight mb-4"
        style={{
          fontFamily: 'Cormorant, Georgia, serif',
          letterSpacing: '-0.04em',
        }}
      >
        Page not found
      </h1>
      <p
        className="text-base font-light max-w-xs mb-10"
        style={{ color: 'var(--muted-foreground, #86868b)' }}
      >
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium text-white transition-opacity hover:opacity-80"
        style={{ backgroundColor: 'var(--primary, #0071e3)' }}
      >
        Back to home
      </Link>
    </div>
  );
}
