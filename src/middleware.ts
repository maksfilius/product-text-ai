import type {NextRequest} from 'next/server';
import {NextResponse} from 'next/server';

const LOCALES = ['en','de'];
const LOCALE_RE = /^\/(en|de)(\/|$)/;

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)']
};

export function middleware(request: NextRequest) {
  const {pathname} = request.nextUrl;

  if (LOCALE_RE.test(pathname)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${LOCALES[0]}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}
