import BigNumber from "bignumber.js";
import { JUMP_FUN_CONFIG } from "../config";
import { CONTRACT_ADDRESS } from "../configOnline";
import { useConnectWallet } from "@aelf-web-login/wallet-adapter-react";
import useSWR from "swr";

interface UseTokenPriceProps {
  ticker: string;
  type: "buy" | "sell";
  amount: string;
}

const useTokenPrice = ({
  ticker,
  type,
  amount,
}: UseTokenPriceProps) => {
  const { walletInfo, callViewMethod } = useConnectWallet();

  return useSWR(`usetokenprice-${ticker}-${type}-${amount}`, async () => {
    if (!walletInfo?.address) {
      return 0;
    }

    const rs = await callViewMethod({
      chainId: "tDVW",
      contractAddress: CONTRACT_ADDRESS.BUYSELL,
      methodName: type === "buy" ? "GetAmountForBuy" : "GetAmountForSell",
      args: {
        ticker,
        amount: new BigNumber(amount).multipliedBy(10 ** JUMP_FUN_CONFIG.DECIMAL).toString(10),
      },
    });

    return new BigNumber((rs as any).data.value).dividedBy(10 ** JUMP_FUN_CONFIG.DECIMAL);
  })
};

export default useTokenPrice;