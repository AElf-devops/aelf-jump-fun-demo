"use client";
import { useState, useEffect } from "react";
import {
  onConnectBtnClickHandler,
  onDisConnectBtnClickHandler,
} from "../Account";
import { useConnectWallet } from "@aelf-web-login/wallet-adapter-react";
import { hiddenAddress } from "../utils/addressFormat";
import { useRouter } from "next/navigation";

const Header = () => {
  const [isHeaderTransparent, setIsHeaderTransparent] = useState(true);
  const { connectWallet, disConnectWallet, walletInfo } = useConnectWallet();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsHeaderTransparent(false);
      } else {
        setIsHeaderTransparent(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const router = useRouter();

  return (
    <header
      className={`fixed z-50 top-0 left-0 right-0  transition-all duration-300 w-full px-10 border border-black bg-[#03273F] shadow-[2px_2px_0px_0px_#000]`}
    >
      <div className="flex justify-between items-center  m-auto h-[86px] relative">
        <div
          className="text-4xl font-bold text-white cursor-pointer"
          onClick={() => router.push("/jump")}
        >
          jumpfun
        </div>
        <div>
          {/* <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full mr-5"
            onClick={() => router.push("/jump/donate")}
          >
            Donate
          </button> */}
          <button
            className="bg-white text-blue-900 py-2 px-6 rounded-lg font-bold hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
            onClick={() => {
              if (walletInfo?.address) {
                onDisConnectBtnClickHandler(disConnectWallet);
              } else {
                onConnectBtnClickHandler(connectWallet);
              }
            }}
          >
            {walletInfo?.address ? hiddenAddress(walletInfo?.address) : "login"}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
