"use client";
import TradeSection from "../../components/TradeSection";
import GoBack from "../../components/GoBack";
import { useRouter } from "next/navigation";
import ReactECharts from "echarts-for-react";
import CustomTabs from "../../components/CustomTabs";
import { useState } from "react";
import Message from "../../components/Message";
import { Suspense } from "react";
import { gql, useSuspenseQuery } from "@apollo/client";

const chartQuery = gql`
  query ChartQuery($input: GetKLineListInput) {
    getKLineList(input: $input) {
      data {
        ticker
        period
        open
        close
        high
        low
        openWithoutFee
        closeWithoutFee
        highWithoutFee
        lowWithoutFee
        volume
        timestamp
        id
        metadata {
          chainId
          block {
            blockHash
            blockHeight
            blockTime
          }
        }
      }
    }
  }
`;

type TChartQueryResponse = {
  getKLineList: {
    __typename: string
    data: Array<{
      __typename: string
      ticker: string
      period: number
      open: number
      close: number
      high: number
      low: number
      openWithoutFee: number
      closeWithoutFee: number
      highWithoutFee: number
      lowWithoutFee: number
      volume: number
      timestamp: number
      id: any
      metadata: {
        __typename: string
        chainId: any
        block: any
      }
    }>
  }
}

const Chart = () => {
  const { data } = useSuspenseQuery<TChartQueryResponse>(chartQuery, {
    variables: {
      input: {
        ticker: "ASASDEFRGT",
        period: 1,
        timestampMin: 0,
        timestampMax: 1000000000000000000,
      },
    },
  });

  console.log(data);

  return (
    <ReactECharts
      option={{
        xAxis: {
          data: data.getKLineList.data.map(item => new Date(Number(`${item.timestamp}000`)).toLocaleString()),
        },
        yAxis: {},
        series: [
          {
            type: "candlestick",
            data: data.getKLineList.data.map(item => ([item.open, item.close, item.low, item.high])),
          },
        ],
      }}
    />
  );
};

const tabsData = [
  {
    key: "chat",
    label: "chat",
  },
  {
    key: "transactions",
    label: "all transactions",
  },
  {
    key: "trades",
    label: "my trades",
  },
];

const App = ({ id }: { id: string }) => {
  const [tab, setTab] = useState("chat");
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <div className="bg-[#000000C0] p-8 rounded-lg shadow-lg mt-8 mb-10">
            <GoBack handleBack={handleBack} />
            <div>
              <span className="text-white">MemeCat ($MEMC) created by</span>{" "}
              <span className="text-blue-400">2B9SAT</span>{" "}
              <span className="text-gray-600">1 min ago</span>{" "}
              <span className="text-green-600">market cap: $45k</span>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
              <Chart />
            </Suspense>
          </div>
          <div className="bg-[#000000C0] p-8 rounded-lg shadow-lg mt-8 mb-10">
            <CustomTabs
              tabs={tabsData}
              defaultActiveKey="chat"
              onTabChange={(e) => setTab(e)}
            />
            <div>
              {tab === "chat" && (
                <div className="bg-gray-900 p-8">
                  <Message
                    author="$TOKEN"
                    time="3:57:12 PM"
                    likes={8}
                    content="LFGGGGGGGGGGGGGGGGGGGGGGG!"
                    type="token"
                  />
                  <Message
                    author="4kexw1"
                    time="3:57:12 PM"
                    likes={8}
                    content="@4kexw1 hello!"
                    type="user"
                    isCurrentUser
                  />
                  <Message
                    author="4kexw1"
                    time="3:57:12 PM"
                    likes={8}
                    content="LFGGGGGGGGGGGGGGGGGGGGGGG!"
                    type="reply"
                  />
                </div>
              )}
              {tab === "transactions" && (
                <div className="text-white">transactions</div>
              )}
              {tab === "trades" && <div className="text-white">trades</div>}
            </div>
          </div>
        </div>
        <div>
          <TradeSection token={id}></TradeSection>
        </div>
      </div>
    </div>
  );
};

export default App;
