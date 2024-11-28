"use client";
import { useState } from "react";
import { addressFormat, hiddenAddress } from "../../utils/addressFormat";
import { useConnectWallet } from "@aelf-web-login/wallet-adapter-react";
import { Input } from "aelf-design";

const DonorPage = () => {
  const { walletInfo } = useConnectWallet();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState("");
  const [donors, setDonors] = useState([
    {
      id: 1,
      address: "25CuX2FXDvhaj7etTpezDQDunk5xGhytxE68yTYJJfMkQwvj5p",
      amount: 1.8,
      rewards: 12.5944,
      time: "2 minutes ago",
    },
    {
      id: 2,
      address: "27UXFkt8XuZ3N8ToiBf4UvdSgM8dU87Q9B2QETqEaZ5vGaorZaF",
      amount: 0.1,
      rewards: 12.5944,
      time: "6 minutes ago",
    },
    {
      id: 3,
      address: "pGa4e5hNGsgkfjEGm72TEvbF7aRDqKBd4LuXtab4ucMbXLcgJ",
      amount: 1,
      rewards: 12.5944,
      time: "9 minutes ago",
    },
    {
      id: 4,
      address: "2ZwykiMYYMPx7NUodb4Z9VRzYqLrrxEpPcVuNKwT3kSQaSerQW",
      amount: 0.1,
      rewards: 12.5944,
      time: "14 minutes ago",
    },
    {
      id: 5,
      address: "2Jqvj3iQYqKAPy52FfZPYgy5AgSYeQWXBpfLBa6bKUWeDfggUf",
      amount: 0.2,
      rewards: 12.5944,
      time: "19 minutes ago",
    },
  ]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e, "eeee");
    const inputValue = e.target.value;
    if (/^\d*$/.test(inputValue)) {
      setValue(inputValue);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-4xl font-bold mb-10 text-white">
        Welcome to AELF JUMPFUN
      </div>
      <button
        onClick={toggleModal}
        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full shadow-lg transition-transform transform hover:scale-105"
      >
        Donate
      </button>

      {/* 弹窗 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white text-black p-6 rounded-lg shadow-xl w-96">
            <div className="text-xl font-semibold mb-4">Donation Details</div>
            <Input
              className="mb-5"
              value={value}
              onChange={handleInputChange}
              type="text"
              allowClear
            ></Input>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-500">Donor Address:</span>
              <span className="font-medium">
                {addressFormat(hiddenAddress(walletInfo?.address || ""))}
              </span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-500">Amount:</span>
              <span className="font-medium">{value || 0} ELF</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-500">Balance:</span>
              <span className="font-medium">12.5944 ELF</span>
            </div>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => {
                  console.log("donate");
                }}
                className="bg-blue-300 hover:bg-blue-400 text-black py-2 px-4 rounded-full"
              >
                Donate
              </button>
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
          <div className="text-center">Amount (ELF)</div>
          <div className="text-right">Estimated Rewards (ELF)</div>
          <div className="text-right">Time</div>
        </div>
        <div className="space-y-4">
          {donors.map(donor => (
            <div
              key={donor.id}
              className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow hover:bg-gray-100 transition"
            >
              <span className="text-sm font-medium text-gray-700">
                {addressFormat(hiddenAddress(donor.address))}
              </span>
              <span className="text-sm text-gray-500">
                Amount: {donor.amount} ELF
              </span>
              <span className="text-sm text-gray-500">
                Rewards: {donor.rewards} ELF
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
