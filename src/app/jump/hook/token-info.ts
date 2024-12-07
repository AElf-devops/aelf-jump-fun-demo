import { JUMP_FUN_CONFIG } from "../config";
import { CONTRACT_ADDRESS } from "../configOnline";
import { useConnectWallet } from "@aelf-web-login/wallet-adapter-react";
import useSWR from "swr";

interface UseTokenInfoProps {
  symbol: string;
}

const useTokenInfo = ({
  symbol,
}: UseTokenInfoProps) => {
  const { callViewMethod } = useConnectWallet();

  return useSWR(`tokeninfo-${symbol}`, async () => {
    const rs = await callViewMethod({
      chainId: JUMP_FUN_CONFIG.CHAIN_ID,
      contractAddress: CONTRACT_ADDRESS.TOKEN,
      methodName: "GetTokenInfo",
      args: {
        symbol,
      },
    });
    return rs.data;
  })
};

export default useTokenInfo;
