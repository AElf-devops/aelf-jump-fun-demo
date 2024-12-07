export interface BalanceData {
  symbol: string;
  owner: string;
  balance: string;
}

export interface DataResponse<T> {
  data: T;
}
export interface TokenInfoData {
  decimals: number;
  externalInfo: any | null;
  isBurnable: boolean;
  issueChainId: number;
  issued: string;
  issuer: string;
  owner: string | null;
  supply: string;
  symbol: string;
  tokenName: string;
  totalSupply: string;
}
export interface ExternalInfo {
  __ft_image_uri: string;
}

export interface TokenItem {
  creator: string; // Address of the creator
  decimals: number; // Number of decimals
  desc: string; // Description of the token
  externalInfo: {
    value: Record<string, any>; // External info can be key-value pairs
  };
  isBurnable: boolean; // Indicates if the token is burnable
  issueChainId: number; // Chain ID where the token is issued
  issuer: string; // Address of the issuer
  name: string; // Name of the token
  owner: string; // Address of the owner
  seedFee: string; // Seed fee as a string (to handle large numbers)
  socialMedia: string[]; // Array of social media URLs
  ticker: string; // Token ticker
  totalSupply: string; // Total supply of the token (as a string to handle large numbers)
}

export interface TokenList {
  data: TokenItem[];
}
