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
  account: string;
  cost: string;
  decimals: number;
  externalInfo: ExternalInfo;
  isBurnable: boolean;
  issueChainId: number;
  issuer: string;
  owner: string;
  symbol: string;
  tokenName: string;
  totalSupply: string;
}

export interface TokenList {
  data: TokenItem[];
}
