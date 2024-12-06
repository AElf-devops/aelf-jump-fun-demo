import React, { useState } from "react";
import { Button, Input, Tabs, message } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import "./index.css";
import Image from "next/image";
import { CONTRACT_ADDRESS, JUMP_FUN_CONFIG } from "../../configOnline";
import { useConnectWallet } from "@aelf-web-login/wallet-adapter-react";
import useBalance from "../../hook/balance";
const { TabPane } = Tabs;

const TransactionTabs: React.FC<{ token: string }> = ({
  token,
}: {
  token: string;
}) => {
  const symbol = JUMP_FUN_CONFIG.SYMBOL;
  const { walletInfo, callViewMethod, callSendMethod } = useConnectWallet();
  const { balanceData } = useBalance({
    callViewMethod,
    walletInfo,
  });
  console.log(balanceData, "balanceData");
  const [activeTab, setActiveTab] = useState<string>("buy");
  const [amount, setAmount] = useState<string>("");
  const [userBalance, setUserBalance] = useState<number>(1000);
  const [tokenPrice, setTokenPrice] = useState<number>(2);
  const [calculatedToken, setCalculatedToken] = useState<number>(0);
  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
    if (value) {
      setCalculatedToken(parseFloat(value) * tokenPrice);
    } else {
      setCalculatedToken(0);
    }
  };

  const handlePresetAmount = (value: number) => {
    if (value > userBalance) {
      message.error("Insufficient balance");
      return;
    }
    setAmount(value.toString());
    setCalculatedToken(value * tokenPrice);
  };

  const handleReset = () => {
    setAmount("");
    setCalculatedToken(0);
  };

  const handleConfirm = () => {
    if (parseFloat(amount) > userBalance) {
      message.error("Insufficient balance");
      return;
    }

    if (!parseFloat(amount)) {
      message.error("Invalid amount");
      return;
    }

    let args: object = {
      amount: parseInt(amount),
      ticker: token,
    }

    if (activeTab === "buy") {
      args = {...args, payLimit: 0}
    }
    else {
      args = {...args, receiveLimit: 0}
    }

    console.log(args, "---args");

    callSendMethod({
      contractAddress: CONTRACT_ADDRESS.BUYSELL,
      methodName: activeTab === "buy" ? "Buy" : "Sell",
      args,
    }).then((res) => {
      console.log(res);

      message.success(
        `${activeTab === "buy" ? "Buying" : "Selling"} ${amount} ${symbol}`
      );
    });

    
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
          balance: {userBalance} {symbol}
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
            <span className="text-[20px] font-bold text-black">{symbol}</span>
            <Image
              src="/images/jump/token-logo.svg"
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
          0.1 {symbol}
        </Button>
        <Button
          onClick={() => handlePresetAmount(0.5)}
          className="h-[28px] !text-[#40B11A] text-[12px] !font-bold !bg-[#F5F9ED] mr-[6px] !rounded-[8px]"
        >
          0.5 {symbol}
        </Button>
        <Button
          onClick={() => handlePresetAmount(1)}
          className="h-[28px] !text-[#40B11A] text-[12px] !font-bold !bg-[#F5F9ED] "
        >
          1 {symbol}
        </Button>
      </div>

      <div className="mb-4">
        <div className="text-sm text-[#DBE3E6]">
          {amount
            ? `You will receive ~${calculatedToken.toFixed(2)} ${token}`
            : ""}
        </div>
      </div>

      <Button
        className="flex !w-full !h-[56px] !py-[19px] flex-col justify-center items-center !rounded-full border border-black !bg-[#40B11A] shadow-[2px_2px_0px_0px_#000] text-white !font-bold !text-[16px]"
        onClick={handleConfirm}
      >
        {activeTab} {token}
      </Button>
    </div>
  );
};

export default TransactionTabs;
