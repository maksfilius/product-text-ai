'use client';
import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function AppShell({ locale, children }:{
  locale: string; children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const value = window.localStorage.getItem('sidebar:collapsed');
      if (value) setCollapsed(value === '1');
    } catch {}
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      window.localStorage.setItem('sidebar:collapsed', collapsed ? '1' : '0');
    } catch {}
  }, [collapsed, mounted]);

  if (!mounted) return <div className="min-h-[100dvh]" />;

  return (
    <div
      className="grid min-h-[100dvh]"
      style={{ gridTemplateColumns: `${collapsed ? '4rem' : '12rem'} 1fr` }}
    >
      <aside className="relative z-10 border-r border-zinc-200 bg-white">
        <Sidebar
          locale={locale}
          collapsed={collapsed}
          onToggle={() => setCollapsed(v => !v)}
        />
      </aside>

      <div className="flex min-w-0 flex-col">
        <Topbar locale={locale} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
