"use client";
import TradeSection from "../../components/TradeSection";
import GoBack from "../../components/GoBack";
import { useRouter } from "next/navigation";
import ReactECharts from "echarts-for-react";

const App = ({ id }: { id: string }) => {
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
            <div><span className="text-white">MemeCat ($MEMC) created by</span> <span className="text-blue-400">2B9SAT</span> <span className="text-gray-600">1 min ago</span> <span className="text-green-600">market cap: $45k</span></div>
            <ReactECharts
              option={{
                xAxis: {
                  data: [
                    "2017-10-24",
                    "2017-10-25",
                    "2017-10-26",
                    "2017-10-27",
                  ],
                },
                yAxis: {},
                series: [
                  {
                    type: "candlestick",
                    data: [
                      [20, 34, 10, 38],
                      [40, 35, 30, 50],
                      [31, 38, 33, 44],
                      [38, 15, 5, 42],
                    ],
                  },
                ],
              }}
            />
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
