/**
 * 1. need to turn nav-links.tsx into a Client Component.
 * 2. with a Suspense boundary
 * https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
 */
'use client';
import { usePathname, useSearchParams } from 'next/navigation';
import { Spin } from 'antd';
import { Suspense } from 'react';
import Link from 'next/link';

function SearchParams() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  return (
    <>
      <Link href="/demos?id=2024">Click Me</Link>
      <p>path: {pathname}</p>
      <p>searchParams: {searchParams.get('id')}</p>
    </>
  );
}

export default function NavLinks() {
  return (
    <Suspense fallback={<Spin />}>
      <SearchParams />
    </Suspense>
  );
}
