export interface ValidateTokenInfoExistsInput {
  symbol: string;
  tokenName: string;
  totalSupply: string;
  decimals: number;
  issuer: string;
  isBurnable: boolean;
  issueChainId: number;
  externalInfo: Record<string, any>;
  owner: string;
}

export const convertTokenInfoToValidateInput = (
  tokenInfo: ValidateTokenInfoExistsInput
): ValidateTokenInfoExistsInput => {
  return {
    ...tokenInfo,
    externalInfo: tokenInfo.externalInfo.value,
  };
};
