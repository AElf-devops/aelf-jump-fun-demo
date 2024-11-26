'use client';
import React, { useState } from 'react';
import { Button } from 'aelf-design';
import { useConnectWallet } from '@aelf-web-login/wallet-adapter-react';
import { message } from 'antd';
import Bignumber from 'bignumber.js';
import { useDiceMethods } from '@/app/dice/useDiceMethods';

// testnet
// const DICE_CONTRACT_ADDRESS =
//   'SKts3XUTP3pNHFbQqQn8qEqPfRiyv4x2LBzgRT343V5Xkx8Lz';
// const TOKEN_CONTRACT_ADDRESS = 'ASh2Wt7nSEmYqnGxPPzp4pnVDU4uhj1XW9Se5VeZcX2UDdyjx';
// const CHAIN_ID = 'tDVW';

// online tDVV
const DICE_CONTRACT_ADDRESS =
  'Fg8hGbtbBkYAy7jDoa5H4oQAPvnaWaYB79ike7kp1js3PZi3M';
const TOKEN_CONTRACT_ADDRESS = '7RzVGiuVWkvL4VfVHdZfQF2Tri3sgLe9U991bohHFfSRZXuGX';
const CHAIN_ID = 'tDVV';
export function TransferDemo() {
  const { callSendMethod, callViewMethod, walletInfo } = useConnectWallet();
  const [tokenInfo, setTokenInfo] = useState<any>();

  const getTokenInfo = async () => {
    // const res = await callSendMethod({
    const res = await callViewMethod({
      chainId: CHAIN_ID,
      contractAddress: TOKEN_CONTRACT_ADDRESS,
      methodName: 'GetTokenInfo',
      args: {
        symbol: 'ELF',
      },
    });
    setTokenInfo(res);
  };

  const getAllowance = async () => {
    if (!walletInfo) {
      message.error('Please login');
      return;
    }
    // const res = await callSendMethod({
    const res: any = await callViewMethod({
      chainId: CHAIN_ID,
      contractAddress: TOKEN_CONTRACT_ADDRESS,
      methodName: 'GetAllowance',
      args: {
        symbol: 'ELF',
        owner: walletInfo.address,
        spender: DICE_CONTRACT_ADDRESS,
      },
    });
    console.log('GetAllowance: ', res);
    return res.data.allowance;
  };

  const setAllowance = async () => {
    console.log('amount', new Bignumber(100).multipliedBy(1e8).toString());
    const allowance: string = await getAllowance();
    if (new Bignumber(allowance).div(1e8).isGreaterThan(2)) {
      return;
    }
    const res = await callSendMethod({
      // const res = await callViewMethod({
      chainId: CHAIN_ID,
      contractAddress: TOKEN_CONTRACT_ADDRESS,
      methodName: 'Approve',
      args: {
        symbol: 'ELF',
        amount: new Bignumber(10).multipliedBy(1e8).toString(),
        spender: DICE_CONTRACT_ADDRESS,
      },
    });
    // setTokenInfo(res);
  };

  return (
    <>
      <Button onClick={getTokenInfo}>GetTokenInfo</Button>
      <Button onClick={getAllowance}>GetAllowance</Button>
      <Button onClick={setAllowance}>SetAllowance</Button>
      <div>TokenInfo: {JSON.stringify(tokenInfo)}</div>
    </>
  );
}

export function DiceMethods() {
  const { play, reset, getPlayerInfo, getSeason, playerInfo } =
    useDiceMethods();

  console.log('playerInfo in DiceMethods: ', playerInfo);

  return (
    <>
      <Button onClick={play}>Play</Button>
      <Button onClick={reset}>Reset</Button>
      <Button onClick={getSeason}>Get Season</Button>
      {/*<Button onClick={getScore}>Get Score</Button>*/}
      <Button onClick={getPlayerInfo}>Get PlayerInfo</Button>
      <div>{JSON.stringify(playerInfo)}</div>
    </>
  );

  // return {
  //   play,
  // };
}
