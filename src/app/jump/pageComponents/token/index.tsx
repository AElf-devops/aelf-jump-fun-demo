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
    <Layout className="min-h-screen ">
      <Header className="bg-blue-500 text-white text-center py-4">
        <Title level={3} className="text-white">
          MemeCat Market
        </Title>
      </Header>

      <Content className="py-8">
        <div className="container mx-auto px-4">
          <Row gutter={16}>
            {/* Chart Section */}
            {/* <Col span={12}>
              <Card title="MemeCat Price Chart">
                <Line data={chartData} />
              </Card>
            </Col> */}

            {/* Trade Section */}
            <Col span={24}>
              <Card title="Trade MemeCat">
                <TradeSection></TradeSection>
              </Card>
            </Col>
          </Row>

          {/* <Row gutter={16} className="mt-8">
            
            <Col span={12}>
              <Card title="Chat">
                <div className="h-48 overflow-y-auto border p-2 mb-4">
                  <div className="text-sm">
                    LFGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG!
                  </div>
                  <div className="text-sm">
                    Hold tight, the price is going up!
                  </div>
                </div>
                <Input placeholder="Send a message" />
              </Card>
            </Col>

           
            <Col span={12}>
              <Card title="Holders Distribution">
                <div>
                  <div className="text-lg">Account 1: 24.3%</div>
                  <div className="text-lg">Account 2: 24.3%</div>
                  <div className="text-lg">Account 3: 24.3%</div>
                </div>
              </Card>
            </Col>
          </Row> */}
        </div>
      </Content>
    </Layout>
  );
};

export default App;
