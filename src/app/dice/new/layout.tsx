'use client';
import WebLoginProvider from '@/app/demos/web-login/providers';
import { DiceMethods, TransferDemo } from '@/app/dice/TransferDemo';

export default function Layout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <WebLoginProvider>
      {children}
      <TransferDemo />
      <DiceMethods />
    </WebLoginProvider>
  );
}
