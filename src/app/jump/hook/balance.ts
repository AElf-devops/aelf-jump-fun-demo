import { useState, useCallback, useEffect } from "react";
import { BalanceData } from "../types";
import { JUMP_FUN_CONFIG } from "../config";
import { CONTRACT_ADDRESS } from "../configOnline";
import {
  ICallContractParams,
  TWalletInfo,
} from "@aelf-web-login/wallet-adapter-base";
import { callViewMethod as callViewMethodOfUtils } from "@aelf-web-login/utils";

interface UseBalanceProps {
  callViewMethod: (params: ICallContractParams<any>) => Promise<any>;
  walletInfo?: TWalletInfo;
  loadingSetter?: (loading: boolean) => void;
}

const useBalance = ({
  callViewMethod,
  walletInfo,
  loadingSetter,
}: UseBalanceProps) => {
  const [balanceData, setBalanceData] = useState<BalanceData>({
    symbol: JUMP_FUN_CONFIG.SYMBOL,
    owner: "",
    balance: "0",
  });

  const getBalance = useCallback(async () => {
    if (!walletInfo?.address) {
      return 0;
    }

    try {
      loadingSetter?.(true);
      console.log({
        chainId: JUMP_FUN_CONFIG.CHAIN_ID,
        contractAddress: CONTRACT_ADDRESS.TOKEN,
        methodName: "GetBalance",
        args: {
          symbol: JUMP_FUN_CONFIG.SYMBOL,
          owner: walletInfo.address,
        },
      });
      const rs = await callViewMethod({
        chainId: JUMP_FUN_CONFIG.CHAIN_ID,
        contractAddress: CONTRACT_ADDRESS.TOKEN,
        methodName: "GetBalance",
        args: {
          symbol: JUMP_FUN_CONFIG.SYMBOL,
          owner: walletInfo.address,
        },
      });
      setBalanceData(rs);
      return rs;
    } catch (e) {
      console.log(e, "e");
      return 0;
    } finally {
      loadingSetter?.(false);
    }
  }, [callViewMethod, walletInfo?.address, loadingSetter]);

  useEffect(() => {
    getBalance();
  }, [getBalance, walletInfo?.address]);

  return { balanceData, getBalance };
};

export default useBalance;
