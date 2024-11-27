"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { Table, Tag } from "antd";
import { UpOutlined, DownOutlined } from "@ant-design/icons";
export default function JumpFun() {
  const router = useRouter();
  const onGotoCreate = useCallback(() => {
    router.push("/jump/create");
  }, []);

  const data = [
    {
      rank: 1,
      ticker: "$AMIX",
      price: "$0.02405",
      priceChange: "+60.44%",
      liquidity: "151.39K",
      marketCap: "$1.01M",
    },
    {
      rank: 2,
      ticker: "$RooPi",
      price: "$0.01420",
      priceChange: "+367.03%",
      liquidity: "112.40K",
      marketCap: "$597.78K",
    },
    {
      rank: 3,
      ticker: "$DONKEY",
      price: "$0.01270",
      priceChange: "+14.95%",
      liquidity: "33.31K",
      marketCap: "$53.46K",
    },
    {
      rank: 4,
      ticker: "$KAPIBALA",
      price: "$0.01246",
      priceChange: "+143.94%",
      liquidity: "33.01K",
      marketCap: "$52.43K",
    },
    {
      rank: 5,
      ticker: "$JumpCAT",
      price: "$0.01118",
      priceChange: "-8.49%",
      liquidity: "31.41K",
      marketCap: "$47.06K",
    },
  ];

  const columns = [
    {
      title: "Rank",
      dataIndex: "rank",
      key: "rank",
      render: (text: any) => <a>{text}</a>,
    },
    {
      title: "Ticker",
      dataIndex: "ticker",
      key: "ticker",
      render: (text: any) => <a>{text}</a>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text: any) => <span>{text}</span>,
    },
    {
      title: "Price Change",
      dataIndex: "priceChange",
      key: "priceChange",
      render: (text: string) => (
        <Tag color={text.includes("+") ? "green" : "volcano"}>
          {text}
          {text.includes("+") ? <UpOutlined /> : <DownOutlined />}
        </Tag>
      ),
    },
    {
      title: "Liquidity",
      dataIndex: "liquidity",
      key: "liquidity",
      render: (text: any) => <span>{text}</span>,
    },
    {
      title: "Market Cap",
      dataIndex: "marketCap",
      key: "marketCap",
      render: (text: any) => <span>{text}</span>,
    },
  ];

  return (
    <div className="home flex align-middle justify-center flex-col">
      <div className="home-banner p-t-[190px] flex items-center relative flex-col w-[1200px] my-20 m-auto">
        <button
          className="home-create-btn rounded-md w-[340px] h-[64px] p-[0 56px] text-[22px]"
          onClick={() => onGotoCreate()}
        >
          Create
        </button>
      </div>
      <div className="w-[1200px] m-auto">
        <h2 className="text-[32px] font-bold text-white mb-5">Top 5 Jump</h2>
        <Table
          columns={columns}
          dataSource={data}
          rowKey="rank"
          pagination={false}
        />
      </div>
    </div>
  );
}
