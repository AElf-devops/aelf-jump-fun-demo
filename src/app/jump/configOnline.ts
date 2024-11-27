import { NetworkEnum } from "@aelf-web-login/wallet-adapter-base";

/**
 * online config
 */

const CHAIN_ID = "AELF";
const EXPLORE_URL = "https://aelf-test-node.aelf.io/";

const JUMP_FUN_CONFIG = {
  CHAIN_ID,
  EXPLORE_URL,
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

export { JUMP_FUN_CONFIG, PORTKEY_CONFIG };
