import BigNumber from "bignumber.js";
import { JUMP_FUN_CONFIG } from "../config";

export const hiddenAddress = (str: string, frontLen = 4, endLen = 4) => {
  return `${str.substring(0, frontLen)}...${str.substring(
    str.length - endLen
  )}`;
};
export function addressFormat(
  address: string,
  prefix?: string,
  chainId?: string
) {
  if (!address) return "";
  return `${prefix || JUMP_FUN_CONFIG.SYMBOL}_${address}_${chainId || JUMP_FUN_CONFIG.CHAIN_ID}`;
}
export function formatTokenAmount(
  amount: string,
  decimals: number = JUMP_FUN_CONFIG.DECIMAL
): string {
  if (!amount) return "0";
  const divisor = new BigNumber(10).pow(decimals);
  return new BigNumber(amount).dividedBy(divisor).toString(10);
}
