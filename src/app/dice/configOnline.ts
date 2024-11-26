import { NetworkEnum } from '@aelf-web-login/wallet-adapter-base';

/**
 * online config
 */
const DICE_CONTRACT_ADDRESS =
  'Fg8hGbtbBkYAy7jDoa5H4oQAPvnaWaYB79ike7kp1js3PZi3M';
const TOKEN_CONTRACT_ADDRESS =
  '7RzVGiuVWkvL4VfVHdZfQF2Tri3sgLe9U991bohHFfSRZXuGX';
const CHAIN_ID = 'tDVV';
const EXPLORE_URL = 'https://tdvv-public-node.aelf.io';

const DICE_GAME_CONFIG = {
  DICE_CONTRACT_ADDRESS,
  TOKEN_CONTRACT_ADDRESS,
  CHAIN_ID,
  EXPLORE_URL,
};

// Portkey
const NETWORK_TYPE = NetworkEnum.MAINNET;
const GRAPHQL_SERVER =
  'https://dapp-aa-portkey.portkey.finance/aefinder-v2/api/app/graphql/portkey';
const CONNECT_SERVER = 'https://auth-aa-portkey.portkey.finance';
const SERVICE_SERVER = 'https://aa-portkey.portkey.finance';

const PORTKEY_CONFIG = {
  NETWORK_TYPE,
  GRAPHQL_SERVER,
  CONNECT_SERVER,
  SERVICE_SERVER,
};

export { DICE_GAME_CONFIG, PORTKEY_CONFIG };
