'use client';

export default function Topbar({ locale }: { locale: string }) {
  const greeting = locale === 'de' ? 'Willkommen' : 'Welcome';
  return (
    <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/80 backdrop-blur">
      <div className="flex h-14 items-center justify-between px-6">
        <div className="text-sm text-zinc-500">{greeting}</div>
        <div className="flex items-center gap-2">
          <button className="rounded px-3 py-1.5 text-sm hover:bg-zinc-100">EN/DE</button>
        </div>
      </div>
    </header>
  );
}
