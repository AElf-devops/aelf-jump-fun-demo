"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function JumpFun() {
  const router = useRouter();
  const onGotoCreate = useCallback(() => {
    router.push("/jump/create");
  }, []);
  return (
    <div className="home flex align-middle justify-center flex-col">
      <div className="home-banner p-t-[190px] flex items-center relative flex-col w-[1200px] h-[472px] m-auto">
        <button
          className="home-create-btn rounded-md w-[340px] h-[64px] p-[0 56px] text-[22px]"
          onClick={() => onGotoCreate()}
        >
          Create
        </button>
      </div>
    </div>
  );
}
