// components/Header.js

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
      className={`fixed z-50 top-0 left-0 right-0  transition-all duration-300 bg-transparent min-w-[1350px]`}
    >
      <div className="flex justify-between items-center w-[1358px] m-auto bg-[#ffffff0d] h-[86px] relative">
        <div className="text-4xl font-bold">JUMPFUN</div>
        <div>
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full mr-5"
            onClick={() => router.push("/jump/donate")}
          >
            Donate
          </button>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full"
            onClick={() => {
              if (walletInfo?.address) {
                onDisConnectBtnClickHandler(disConnectWallet);
              } else {
                onConnectBtnClickHandler(connectWallet);
              }
            }}
          >
            {walletInfo?.address ? hiddenAddress(walletInfo?.address) : "Login"}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
