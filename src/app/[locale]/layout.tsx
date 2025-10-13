import type { ReactNode } from 'react';
import '@/app/globals.css';

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
      <body>{children}</body>
    </html>
  )
}
