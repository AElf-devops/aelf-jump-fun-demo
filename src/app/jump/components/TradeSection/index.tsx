import React, { useState } from "react";
import { Button, Input, Tabs, message } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import "./index.css";
import Image from "next/image";
const { TabPane } = Tabs;

const TransactionTabs: React.FC = () => {
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
    message.success(
      `${activeTab === "buy" ? "Buying" : "Selling"} ${amount} ELF`
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
          balance: {userBalance} ELF
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
            <span className="text-[20px] font-bold text-black">ELF</span>
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
          0.1 ELF
        </Button>
        <Button
          onClick={() => handlePresetAmount(0.5)}
          className="h-[28px] !text-[#40B11A] text-[12px] !font-bold !bg-[#F5F9ED] mr-[6px] !rounded-[8px]"
        >
          0.5 ELF
        </Button>
        <Button
          onClick={() => handlePresetAmount(1)}
          className="h-[28px] !text-[#40B11A] text-[12px] !font-bold !bg-[#F5F9ED] "
        >
          1 ELF
        </Button>
      </div>

      <div className="mb-4">
        <div className="text-sm text-gray-600">
          {amount
            ? `You will receive ~${calculatedToken.toFixed(2)} $Token`
            : ""}
        </div>
      </div>

      <Button
        className="flex !w-full !h-[56px] !py-[19px] flex-col justify-center items-center !rounded-full border border-black !bg-[#40B11A] shadow-[2px_2px_0px_0px_#000] text-white !font-bold !text-[16px]"
        onClick={handleConfirm}
      >
        {activeTab} Token
      </Button>
    </div>
  );
};

export default TransactionTabs;
