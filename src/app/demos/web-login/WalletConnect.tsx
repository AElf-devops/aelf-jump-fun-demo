'use client';
import { useConnectWallet } from '@aelf-web-login/wallet-adapter-react';
import { Button } from 'aelf-design';
import { TWalletInfo } from '@aelf-web-login/wallet-adapter-base';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/lib/reduxToolkit/hooks';
import {
  deleteWalletInfo,
  getWalletInfo,
  setWalletInfo,
} from '@/app/lib/reduxToolkit/features/walletConnect/walletConnectSlice';
import WebLoginProvider from './providers';

export default function Page() {
  return (
    <WebLoginProvider>
      <div>
        <WalletConnect />
      </div>
      <div>
        <WalletConnectWithRTK />
      </div>
    </WebLoginProvider>
  );
}

const WalletConnect = () => {
  const [walletConnected, setWalletConnected] = useState<TWalletInfo | null>();

  const { connectWallet, disConnectWallet, walletInfo } = useConnectWallet();
  const onConnectBtnClickHandler = async () => {
    try {
      const rs = await connectWallet();
      setWalletConnected(formatWalletInfo(rs));
      console.log('rs: ', rs);
    } catch (e: any) {
      console.log(e.message);
    }
  };
  const onDisConnectBtnClickHandler = async () => {
    await disConnectWallet();
    setWalletConnected(null);
  };

  return (
    <>
      <Button onClick={onConnectBtnClickHandler}>connect</Button>
      <Button onClick={onDisConnectBtnClickHandler}>disconnect</Button>
      <div>Account name: {walletConnected?.name}</div>
      <div>Account name: {walletConnected?.address}</div>
      <div>walletInfo: {JSON.stringify(walletInfo)}</div>
    </>
  );
};

const WalletConnectWithRTK = () => {
  const dispatch = useAppDispatch();
  const walletConnected = useAppSelector(getWalletInfo);
  const { connectWallet, disConnectWallet, walletInfo } = useConnectWallet();
  const onConnectBtnClickHandler = async () => {
    try {
      const rs = await connectWallet();
      dispatch(setWalletInfo(formatWalletInfo(rs)));
      console.log('walletConnected rs: ', rs);
    } catch (e: any) {
      console.log(e.message);
    }
  };
  const onDisConnectBtnClickHandler = async () => {
    await disConnectWallet();
    dispatch(deleteWalletInfo());
  };
  console.log('walletConnected: ', walletConnected);
  return (
    <>
      <div className="mt-12">
        We can see the changes of the account name and address in the left
        sidebar.
      </div>
      <Button onClick={onConnectBtnClickHandler}>connect</Button>
      <Button onClick={onDisConnectBtnClickHandler}>disconnect</Button>
      <div>Account name: {walletConnected?.name}</div>
      <div>Account name: {walletConnected?.address}</div>
      <div>walletInfo: {JSON.stringify(walletInfo)}</div>
    </>
  );
};

/**
 * @description
 * If we do not format the data, we will get the error follow.
 * RTK: A non-serializable value was detected in an action;
 * @param walletInfo
 */
function formatWalletInfo(walletInfo: TWalletInfo) {
  return {
    name: walletInfo?.name || '-',
    address: walletInfo?.address || '-',
  };
}
