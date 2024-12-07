import AElf from "aelf-sdk";
const FAKE_WALLET = AElf.wallet.getWalletByPrivateKey(
  "4e83df2aa7c8552a75961f9ab9f2f06e01e0dca0203e383da5468bbbe2915c97"
);
const getTokenContract = async (aelf: any): Promise<any> => {
  console.log(`Getting token contract for`, aelf.currentProvider.host);

  const tokenContractName = "AElf.ContractNames.Token";

  // Get chain status
  const chainStatus: any = await aelf.chain.getChainStatus();

  // Get genesis contract address
  const GenesisContractAddress: string = chainStatus.GenesisContractAddress;

  // Get genesis contract instance
  const zeroContract = await aelf.chain.contractAt(
    GenesisContractAddress,
    FAKE_WALLET
  );

  // Get token contract address using the genesis contract
  const tokenContractAddress: string =
    await zeroContract.GetContractAddressByName.call(
      AElf.utils.sha256(tokenContractName)
    );

  // Return token contract instance
  return await aelf.chain.contractAt(tokenContractAddress, FAKE_WALLET);
};

export const validateTokenInfoExists = async (params: any) => {
  const aelf = new AElf(
    new AElf.providers.HttpProvider("https://aelf-test-node.aelf.io")
  );
  const aelfTokenContract = await getTokenContract(aelf);
  const signedTx =
    aelfTokenContract.ValidateTokenInfoExists.getSignedTx(params);
  console.log(signedTx, "signedTx");
  const { TransactionId: txTd } = await aelf.chain.sendTransaction(signedTx);
  console.log(txTd, "VALIDATE_TXID");
  let txRes = await aelf.chain.getTxResult(txTd);
  console.log(txRes, "VALIDATE_TXRESULT");
  return txRes;
};
