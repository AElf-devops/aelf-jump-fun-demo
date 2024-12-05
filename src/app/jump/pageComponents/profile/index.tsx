"use client";
import React from "react";
import { Input, Button, Card, Row, Col } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import { useState } from "react";

const Profile = () => {
  const [coinsHeld, setCoinsHeld] = useState(0);
  const [coinsCreated, setCoinsCreated] = useState(0);

  const cardData = [
    {
      id: 1,
      name: "MemeCat",
      marketCap: "$45k",
      createdBy: "2B95AT",
      progress: 66,
    },
    {
      id: 2,
      name: "MemeCat",
      marketCap: "$45k",
      createdBy: "2B95AT",
      progress: 66,
    },
    {
      id: 3,
      name: "MemeCat",
      marketCap: "$45k",
      createdBy: "2B95AT",
      progress: 66,
    },
    {
      id: 4,
      name: "MemeCat",
      marketCap: "$45k",
      createdBy: "2B95AT",
      progress: 66,
    },
    {
      id: 5,
      name: "MemeCat",
      marketCap: "$45k",
      createdBy: "2B95AT",
      progress: 66,
    },
    {
      id: 6,
      name: "MemeCat",
      marketCap: "$45k",
      createdBy: "2B95AT",
      progress: 66,
    },
    {
      id: 7,
      name: "MemeCat",
      marketCap: "$45k",
      createdBy: "2B95AT",
      progress: 66,
    },
    {
      id: 8,
      name: "MemeCat",
      marketCap: "$45k",
      createdBy: "2B95AT",
      progress: 66,
    },
  ];

  return (
    <div className="bg-dark p-6">
      <div className="flex justify-between items-center">
        <div className="text-white text-2xl">Anna</div>
        <div className="bg-gray-800 text-white p-2 rounded-md">D4tWaj</div>
      </div>

      <div className="mt-4 flex items-center space-x-4">
        <div className="w-32 h-32 bg-gray-600 rounded-full"></div>
        <div>
          <Button
            className="bg-gray-800 text-white"
            icon={<HeartOutlined />}
            shape="circle"
          />
          <div className="mt-2 text-white">set new photo</div>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <Input placeholder="username" className="w-64" />
        <Input placeholder="4kexw1" className="w-64" />
        <Input placeholder="faq" className="w-64" />
        <Input placeholder="support" className="w-64" />
      </div>

      <div className="mt-8 flex justify-between items-center">
        <div className="text-white">my portfolio</div>
        <div className="flex space-x-4">
          <div className="text-white">coins held: {coinsHeld}</div>
          <div className="text-white">coins created: {coinsCreated}</div>
        </div>
      </div>

      <Row gutter={[16, 16]} className="mt-8">
        {cardData.map(card => (
          <Col span={8} key={card.id}>
            <Card
              title={card.name}
              extra={<Button className="bg-blue-600 text-white">buy</Button>}
              className="bg-gray-700 text-white"
            >
              <div className="flex items-center justify-between">
                <div>{card.marketCap}</div>
                <div className="text-gray-400">created by {card.createdBy}</div>
              </div>
              <div className="mt-4">
                <div className="w-full bg-gray-600 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${card.progress}%` }}
                  ></div>
                </div>
                <div className="text-white text-right mt-1">
                  {card.progress}%
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Profile;
