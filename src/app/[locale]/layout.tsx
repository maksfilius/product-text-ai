import type { ReactNode } from 'react';
import '../globals.css';

export const metadata = {
  title: 'ProductText AI',
  description: 'AI descriptions'
}

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <html lang={locale}>
      <body className="m-0 min-h-[100dvh] bg-white text-zinc-900">{children}</body>
    </html>
  )
}
