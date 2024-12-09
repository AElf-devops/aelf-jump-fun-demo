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
export default function JumpFun() {
  const router = useRouter();
  const onGotoCreate = useCallback(() => {
    router.push("/jump/create");
  }, []);

  const handleTabChange = (key: string) => {
    console.log("Active Tab:", key);
  };

  const [data, setData] = useState<TokenItem[]>([]);

  const columns = [
    {
      title: "Ticker",
      dataIndex: "ticker",
      key: "ticker",
      render: (text: any) => <span>{text}</span>,
    },
    {
      title: "SeedFee",
      dataIndex: "seedFee",
      key: "seedFee",
      render: (text: any, record: any) => {
        const decimal = record.decimals;
        const amount = formatTokenAmount(text || "", decimal);
        return <span>{amount}</span>;
      },
    },
    {
      title: "TokenName",
      dataIndex: "name",
      key: "name",
      render: (text: any) => <span>{text}</span>,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text: any, record: any) => {
        return (
          <Image
            src={record.externalInfo.value.__ft_image_uri}
            alt="External Image"
            width={50}
            height={50}
          />
        );
      },
    },
    {
      title: "Desc",
      dataIndex: "desc",
      key: "desc",
      width: 150,
      render: (text: any) => <span>{text}</span>,
    },
    {
      title: "SocialMedia",
      dataIndex: "socialMedia",
      key: "socialMedia",
      width: 150,
      render: (text: string, record: any) => {
        console.log(record.socialMedia);
        return (
          <div>
            {record.socialMedia.map((ele: string) => (
              <p>{ele}</p>
            ))}
          </div>
        );
      },
    },
  ];
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
      <div className="mx-[58px] rounded-lg bg-[#000000BF] h-[570px]">
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
            bordered={false}
            className="text-gray-700 placeholder-gray-500 flex-grow focus:outline-none"
          />
        </div>
      </div>

      {/* <div className="w-[1200px] m-auto">
        <h2 className="text-[32px] font-bold text-white mb-5">
          create history
        </h2>
        <Table
          columns={columns}
          dataSource={data}
          rowKey="rank"
          pagination={false}
        />
      </div> */}
    </div>
  );
}
