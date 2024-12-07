"use client";
import { useRouter } from "next/navigation";
import TradingView from "@/app/jump/components/TradingView/TradingView";

const CreateForm: React.FC = () => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  return (
    <div>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <div className="bg-[#000000C0] p-8 rounded-lg shadow-lg mt-8 mb-10">
              <button
                onClick={handleBack}
                className="text-white text-lg flex mb-6 justify-center items-center"
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
                <span className="font-bold">go back</span>
              </button>
              <TradingView />
            </div>
          </div>
          <div>right</div>
        </div>
      </div>
    </div>
  );
};

export default CreateForm;
