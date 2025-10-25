'use client';

import * as React from 'react';

type Variant = 'primary' | 'secondary';

type Props = {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  variant?: Variant;
  className?: string;
};

export const BaseButton = React.forwardRef<HTMLButtonElement, Props>(
  (
    {
      children,
      onClick,
      type = 'button',
      variant = 'secondary',
      className = '',
    },
    ref
  ) => {
    const base =
      'inline-flex items-center justify-center gap-2 rounded-md border text-base px-3 py-2'

    const byVariant: Record<Variant, string> = {
      primary: 'bg-black text-white border-black hover:opacity-90',
      secondary: 'bg-white text-zinc-900 border-zinc-200 hover:bg-zinc-50',
    };

    return (
      <button
        ref={ref}
        type={type}
        onClick={onClick}
        className={[base, byVariant[variant], className].join(' ')}
      >
        <span>{children}</span>
      </button>
    );
  }
);
BaseButton.displayName = 'BaseButton';

