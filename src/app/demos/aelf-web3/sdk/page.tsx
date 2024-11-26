'use client';
import AElf from 'aelf-sdk';
import { useEffect, useState } from 'react';
import { IToken } from '@/app/lib/interface/token';
import { Button } from 'antd';

const Wallet = AElf.wallet;
// address: 2hxkDg6Pd2d4yU1A16PTZVMMrEDYEPR8oQojMDwWdax5LsBaxX
const defaultPrivateKey =
  'bdb3b39ef4cd18c2697a920eb6d9e8c3cf1a930570beb37d04fb52400092c42b';
const wallet = Wallet.getWalletByPrivateKey(defaultPrivateKey);
const aelf = new AElf(
  new AElf.providers.HttpProvider('https://aelf-public-node.aelf.io/'),
); // Online main chain
const tokenContractAddress =
  'ELF_JRmBduh4nXWi1aXgdUsj5gJrzeZb2LxmrAbf7W99faZSvoAaE_AELF';

export default function AelfSDK() {
  const [tokenInfo, setTokenInfo] = useState<IToken>();
  const [tokenContract, setTokenContract] = useState<any>();
  useEffect(() => {
    const initTokenContract = async () => {
      const tokenContract = await aelf.chain.contractAt(
        tokenContractAddress,
        wallet,
      );
      setTokenContract(tokenContract);
    };
    initTokenContract();
  }, []);
  return (
    <>
      <div>{tokenContract ? 'ready' : 'not ready'}</div>
      <Button
        onClick={async () => {
          if (!tokenContract) {
            throw Error('Please wait for contract init');
          }
          const tokenInfo = await tokenContract.GetTokenInfo.call({
            symbol: 'ELF',
          });
          setTokenInfo(tokenInfo);
        }}
      >
        {' '}
        Click to get token info
      </Button>
      <pre>{JSON.stringify(tokenInfo, null, 2)}</pre>
    </>
  );
}
