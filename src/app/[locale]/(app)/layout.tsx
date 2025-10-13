import type { ReactNode } from 'react';
import '@/app/globals.css';
import Sidebar from '../components/dashboard/Sidebar';
import Topbar from '../components/dashboard/Topbar';

export const metadata = {
  title: 'ProductText AI',
  description: 'AI descriptions'
}

export default function RootLayout({
   children,
   params: { locale }
 }: {
  children: ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={locale}>
    <body className="min-h-[100dvh] bg-white text-zinc-900">
    <div className="grid min-h-[100dvh] grid-cols-[18rem_1fr]">
      <aside className="border-r border-zinc-200 bg-white">
        <Sidebar locale={locale} />
      </aside>

      <div className="flex min-w-0 flex-col">
        <Topbar locale={locale} />
        <main className="p-6">{children}</main>
      </div>
    </div>
    </body>
    </html>
  );
}
