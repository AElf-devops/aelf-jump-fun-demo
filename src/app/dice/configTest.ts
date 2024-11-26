import { NetworkEnum } from "@aelf-web-login/wallet-adapter-base";

/**
 * Testnet config
 */
const DICE_CONTRACT_ADDRESS =
  'SKts3XUTP3pNHFbQqQn8qEqPfRiyv4x2LBzgRT343V5Xkx8Lz';
const TOKEN_CONTRACT_ADDRESS =
  'ASh2Wt7nSEmYqnGxPPzp4pnVDU4uhj1XW9Se5VeZcX2UDdyjx';
const CHAIN_ID = 'tDVW';
const EXPLORE_URL = 'https://tdvw-test-node.aelf.io';

const DICE_GAME_CONFIG = {
  DICE_CONTRACT_ADDRESS,
  TOKEN_CONTRACT_ADDRESS,
  CHAIN_ID,
  EXPLORE_URL,
};

// Portkey
const NETWORK_TYPE = NetworkEnum.TESTNET;
const GRAPHQL_SERVER =
  'https://dapp-aa-portkey-test.portkey.finance/Portkey_DID/PortKeyIndexerCASchema/graphql';
const CONNECT_SERVER = 'https://auth-aa-portkey-test.portkey.finance';
const SERVICE_SERVER = 'https://aa-portkey-test.portkey.finance';

const PORTKEY_CONFIG = {
  NETWORK_TYPE,
  GRAPHQL_SERVER,
  CONNECT_SERVER,
  SERVICE_SERVER,
};

export { DICE_GAME_CONFIG, PORTKEY_CONFIG };
