import React, { useState } from "react";
import { Button, Input, Tabs, message } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import "./index.css";
import Image from "next/image";
import { CONTRACT_ADDRESS, JUMP_FUN_CONFIG } from "../../configOnline";
import { useConnectWallet } from "@aelf-web-login/wallet-adapter-react";
import useBalance from "../../hook/balance-new";
import BigNumber from "bignumber.js";
import useTokenPrice from "../../hook/token-price";
import useTokenInfo from "../../hook/token-info";
const { TabPane } = Tabs;

const DECIMAL = JUMP_FUN_CONFIG.DECIMAL;
const MULTIPLIER = 10 ** DECIMAL;

const TransactionTabs: React.FC<{ token: string }> = ({
  token,
}: {
  token: string;
}) => {
  const symbol = JUMP_FUN_CONFIG.SYMBOL;
  const [activeTab, setActiveTab] = useState<"buy" | "sell">("buy");
  const currentSymbol = activeTab === "buy" ? "ELF" : token;
  const { callSendMethod } = useConnectWallet();
  const { data: userBalance } = useBalance({ symbol: currentSymbol });
  const [amount, setAmount] = useState<string>("");
  const {data: tokenPrice} = useTokenPrice({ ticker: token, type: activeTab, amount });
  const {data: tokenInfo} = useTokenInfo({ symbol: currentSymbol });
  const handleTabChange = (key: string) => {
    setActiveTab(key as "buy" | "sell");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
  };

  const handlePresetAmount = (value: number) => {
    if (!userBalance) return;

    if (userBalance.lt(value)) {
      message.error("Insufficient balance");
      return;
    }
    setAmount(value.toString());
  };

  const handleReset = () => {
    setAmount("");
  };

  const handleConfirm = async () => {
    if (!userBalance) return;

    if (userBalance.lt(amount || "0")) {
      message.error("Insufficient balance");
      return;
    }

    const _amount = new BigNumber(amount).multipliedBy(MULTIPLIER).toString(10);

    await callSendMethod({
      contractAddress: CONTRACT_ADDRESS.TOKEN_TDVW,
      methodName: "Approve",
      chainId: 'tDVW',
      args: {
        spender: CONTRACT_ADDRESS.BUYSELL,
        amount: _amount,
        symbol: JUMP_FUN_CONFIG.SYMBOL,
      },
    });

    let args: object = {
      amount: _amount,
      ticker: token,
      receiveLimit: 1,
    }

    await callSendMethod({
      contractAddress: CONTRACT_ADDRESS.BUYSELL,
      methodName: activeTab === "buy" ? "Buy" : "Sell",
      chainId: 'tDVW',
      args,
    });

    message.success(
      `${activeTab === "buy" ? "Buying" : "Selling"} ${amount} ${currentSymbol}`
    );
  };

  return (
    <div className="trade-section w-[377px]">
      <Tabs defaultActiveKey="buy" onChange={handleTabChange} className="">
        <TabPane
          tab={
            <Button
              className={`w-[176px] ${activeTab === "buy" ? "!bg-[#6417FE]" : "!bg-[#0D1521E5]"}  !rounded-full !h-[46px]`}
              onClick={() => handleTabChange("buy")}
            >
              buy
            </Button>
          }
          key="buy"
        />
        <TabPane
          tab={
            <Button
              className={`w-[176px] ${activeTab === "sell" ? "!bg-[#6417FE]" : "!bg-[#0D1521E5]"}  !rounded-full !h-[46px] ml-2`}
              onClick={() => handleTabChange("sell")}
            >
              sell
            </Button>
          }
          key="sell"
        />
      </Tabs>

      <div className="text-center mb-4 flex">
        <div className="rounded-lg text-[#40B11A] bg-[#F5F9ED] px-2 py-1 h-[28px] text-[15px] font-bold flex items-center justify-center w-auto m-auto">
          balance: {userBalance?.toFixed(2)} {currentSymbol}
        </div>
      </div>

      <Input
        value={amount}
        onChange={handleInputChange}
        type="number"
        placeholder="Enter number"
        className="mb-[21px]"
        min={0}
        suffix={
          <div className="flex items-center space-x-2 ml-2">
            <span className="text-[20px] font-bold text-black">{currentSymbol}</span>
            <Image
              src={tokenInfo?.externalInfo?.value.__ft_image_uri || "/images/jump/token-logo.svg"}
              width={38}
              height={38}
              alt="token-logo"
            ></Image>
          </div>
        }
      />

      <div className="flex justify-start mb-[21px]">
        <Button
          onClick={handleReset}
          className="h-[28px] !text-[#40B11A] text-[12px] !font-bold !bg-[#F5F9ED] mr-[6px] !rounded-[8px]"
        >
          Reset
        </Button>
        <Button
          onClick={() => handlePresetAmount(0.1)}
          className="h-[28px] !text-[#40B11A] text-[12px] !font-bold !bg-[#F5F9ED] mr-[6px] !rounded-[8px]"
        >
          0.1 {currentSymbol}
        </Button>
        <Button
          onClick={() => handlePresetAmount(0.5)}
          className="h-[28px] !text-[#40B11A] text-[12px] !font-bold !bg-[#F5F9ED] mr-[6px] !rounded-[8px]"
        >
          0.5 {currentSymbol}
        </Button>
        <Button
          onClick={() => handlePresetAmount(1)}
          className="h-[28px] !text-[#40B11A] text-[12px] !font-bold !bg-[#F5F9ED] "
        >
          1 {currentSymbol}
        </Button>
      </div>

      <div className="mb-4">
        <div className="text-sm text-[#DBE3E6]">
          {amount
            ? `You will receive ${tokenPrice || 0} ${currentSymbol === "ELF" ? token : "ELF"}`
            : ""}
        </div>
      </div>

      <Button
        className="flex !w-full !h-[56px] !py-[19px] flex-col justify-center items-center !rounded-full border border-black !bg-[#40B11A] shadow-[2px_2px_0px_0px_#000] text-white !font-bold !text-[16px] disabled:opacity-40"
        onClick={handleConfirm}
        disabled={!amount}
      >
        {activeTab} {token}
      </Button>
    </div>
  );
};

export default TransactionTabs;
