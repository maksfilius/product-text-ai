import type { ReactNode } from 'react';
import '@/app/globals.css';
import AppShell from '@/components/dashboard/AppShell';

export default async function AppLayout({
    children, params
  }:{
    children: ReactNode;
    params: Promise<{ locale: string }>;}
) {
  const { locale } = await params;
  return (
    <AppShell locale={locale}>{children}</AppShell>
  );
}
