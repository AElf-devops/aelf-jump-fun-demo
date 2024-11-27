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
