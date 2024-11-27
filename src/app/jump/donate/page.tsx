"use client";
import { useState } from "react";

const DonorPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [donors, setDonors] = useState([
    {
      id: 1,
      address: "0x22...f945ceb78",
      amount: 1.8,
      rewards: 12.5944,
      time: "2 minutes ago",
    },
    {
      id: 2,
      address: "0xce...d2ac0c4d34",
      amount: 0.1,
      rewards: 12.5944,
      time: "6 minutes ago",
    },
    {
      id: 3,
      address: "0x20...06feef9449",
      amount: 1,
      rewards: 12.5944,
      time: "9 minutes ago",
    },
    {
      id: 4,
      address: "0x08...f2e228ab57",
      amount: 0.1,
      rewards: 12.5944,
      time: "14 minutes ago",
    },
    {
      id: 5,
      address: "0x1a...2116713e1c",
      amount: 0.2,
      rewards: 12.5944,
      time: "19 minutes ago",
    },
  ]);

  // 打开和关闭弹窗
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-4xl font-bold mb-10">Welcome to AELF JUMPFUN</div>
      <button
        onClick={toggleModal}
        className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-full shadow-lg transition-transform transform hover:scale-105"
      >
        Donate
      </button>

      {/* 弹窗 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white text-black p-6 rounded-lg shadow-xl w-96">
            <div className="text-xl font-semibold mb-4">Donation Details</div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-500">Donor Address:</span>
              <span className="font-medium">0x22bd...f945ceb78</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-500">Amount:</span>
              <span className="font-medium">1.8 ETH</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-500">Estimated Rewards:</span>
              <span className="font-medium">12.5944 ETH</span>
            </div>
            <div className="flex justify-center space-x-4">
              <button
                onClick={toggleModal}
                className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded-full"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 捐赠记录列表 */}
      <div className="mt-10 w-full max-w-4xl p-4 bg-white rounded-lg shadow-md">
        <div className="text-2xl font-semibold text-center mb-6">
          The Last 5 Donors
        </div>
        {/* 表头 */}
        <div className="grid grid-cols-4 text-sm font-medium text-gray-700 bg-gray-100 p-4 rounded-t-lg">
          <div className="text-left">Donor Address</div>
          <div className="text-center">Amount (ETH)</div>
          <div className="text-right">Estimated Rewards (ETH)</div>
          <div className="text-right">Time</div>
        </div>
        <div className="space-y-4">
          {donors.map(donor => (
            <div
              key={donor.id}
              className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow hover:bg-gray-100 transition"
            >
              <span className="text-sm font-medium text-gray-700">
                {donor.address}
              </span>
              <span className="text-sm text-gray-500">
                Amount: {donor.amount} ETH
              </span>
              <span className="text-sm text-gray-500">
                Rewards: {donor.rewards} ETH
              </span>
              <span className="text-xs text-gray-400">{donor.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DonorPage;
