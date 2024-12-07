"use client";
import { Button, Input, Badge, message as antdMessage } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import GoBack from "../../components/GoBack";
import { useRouter, usePathname } from "next/navigation";
import { useFormData } from "../../context/FormDataContext";
import { useConnectWallet } from "@aelf-web-login/wallet-adapter-react";
import { CONTRACT_ADDRESS, JUMP_FUN_CONFIG } from "../../configOnline";
import BigNumber from "bignumber.js";
import { useBalance } from "../../hook/balance";
import { formatTokenAmount } from "../../utils/addressFormat";
import { DataResponse, TokenItem, TokenList } from "../../types";
import { validateTokenInfoExists } from "../../utils/contract";
import {
  convertTokenInfoToValidateInput,
  ValidateTokenInfoExistsInput,
} from "../../utils/convert";
function generateRandomString() {
  return Array.from({ length: 10 }, () =>
    String.fromCharCode(65 + Math.floor(Math.random() * 26))
  ).join("");
}
const FAKE_SYMBOL = generateRandomString();
const BuyTokenCard = () => {
  const [loading, setLoading] = useState(false);
  const { walletInfo, callViewMethod, callSendMethod } = useConnectWallet();
  console.log(walletInfo, "walletInfo");
  const { balanceData } = useBalance({
    callViewMethod,
    walletInfo,
  });
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  const { formData } = useFormData();
  const { amount, tokenName, uploadUrl, decimal, symbol, desc, socialMedia } =
    formData;
  // {
  //   amount: 3,
  //   tokenName: "abigail1",
  //   uploadUrl:
  //     "https://forest-testnet.s3.ap-northeast-1.amazonaws.com/1733540407094-checkbox-Checked.svg",
  //   decimal: 8,
  //   symbol: FAKE_SYMBOL,
  //   desc: "xxxx",
  //   socialMedia: [
  //     "https://forest-testnet.s3.ap-northeast-1.amazonaws.com/1733540407094-checkbox-Checked.svg",
  //   ],
  // };
  const launch = async () => {
    try {
      setLoading(true);
      // approve
      const approveRs: any = await callSendMethod({
        chainId: JUMP_FUN_CONFIG.CHAIN_ID,
        contractAddress: CONTRACT_ADDRESS.TOKEN,
        methodName: "Approve",
        args: {
          symbol: JUMP_FUN_CONFIG.SYMBOL,
          spender: CONTRACT_ADDRESS.JUMPFUN,
          amount: new BigNumber(amount)
            .times(new BigNumber(10).pow(decimal))
            .toString(),
        },
      });
      if (!approveRs.error && approveRs.data.Status === "MINED") {
        launch;
        const launchData: any = await callSendMethod({
          chainId: JUMP_FUN_CONFIG.CHAIN_ID,
          contractAddress: CONTRACT_ADDRESS.JUMPFUN,
          methodName: "Launch",
          args: {
            ticker: symbol,
            name: tokenName,
            imageUri: uploadUrl,
            seedFee: new BigNumber(amount)
              .times(new BigNumber(10).pow(decimal))
              .toString(),
            desc,
            socialMedia,
          },
        });
        if (launchData?.error) {
          throw new Error(launchData?.error);
        }
        // filter tokenInfo
        const tokenInfos: DataResponse<ValidateTokenInfoExistsInput> =
          await callViewMethod({
            chainId: JUMP_FUN_CONFIG.CHAIN_ID,
            contractAddress: CONTRACT_ADDRESS.TOKEN,
            methodName: "GetTokenInfo",
            args: {
              symbol,
            },
          });
        console.log(tokenInfos, "tokenInfos");
        const tokenInfo = tokenInfos.data;
        if (!tokenInfo) {
          throw new Error("Token info not found");
        }
        console.log(
          JSON.stringify(convertTokenInfoToValidateInput(tokenInfo)),
          "tokenInfo"
        );
        // validate token info
        const txId = await validateTokenInfoExists(
          convertTokenInfoToValidateInput(tokenInfo)
        );
        antdMessage.success("Create success");
        // setTimeout(() => {
        //   router.push("/jump");
        // }, 500);
      } else {
        throw new Error("Approve failed");
      }
    } catch (e: unknown) {
      console.error(e, "eeeeee");
      if (e instanceof Error) {
        antdMessage.error(e.message);
      } else {
        antdMessage.error("Unknown error");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-transparent ">
      {/* Card Container */}
      <div className=" w-[473px] h-[811px] text-white shadow-lg px-[48px] py-[34px] rounded-[8px] bg-[#000000bf]">
        {/* Go Back Button */}
        <div className="mb-4 flex justify-center items-center ">
          <GoBack handleBack={handleBack}></GoBack>
        </div>

        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="text-[24px] font-bold text-white flex justify-center items-center">
            how many $TOKEN you want to buy?
          </h2>
          <p className="text-[16px] text-[#DBE3E6] my-2">(optional)</p>
          {/* Tip */}
          <div className="text-[16px] text-[#DBE3E6] leading-[20px]">
            tip: buying some amount of coins can help protect your coin from
            snipers.
          </div>
        </div>

        {/* Amount Input */}
        <div className="border h-[58px] mb-4 bg-white border-gray-300 rounded px-3 py-2 outline-none text-black min-w-[100px] flex items-center font-bold text-[16px]">
          {amount}
        </div>

        {/* Balance Badge */}
        <div className="mb-4 flex justify-center">
          <Badge
            count={
              <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full">
                balance:{" "}
                {formatTokenAmount(balanceData?.balance || "", decimal)}{" "}
                {balanceData?.symbol}
              </span>
            }
            showZero
          />
        </div>

        {/* List */}
        <div className="mb-6 text-sm">
          <div className="flex justify-between py-2 border-b border-gray-700">
            <span>name</span>
            <span className="font-semibold">{tokenName}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-700">
            <span>ticker</span>
            <span className="font-semibold">{symbol}</span>
          </div>
          {/* <div className="flex justify-between py-2 border-b border-gray-700">
            <span>total supply</span>
            <span className="font-semibold">1,000,000,000</span>
          </div> */}
          <div className="flex justify-between py-2">
            <span>cost</span>
            <span className="font-semibold">
              {amount} {balanceData?.symbol}
            </span>
          </div>
        </div>

        {/* Launch Agent Button */}
        <div>
          <Button
            type="primary"
            loading={loading}
            className="w-full h-[48px] bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-semibold"
            onClick={launch}
          >
            Launch Agent
          </Button>
        </div>

        {/* Bottom Tip */}
        {/* <div className="mt-4 text-center text-gray-400 text-sm">
          when your coin completes its bonding curve you receive 0.5 ELF
        </div> */}
      </div>
    </div>
  );
};

export default BuyTokenCard;
