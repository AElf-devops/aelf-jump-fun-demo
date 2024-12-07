import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ResolutionString } from "./dts/charting_library";
import TV from "./TV";
import Script from 'next/script'

type themeName = "Dark" | "Light";
const TradingView: React.FC<{
  Theme?: themeName;
  Resolution?: ResolutionString;
  isFullScreen?: boolean;
  setLoading?: Dispatch<SetStateAction<boolean>>;
}> = ({ setLoading = () => null }) => {
  const [createChart, setChart] = useState<any>(false);

  const initChart = () => {
    setLoading?.(true);
    const pairData = {
      isReversed: false,
      tradePairId: "ELF",
      symbol: "ELF",
      chainId: "tDVW",
      feeRate: "0.003",
    };

    try {
      if (!createChart) {
        const TVChart = new TV({
          pairData,
          SocketApi: null,
          isMobile: false,
          Locale: "en",
          onReadyCallback: () => setLoading(false),
        });
        setChart(TVChart);
      }
    } catch (e) {
      console.log("tradeView init error", e);
    } finally {
      setLoading?.(false);
    }
  }

  useEffect(() => {
    initChart();
  }, [setLoading, createChart]);

  return <>
    <Script
        src={'/charting_library/charting_library.js'}
        onLoad={() => {
          console.log('Script has loaded');
          initChart();
        }}
      />
    <div id="tv_chart_container" className="h-full min-h-[600px]" />
  </>;
};
export default TradingView;
