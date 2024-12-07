import BigNumber from "bignumber.js";
import { JUMP_FUN_CONFIG } from "../config";
import { CONTRACT_ADDRESS } from "../configOnline";
import { useConnectWallet } from "@aelf-web-login/wallet-adapter-react";
import useSWR from "swr";

interface UseBalanceProps {
  symbol: string;
}

const useBalance = ({
  symbol,
}: UseBalanceProps) => {
  const { walletInfo, callViewMethod } = useConnectWallet();

  return useSWR(`${walletInfo?.address}-${symbol}`, async () => {
    if (!walletInfo?.address) {
      return new BigNumber(0);
    }

    const rs: {data: {balance: string}} | null = await callViewMethod({
      chainId: JUMP_FUN_CONFIG.CHAIN_ID,
      contractAddress: CONTRACT_ADDRESS.TOKEN,
      methodName: "GetBalance",
      args: {
        symbol,
        owner: walletInfo.address,
      },
    });
    return new BigNumber(rs?.data.balance || 0).dividedBy(10 ** JUMP_FUN_CONFIG.DECIMAL);
  })
};

export default useBalance;
