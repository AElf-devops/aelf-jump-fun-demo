'use client';
import dynamic from 'next/dynamic';
// import WalletConnect from './WalletConnect';

const WalletConnect = dynamic(() => import('./WalletConnect'), {
  ssr: false,
});

export default function Page() {
  return <WalletConnect />;
}
