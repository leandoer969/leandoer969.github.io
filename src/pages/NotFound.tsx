import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NotFound: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <section className="bg-bg flex min-h-screen items-center justify-center px-6">
      <div className="border-default bg-surface-1 w-full max-w-2xl rounded-3xl border p-8 text-center">
        <p className="text-small text-muted font-semibold uppercase tracking-wide">
          404
        </p>
        <h1 className="text-h1 font-display text-ink mt-2 text-balance">
          Page not found
        </h1>
        <p className="text-body text-muted mt-3">
          We couldn’t find{' '}
          <span className="text-ink font-mono">{pathname}</span>.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            to="/"
            className="focus-ring border-default bg-surface-1 text-small text-ink rounded-2xl border px-4 py-2 font-medium hover:opacity-95"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
