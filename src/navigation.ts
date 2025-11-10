import {createLocalizedPathnamesNavigation} from 'next-intl/navigation';
 
export const locales = ['en', 'ar'] as const;
 
// The `pathnames` object holds pairs of internal
// and external paths, separated by locale.
export const pathnames = {
  // If all locales use the same path, use the
  // shared `internal` route definition.
  '/': '/',
  '/trip-planner': '/trip-planner',
  '/assistant': '/assistant',
  '/maps': '/maps',
  '/support': '/support',
  '/hosts': '/hosts',
  '/translate': '/translate',
  '/passport': '/passport',
};
 
export const {Link, redirect, usePathname, useRouter} =
  createLocalizedPathnamesNavigation({locales, pathnames});