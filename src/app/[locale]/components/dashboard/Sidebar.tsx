'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = (base: string) => ([
  { href: `/${base}/dashboard`, label: 'Generate' },
  { href: `/${base}/dashboard/history`, label: 'History' },
  { href: `/${base}/dashboard/settings`, label: 'Settings' },
  { href: `/${base}/dashboard/help`, label: 'Help' }
]);

export default function Sidebar({ locale }: { locale: string }) {
  const pathname = usePathname();
  const items = navItems(locale);

  return (
    <div className="flex h-[100dvh] flex-col">
      <div className="p-4 text-lg font-bold">ProductText AI</div>

      <nav className="flex-1 space-y-1 px-2">
        {items.map(item => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? 'page' : undefined}
              className={`block rounded-md px-3 py-2 text-sm hover:bg-zinc-100 ${
                active ? 'bg-zinc-100 font-medium' : 'text-zinc-600'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-zinc-200 p-3">
        <button className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-zinc-100">
          Exit
        </button>
      </div>
    </div>
  );
}
