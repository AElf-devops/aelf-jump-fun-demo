import { useConnectWallet } from '@aelf-web-login/wallet-adapter-react';
import { getTxResultRetry } from '@aelf-web-login/utils';
import { message } from 'antd';
import { useEffect, useState } from 'react';
import Bignumber from 'bignumber.js';
import { DICE_GAME_CONFIG } from './config';

const {
  DICE_CONTRACT_ADDRESS,
  TOKEN_CONTRACT_ADDRESS,
  CHAIN_ID,
  EXPLORE_URL,
} = DICE_GAME_CONFIG;

export function useTokenMethod() {
  const { callSendMethod, callViewMethod, walletInfo } = useConnectWallet();

  const getTokenInfo = async () => {
    // const res = await callSendMethod({
    const res: any = await callViewMethod({
      chainId: CHAIN_ID,
      contractAddress: TOKEN_CONTRACT_ADDRESS,
      methodName: 'GetTokenInfo',
      args: {
        symbol: 'ELF',
      },
    });
    return res.data;
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
    const res: any = await callSendMethod({
      chainId: CHAIN_ID,
      contractAddress: TOKEN_CONTRACT_ADDRESS,
      methodName: 'Approve',
      args: {
        symbol: 'ELF',
        amount: new Bignumber(10).multipliedBy(1e8).toString(),
        spender: DICE_CONTRACT_ADDRESS,
      },
    });
    console.log('setAllowance: ', res);
    const txResult = await getTxResultRetry(
      res.transactionId,
      EXPLORE_URL,
    );
    return res;
  };

  return {
    getAllowance,
    setAllowance,
    getTokenInfo,
  };
}

export function useDiceMethods() {
  const { callSendMethod, callViewMethod, walletInfo } = useConnectWallet();
  const { setAllowance } = useTokenMethod();
  const [playerInfo, setPlayerInfo] = useState({
    score: 0,
    highscore: 0,
  });

  const getPlayerInfo = async () => {
    if (!walletInfo) {
      message.error('Please login');
      return {};
    }
    // const res = await callSendMethod({
    try {
      const res: any = await callViewMethod({
        chainId: CHAIN_ID,
        contractAddress: DICE_CONTRACT_ADDRESS,
        methodName: 'GetPlayerInfo',
        args: walletInfo.address,
      });
      console.log('getPlayerInfo:', res);
      setPlayerInfo(res.data);
      return res.data;
    } catch (e) {
      console.log('getPlayerInfo:', 'no info yet');
      // setPlayerInfo({});
      return {};
    }
  };

  useEffect(() => {
    if (!walletInfo) {
      return;
    }
    const main = async () => {
      await getPlayerInfo();
    };
    main();
  }, [walletInfo]);

  const play = async () => {
    // await setAllowance();
    const res: any = await callSendMethod({
      chainId: CHAIN_ID,
      contractAddress: DICE_CONTRACT_ADDRESS,
      methodName: 'Play',
      args: '',
    });
    // console.log('play: ', res);
    // const txResult = await getTxResultRetry(
    await getTxResultRetry(res.transactionId, EXPLORE_URL);
    // console.log('txResult: ', txResult);
    await getPlayerInfo();
  };

  const reset = async () => {
    const playInfo: any = await getPlayerInfo();
    if (!playInfo || !playInfo.rolledTimes) {
      message.info('No play history, cat not reset');
      return;
    }
    const res = await callSendMethod({
      // const res = await callViewMethod({
      chainId: CHAIN_ID,
      contractAddress: DICE_CONTRACT_ADDRESS,
      methodName: 'Reset',
      args: '',
    });
    console.log('reset:', res);
    message.success('Reset successfully');
    // setPalyTx(res);
  };

  const [season, setSeason] = useState();
  const getSeason = async () => {
    // const res = await callSendMethod({
    const res = await callViewMethod({
      chainId: CHAIN_ID,
      contractAddress: DICE_CONTRACT_ADDRESS,
      methodName: 'GetSeason',
      args: '',
    });
    console.log('getSeason:', res);
    // setPalyTx(res);
  };

  // const getScore = async () => {
  //   // const res = await callSendMethod({
  //   const res = await callViewMethod({
  //     chainId: 'tDVW',
  //     contractAddress: DICE_CONTRACT_ADDRESS,
  //     methodName: 'GetScore',
  //     args: '',
  //   });
  //   console.log('getScore:', res);
  //   // setPalyTx(res);
  // };
  return {
    play,
    reset,
    getSeason,
    // getScore,
    getPlayerInfo,
    playerInfo,
  };
}
