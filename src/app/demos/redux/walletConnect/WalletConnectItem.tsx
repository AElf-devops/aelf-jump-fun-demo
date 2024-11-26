'use client';

import { useAppSelector } from '@/app/lib/reduxToolkit/hooks';
import {
  getWalletName,
  getWalletAddress,
} from '@/app/lib/reduxToolkit/features/walletConnect/walletConnectSlice';

export function WalletConnectItem() {
  const walletName = useAppSelector(getWalletName);
  const walletAddress = useAppSelector(getWalletAddress);
  return (
    <>
      <div>Wallet Name: {walletName}</div>
      <div>Wallet Address: {walletAddress}</div>
    </>
  );
}
