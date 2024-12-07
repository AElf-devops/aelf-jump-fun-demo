import { useState, useCallback, useEffect } from "react";
import { BalanceData, DataResponse, TokenInfoData } from "../types";
import { JUMP_FUN_CONFIG } from "../config";
import { CONTRACT_ADDRESS } from "../configOnline";
import {
  ICallContractParams,
  TWalletInfo,
} from "@aelf-web-login/wallet-adapter-base";
import { callViewMethod as callViewMethodOfUtils } from "@aelf-web-login/utils";
const INITAIL_BALANCEDATA = {
  symbol: JUMP_FUN_CONFIG.SYMBOL,
  owner: "",
  balance: "0",
};
interface UseBalanceProps {
  callViewMethod: (params: ICallContractParams<any>) => Promise<any>;
  walletInfo?: TWalletInfo;
  loadingSetter?: (loading: boolean) => void;
}

export const useBalance = ({
  callViewMethod,
  walletInfo,
  loadingSetter,
}: UseBalanceProps) => {
  const [balanceData, setBalanceData] =
    useState<BalanceData>(INITAIL_BALANCEDATA);

  const getBalance = useCallback(async () => {
    if (!walletInfo?.address) {
      return INITAIL_BALANCEDATA;
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
      return rs;
    } catch (e) {
      console.log(e, "e");
      return INITAIL_BALANCEDATA;
    } finally {
      loadingSetter?.(false);
    }
  }, [callViewMethod, walletInfo?.address, loadingSetter]);

  useEffect(() => {
    const getInfo = async () => {
      const balanceRes = await getBalance();
      setBalanceData((balanceRes as DataResponse<BalanceData>)?.data);
    };
    getInfo();
  }, [getBalance, walletInfo?.address]);

  return { balanceData, getBalance };
};

interface UseDecimalHookParams {
  callViewMethod: (params: ICallContractParams<any>) => Promise<any>;
  walletInfo: any;
}

export const useDecimal = ({
  callViewMethod,
  walletInfo,
}: UseDecimalHookParams) => {
  const [decimal, setDecimal] = useState<number>(JUMP_FUN_CONFIG.DECIMAL);
  const [loading, setLoading] = useState<boolean>(false);

  const getDecimal = useCallback(async () => {
    try {
      setLoading(true);
      const rs = await callViewMethod({
        chainId: JUMP_FUN_CONFIG.CHAIN_ID,
        contractAddress: CONTRACT_ADDRESS.TOKEN,
        methodName: "GetTokenInfo",
        args: {
          symbol: JUMP_FUN_CONFIG.SYMBOL,
        },
      });
      return rs;
    } catch (e) {
      return JUMP_FUN_CONFIG.SYMBOL;
    } finally {
      setLoading(false);
    }
  }, [callViewMethod, JUMP_FUN_CONFIG, CONTRACT_ADDRESS]);

  useEffect(() => {
    const getInfo = async () => {
      const decimalRes = await getDecimal();
      setDecimal((decimalRes as DataResponse<TokenInfoData>)?.data?.decimals);
    };
    getInfo();
  }, [getDecimal, walletInfo]);

  return { decimal, loading };
};
