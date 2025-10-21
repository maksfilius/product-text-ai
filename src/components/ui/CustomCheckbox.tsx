'use client';

type Props = {
  checked: boolean;
  onChange: (v: boolean) => void;
  children: React.ReactNode;
  className?: string;
};

export default function CustomCheckbox({ checked, onChange, children, className = '' }: Props) {
  return (
    <button
      type="button"
      aria-pressed={checked}
      role="checkbox"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      data-checked={checked}
      className={[
        'w-full text-left rounded-xl border px-3 py-3 transition-colors',
        'border-zinc-200 bg-white hover:bg-zinc-50',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300',
        className
      ].join(' ')}
    >
      <div className="flex items-start gap-3">
        <span
          data-checked={checked}
          className={[
            'mt-0.5 grid h-5 w-5 place-items-center rounded-sm border transition-colors',
            'border-zinc-300 text-transparent',
            'data-[checked=true]:border-zinc-900 data-[checked=true]:bg-zinc-900 data-[checked=true]:text-white'
          ].join(' ')}
        >
          <svg width="12" height="12" viewBox="0 0 20 20" aria-hidden>
            <path d="M5 10.5 8.5 14 15 6" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </span>

        <div className="flex-1">{children}</div>
      </div>
    </button>
  );
}
