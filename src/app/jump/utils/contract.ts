import AElf from "aelf-sdk";
import { Progress } from "antd";
const FAKE_WALLET = AElf.wallet.getWalletByPrivateKey(
  "4e83df2aa7c8552a75961f9ab9f2f06e01e0dca0203e383da5468bbbe2915c97"
);
const mainchainUrl = process.env.NEXT_PUBLIC_MAINCHAIN;
console.log(mainchainUrl, "mainchainUrl");
const sidechainUrl = process.env.NEXT_PUBLIC_SIDECHAIN;
const aelf = new AElf(new AElf.providers.HttpProvider(mainchainUrl));
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const getTokenContract = async (aelf: any): Promise<any> => {
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

export const validateTokenInfoExists = async (
  params: any,
  setProgress: React.Dispatch<React.SetStateAction<number>>
) => {
  setProgress(20);
  const aelfTokenContract = await getTokenContract(aelf);
  const signedTx =
    aelfTokenContract.ValidateTokenInfoExists.getSignedTx(params);
  console.log(signedTx, "signedTx");
  const { TransactionId: txTd } = await aelf.chain.sendTransaction(signedTx);
  console.log(txTd, "VALIDATE_TXID");
  let txRes = await aelf.chain.getTxResult(txTd);
  console.log(txRes, "VALIDATE_TXRESULT");
  return {
    txTd,
    txRes,
    signedTx,
  };
};

const getCrossChainContract = async (aelf: any) => {
  console.log(`Getting cross chain contract for`, aelf.currentProvider.host);
  const crossChainContractName = "AElf.ContractNames.CrossChain";

  // get chain status
  const chainStatus = await aelf.chain.getChainStatus();
  // get genesis contract address
  const GenesisContractAddress = chainStatus.GenesisContractAddress;
  // get genesis contract instance
  const zeroContract = await aelf.chain.contractAt(
    GenesisContractAddress,
    FAKE_WALLET
  );
  // Get contract address by the read only method `GetContractAddressByName` of genesis contract
  const crossChainContractAddress =
    await zeroContract.GetContractAddressByName.call(
      AElf.utils.sha256(crossChainContractName)
    );

  return await aelf.chain.contractAt(crossChainContractAddress, FAKE_WALLET);
};

const getMerklePathByTxId = async (aelf: any, txId: string) => {
  let VALIDATE_MERKLEPATH;
  try {
    VALIDATE_MERKLEPATH = await aelf.chain.getMerklePathByTxId(txId);
  } catch (err) {
    throw err;
  }

  VALIDATE_MERKLEPATH.MerklePathNodes = VALIDATE_MERKLEPATH.MerklePathNodes.map(
    ({ Hash, IsLeftChildNode }: any) => ({
      hash: Hash,
      isLeftChildNode: IsLeftChildNode,
    })
  );

  return {
    merklePathNodes: VALIDATE_MERKLEPATH.MerklePathNodes,
  };
};
function hexStringToByteArray(hexString: string) {
  const byteArray = [];
  for (let i = 0; i < hexString.length; i += 2) {
    byteArray.push(parseInt(hexString.substr(i, 2), 16));
  }
  return byteArray;
}
export async function crossChainCreateToken(
  validateTxId: string,
  signedTx: string,
  setProgress: React.Dispatch<React.SetStateAction<number>>
) {
  try {
    setProgress(50);
    const tdvw = new AElf(new AElf.providers.HttpProvider(sidechainUrl));
    // Step 1: Check if SideChain index has a MainChain height greater than validateTokenInfoExist's
    let heightDone = false;
    const tdvwCrossChainContract = await getCrossChainContract(tdvw);

    let validateTxResult = await aelf.chain.getTxResult(validateTxId);

    while (!heightDone) {
      const sideIndexMainHeight = (
        await tdvwCrossChainContract.GetParentChainHeight.call()
      ).value;

      if (sideIndexMainHeight >= validateTxResult.Transaction.RefBlockNumber) {
        validateTxResult = await aelf.chain.getTxResult(validateTxId);
        console.log(validateTxResult, "VALIDATE_TXRESULT=====2");
        heightDone = true;
      }
      console.log(
        sideIndexMainHeight,
        validateTxResult.Transaction.RefBlockNumber,
        sideIndexMainHeight >= validateTxResult.Transaction.RefBlockNumber,
        "xxxxx"
      );
    }
    setProgress(70);
    // Step 2: Get Merkle path
    const merklePath = await getMerklePathByTxId(aelf, validateTxId);
    console.log(merklePath, "merklePath");

    // Step 3: Get the token contract and prepare CrossChainCreateToken parameters
    const tdvwTokenContract = await getTokenContract(tdvw);
    const byteArray = hexStringToByteArray(signedTx);

    const CROSS_CHAIN_CREATE_TOKEN_PARAMS = {
      fromChainId: 9992731,
      parentChainHeight: "" + validateTxResult.BlockNumber,
      transactionBytes: Buffer.from(byteArray as any, "hex").toString("base64"),
      merklePath,
    };
    setProgress(90);
    const signedTx2 = await tdvwTokenContract.CrossChainCreateToken.getSignedTx(
      CROSS_CHAIN_CREATE_TOKEN_PARAMS
    );

    // Step 4: Retry mechanism for sending the transaction
    let done = false,
      count = 0;

    while (!done) {
      try {
        await delay(10000); // Wait 10 seconds before retry
        console.log(`Retrying #${++count}...`);
        const { TransactionId } = await tdvw.chain.sendTransaction(signedTx2);
        const txResult = await tdvw.chain.getTxResult(TransactionId);
        console.log(txResult);
        if (txResult.Status === "MINED") {
          setProgress(100);
          setTimeout(() => {
            done = true;
          }, 100);
        }
      } catch (err) {
        setProgress(0);
        console.error(err);
        throw err;
      }
    }
  } catch (err) {
    setProgress(0);
    console.error(err);
    throw err;
  }
}
