import { NetworkEnum, TChainId } from "@aelf-web-login/wallet-adapter-base";

/**
 * online config
 */

const CHAIN_ID: TChainId = "AELF";
const EXPLORE_URL = "https://aelf-test-node.aelf.io/";
const SYMBOL = "ELF";
const DECIMAL = 8;
const JUMP_FUN_CONFIG = {
  CHAIN_ID,
  EXPLORE_URL,
  SYMBOL,
  DECIMAL,
};

// Portkey
const NETWORK_TYPE = NetworkEnum.TESTNET;
const GRAPHQL_SERVER =
  "https://dapp-aa-portkey-test.portkey.finance/aefinder-v2/api/app/graphql/portkey";
const CONNECT_SERVER = "https://auth-aa-portkey-test.portkey.finance";
const SERVICE_SERVER = "https://aa-portkey-test.portkey.finance";

const PORTKEY_CONFIG = {
  NETWORK_TYPE,
  GRAPHQL_SERVER,
  CONNECT_SERVER,
  SERVICE_SERVER,
};

const CONTRACT_ADDRESS = {
  TOKEN: "JRmBduh4nXWi1aXgdUsj5gJrzeZb2LxmrAbf7W99faZSvoAaE",
  JUMPFUN: "qjMGy98AHDbnGGg66TuMw6PkafY18B1Y9ZeqdKVYkzEERYNML",
};
export { JUMP_FUN_CONFIG, PORTKEY_CONFIG, CONTRACT_ADDRESS };
