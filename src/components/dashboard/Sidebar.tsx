// components/dashboard/Sidebar.tsx
'use client';

import type { ComponentType, SVGProps } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SparklesIcon, ClockIcon, Cog6ToothIcon, QuestionMarkCircleIcon,
  ChevronLeftIcon, ChevronRightIcon
} from '@heroicons/react/24/outline';

type IconType = ComponentType<SVGProps<SVGSVGElement>>;
type NavItem = { href: string; label: string; Icon: IconType };

const navItems = (base:string): NavItem[] => ([
  { href: `/${base}/dashboard`,          label: 'Generate', Icon: SparklesIcon },
  { href: `/${base}/dashboard/history`,  label: 'History',  Icon: ClockIcon },
  { href: `/${base}/dashboard/settings`, label: 'Settings', Icon: Cog6ToothIcon },
  { href: `/${base}/dashboard/help`,     label: 'Help',     Icon: QuestionMarkCircleIcon },
]);

export default function Sidebar({
  locale, collapsed, onToggle
}:{ locale:string; collapsed:boolean; onToggle:()=>void }) {
  const pathname = usePathname();
  const items = navItems(locale);

  return (
    <div className="flex h-[100dvh] flex-col sticky top-0">
      <div className="relative px-3 py-3">
        <div className={`text-base font-semibold transition-all ${collapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'}`}>
          ProductText
        </div>

      </div>

      <nav className={`flex-1 px-2 pt-2 space-y-1 ${collapsed ? '' : ''}`}>
        {items.map(({ href, label, Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              title={collapsed ? label : undefined}
              className={[
                'group flex items-center rounded-md px-3 py-2 text-sm no-underline transition-colors',
                collapsed ? 'justify-center' : 'gap-3',
                active
                  ? 'bg-zinc-100 font-medium text-zinc-900'
                  : 'text-zinc-600 hover:bg-zinc-100'
              ].join(' ')}
            >
              <Icon
                className={`h-5 w-5 shrink-0 ${active ? 'text-zinc-900' : 'text-zinc-500'}`}
                aria-hidden
              />
              <span
                className={[
                  'transition-[opacity,width] overflow-hidden',
                  collapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
                ].join(' ')}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </nav>

      <button
        type="button"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        aria-pressed={collapsed}
        onClick={onToggle}
        className="absolute right-4 bottom-16 inline-flex h-8 w-8 items-center justify-center rounded hover:bg-zinc-100 z-20"
      >
        {collapsed ? (
          <ChevronRightIcon className="h-5 w-5 text-zinc-700" />
        ) : (
          <ChevronLeftIcon className="h-5 w-5 text-zinc-700" />
        )}
      </button>

      <div className="border-t border-zinc-200 p-2">
        <button
          className={[
            'w-full rounded-md px-3 py-2 text-left text-sm hover:bg-zinc-100',
            collapsed ? 'text-center px-0' : ''
          ].join(' ')}
          title={collapsed ? 'Sign out' : undefined}
        >
          {collapsed ? '⎋' : 'Sign out'}
        </button>
      </div>
    </div>
  );
}
