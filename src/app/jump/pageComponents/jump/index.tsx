"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Table, Tag, Input } from "antd";
import "./index.css";
import Image from "next/image";
import { useConnectWallet } from "@aelf-web-login/wallet-adapter-react";
import { CONTRACT_ADDRESS, JUMP_FUN_CONFIG } from "../../configOnline";
import { DataResponse, TokenItem, TokenList } from "../../types";
import { formatTokenAmount } from "../../utils/addressFormat";
import CustomTabs from "../../components/CustomTabs";
import TokenCard from "../../components/TokenCard";
const tabsData = [
  {
    key: "hot",
    label: (
      <>
        <span role="img" aria-label="fire">
          🔥
        </span>{" "}
        hot
      </>
    ),
  },
  {
    key: "new",
    label: (
      <>
        <span className="text-blue-400">🆕</span> new
      </>
    ),
  },
  { key: "listed", label: "listed" },
  { key: "myAgents", label: "my agents" },
];

const mockData = [
  {
    title: "MemeCat",
    marketCap: "$45k",
    timeAgo: "1 min ago",
    creator: "2B95AT",
    progress: 66,
    onBuy: () => alert("Buying MemeCat"),
    likes: 234,
    imageUrl: "https://via.placeholder.com/64",
  },
  {
    title: "CryptoDog",
    marketCap: "$50k",
    timeAgo: "2 mins ago",
    creator: "3C78GH",
    progress: 80,
    onBuy: () => alert("Buying CryptoDog"),
    likes: 150,
    imageUrl: "https://via.placeholder.com/64",
  },
  {
    title: "PixelBird",
    marketCap: "$30k",
    timeAgo: "5 mins ago",
    creator: "1A45JK",
    progress: 40,
    onBuy: () => alert("Buying PixelBird"),
    likes: 98,
    imageUrl: "https://via.placeholder.com/64",
  },
  {
    title: "BitBunny",
    marketCap: "$25k",
    timeAgo: "10 mins ago",
    creator: "7G90LM",
    progress: 55,
    onBuy: () => alert("Buying BitBunny"),
    likes: 180,
    imageUrl: "https://via.placeholder.com/64",
  },
  {
    title: "DoggoCoin",
    marketCap: "$100k",
    timeAgo: "20 mins ago",
    creator: "4H21NP",
    progress: 90,
    onBuy: () => alert("Buying DoggoCoin"),
    likes: 350,
    imageUrl: "https://via.placeholder.com/64",
  },
  {
    title: "LunaLion",
    marketCap: "$75k",
    timeAgo: "15 mins ago",
    creator: "5K32QR",
    progress: 72,
    onBuy: () => alert("Buying LunaLion"),
    likes: 240,
    imageUrl: "https://via.placeholder.com/64",
  },
  {
    title: "ApeInu",
    marketCap: "$60k",
    timeAgo: "30 mins ago",
    creator: "6J54ST",
    progress: 85,
    onBuy: () => alert("Buying ApeInu"),
    likes: 300,
    imageUrl: "https://via.placeholder.com/64",
  },
  {
    title: "DogeShiba",
    marketCap: "$35k",
    timeAgo: "25 mins ago",
    creator: "9L87UV",
    progress: 50,
    onBuy: () => alert("Buying DogeShiba"),
    likes: 200,
    imageUrl: "https://via.placeholder.com/64",
  },
  {
    title: "ShibaRocket",
    marketCap: "$55k",
    timeAgo: "40 mins ago",
    creator: "8M32WX",
    progress: 60,
    onBuy: () => alert("Buying ShibaRocket"),
    likes: 220,
    imageUrl: "https://via.placeholder.com/64",
  },
];

export default function JumpFun() {
  const router = useRouter();
  const onGotoCreate = useCallback(() => {
    router.push("/jump/create");
  }, []);

  const handleTabChange = (key: string) => {
    console.log("Active Tab:", key);
  };

  const [data, setData] = useState<TokenItem[]>([]);

  const { walletInfo, callViewMethod } = useConnectWallet();
  const getList = async () => {
    const rs: DataResponse<TokenList> = await callViewMethod({
      chainId: JUMP_FUN_CONFIG.CHAIN_ID,
      contractAddress: CONTRACT_ADDRESS.JUMPFUN,
      methodName: "GetTokenInfos",
      args: walletInfo?.address,
    });
    setData(rs?.data?.data);
  };
  useEffect(() => {
    const getData = () => {
      if (walletInfo?.address) {
        getList();
      } else {
        setData([]);
      }
    };
    getData();
    const intervalId = setInterval(() => {
      // get list
      getData();
    }, 30000);
    return () => {
      clearInterval(intervalId);
    };
  }, [walletInfo?.address]);
  return (
    <div className="home flex align-middle justify-center flex-col">
      <div className="home-banner p-t-[190px] flex items-center relative flex-col w-[1200px] my-20 m-auto">
        <button
          className="home-create-btn w-[340px] h-[64px] p-[0 56px] text-[22px] flex items-center justify-center font-bold text-black"
          onClick={() => onGotoCreate()}
        >
          <Image
            src="/images/jump/plus.svg"
            width={48}
            height={48}
            alt="plus"
          ></Image>{" "}
          create token
        </button>
      </div>
      <div className="w-full rounded-lg bg-[#000000BF] h-[570px]">
        <div className="flex justify-between items-center">
          <div className="px-[25px] py-[19px] home-tabs">
            <CustomTabs
              tabs={tabsData}
              defaultActiveKey="hot"
              onTabChange={handleTabChange}
            ></CustomTabs>
          </div>
          <Input
            placeholder="search for agents"
            className="text-gray-700 placeholder-gray-500 flex-grow focus:outline-none"
          />
        </div>
        <div className="grid grid-cols-3 gap-6 p-8 bg-black">
          {mockData.map((data, index) => (
            <TokenCard key={index} {...data} />
          ))}
        </div>
      </div>
    </div>
  );
}
