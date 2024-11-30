"use client";
import { useAppDispatch, useAppSelector } from "@/app/lib/reduxToolkit/hooks";
import {
  deleteWalletInfo,
  getWalletInfo,
  setWalletInfo,
} from "@/app/lib/reduxToolkit/features/walletConnect/walletConnectSlice";
import { TWalletInfo } from "@aelf-web-login/wallet-adapter-base";
import { useConnectWallet } from "@aelf-web-login/wallet-adapter-react";
// import { Button } from 'aelf-design';
import { useEffect } from "react";

export const onConnectBtnClickHandler = async (
  connectWallet: () => any
  // dispatch: (arg0: {
  //   payload: TWalletInfo;
  //   type: 'walletConnect/setWalletInfo';
  // }) => void,
) => {
  try {
    const rs = await connectWallet();
    // dispatch(setWalletInfo(formatWalletInfo(rs)));
    console.log("walletConnected rs: ", rs);
  } catch (e: any) {
    console.log(e.message);
  }
};
export const onDisConnectBtnClickHandler = async (
  disConnectWallet: () => any
  // dispatch: (arg0: {
  //   payload: undefined;
  //   type: 'walletConnect/deleteWalletInfo';
  // }) => void,
) => {
  await disConnectWallet();
  // dispatch(deleteWalletInfo());
};

export const WalletConnectWithRTK = () => {
  const dispatch = useAppDispatch();
  const walletConnected = useAppSelector(getWalletInfo);
  // const { connectWallet, disConnectWallet, walletInfo } = useConnectWallet();
  const { disConnectWallet, walletInfo } = useConnectWallet();
  useEffect(() => {
    if (walletInfo) {
      dispatch(setWalletInfo(formatWalletInfo(walletInfo)));
    }
  }, [dispatch, walletInfo]);
  // console.log('WalletConnectWithRTK: ', walletConnected, walletInfo);
  if (!walletInfo) {
    return "";
  }
  if (walletConnected && walletConnected?.address) {
    return (
      <div className="flex items-start">
        {/*<div className="mr-2 text-2xl text-white">*/}
        <div className="tron-glow mr-2 bg-gradient-to-r from-teal-300 to-teal-500 bg-clip-text text-2xl font-bold text-transparent">
          {/*Hello, {walletConnected.name}*/}
          Hello, zhifeng
        </div>
        <div
          // className="cursor-pointer text-white text-opacity-50"
          className="cursor-pointer text-teal-400 text-opacity-50"
          onClick={() => onDisConnectBtnClickHandler(disConnectWallet)}
        >
          Logout
        </div>
      </div>
    );
  }

  return "";
  // if (!walletConnected || !walletConnected?.name) {
  //   return (
  //     <Button
  //       type="primary"
  //       onClick={() => onConnectBtnClickHandler(connectWallet, dispatch)}
  //     >
  //       Login
  //     </Button>
  //   );
  // }
};

/**
 * @description
 * If we do not format the data, we will get the error follow.
 * RTK: A non-serializable value was detected in an action;
 * @param walletInfo
 */
function formatWalletInfo(walletInfo: TWalletInfo) {
  console.log("formatWalletInfo: , ", walletInfo);
  return {
    name: walletInfo?.name || walletInfo?.extraInfo?.nickName || "-",
    address: walletInfo?.address || "-",
  };
}
