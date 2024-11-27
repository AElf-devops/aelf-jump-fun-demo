"use client";
import { useRouter } from "next/navigation";

const CreateForm = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="flex justify-center min-h-screen relative w-[1358px] m-auto">
      <button
        onClick={handleBack}
        className="text-white text-lg flex mb-6 absolute left-0 justify-center items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span className="font-bold">Back</span>
      </button>
      <div className="w-full max-w-2xl bg-gray-800 p-8 rounded-lg shadow-lg mt-8">
        {/* Form */}
        <form>
          <h1 className="text-3xl font-bold text-white mb-8 text-center">
            Create
          </h1>

          {/* Token Image */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-400 mb-2">
              Token Image
            </label>
            <div className="flex justify-center items-center w-full h-40 bg-gray-700 border-2 border-gray-600 rounded-lg">
              <button className="text-white font-semibold">+ Add</button>
            </div>
          </div>

          {/* Token Name and Ticker */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">
                Token Name
              </label>
              <input
                type="text"
                className="w-full p-3 bg-gray-700 text-white border-2 border-gray-600 rounded-lg"
                placeholder="e.g. JUMP.FUN"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">
                Ticker
              </label>
              <input
                type="text"
                className="w-full p-3 bg-gray-700 text-white border-2 border-gray-600 rounded-lg"
                placeholder="e.g. JUMP"
              />
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-400 mb-2">
              Description
            </label>
            <textarea
              className="w-full p-3 bg-gray-700 text-white border-2 border-gray-600 rounded-lg"
              placeholder="max: 180 characters"
              rows="4"
            ></textarea>
          </div>

          {/* Normal Launch and Initial Purchase */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-400 mb-2">
              Launch Type
            </label>
            <button className="w-full p-3 bg-purple-600 text-white font-semibold rounded-lg mb-4">
              Normal Launch
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">
                Liquidity Loans
              </label>
              <input
                type="number"
                className="w-full p-3 bg-gray-700 text-white border-2 border-gray-600 rounded-lg"
                defaultValue="6.0"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">
                Initial Purchase
              </label>
              <select
                className="w-full p-3 bg-gray-700 text-white border-2 border-gray-600 rounded-lg"
                defaultValue="0.06 ETH"
              >
                <option value="0.06 ETH">0.06 ETH</option>
                <option value="0.10 ETH">0.10 ETH</option>
              </select>
            </div>
          </div>

          {/* Optional Links */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-400 mb-2">
              Please enter your official X
            </label>
            <input
              type="text"
              className="w-full p-3 bg-gray-700 text-white border-2 border-gray-600 rounded-lg mb-4"
              placeholder="Official X"
            />
            <label className="block text-sm font-semibold text-gray-400 mb-2">
              Please enter your official telegram
            </label>
            <input
              type="text"
              className="w-full p-3 bg-gray-700 text-white border-2 border-gray-600 rounded-lg mb-4"
              placeholder="Official Telegram"
            />
            <label className="block text-sm font-semibold text-gray-400 mb-2">
              Please enter your official website
            </label>
            <input
              type="text"
              className="w-full p-3 bg-gray-700 text-white border-2 border-gray-600 rounded-lg"
              placeholder="Official Website"
            />
          </div>

          {/* Bottom section with total amount */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">
                Liquidity Loans
              </label>
              <div className="flex items-center space-x-2">
                <span className="text-white">6.0</span>
                <span className="text-white">ETH</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">
                Initial Purchase
              </label>
              <div className="flex items-center space-x-2">
                <span className="text-white">0.06</span>
                <span className="text-white">ETH</span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mb-6">
            <button className="w-full p-3 bg-purple-600 text-white font-semibold rounded-lg">
              Create (0.06 ETH)
            </button>
          </div>

          {/* Balance Section */}
          <div className="text-white">
            <span className="text-sm">Balance: </span>
            <span className="font-semibold">0.00 ETH</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateForm;
