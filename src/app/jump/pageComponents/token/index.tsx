"use client";
import React, { useState } from "react";
import { Layout, Button, Input, Card, Row, Col, Typography } from "antd";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import "tailwindcss/tailwind.css";
import TradeSection from "../../components/TradeSection";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

// Dummy data for chart
const chartData = {
  labels: ["12:00", "12:30", "13:00", "13:30", "14:00"], // Time labels
  datasets: [
    {
      label: "MemeCat Price (USD)",
      data: [10, 12, 8, 14, 9], // Price data
      borderColor: "rgba(75, 192, 192, 1)",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      tension: 0.1,
    },
  ],
};

const App = () => {
  const [elfAmount, setElfAmount] = useState("0");

  return (
    <div className="min-h-screen bg-[#000000C0]  ">
      <header className="text-center py-4">
        <div className="text-white">Token Market</div>
      </header>

      <Content className="py-8 flex justify-center items-center">
        <div className="mx-auto px-4">
          <TradeSection></TradeSection>
        </div>
      </Content>
    </div>
  );
};

export default App;
