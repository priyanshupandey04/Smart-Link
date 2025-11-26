"use client";

import React, { useState } from "react";
import { Link, Sparkles, Sun } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();

  return (
    <div
      className={`mt-3 md:mx-20 mx-5 h-18 p-[0.1px] items-center flex justify-between `}
    >
      <div className={`flex gap-3  w-fit items-center`}>
        <div
          className={`bg-gradient-to-br from-[#3479F2]  to-purple-500 h-12 w-12 flex items-center justify-center rounded-xl shadow-[0_0px_100px_rgba(52,200,242,1)] animate-shadowAnimate`}
        >
          <Link className={`text-white`} href="/"></Link>
        </div>
        <div>
          <div className="h-8">
            <p
              className={` font-bold text-[26px] font-sans tracking-[0.03em] bg-gradient-to-r from-[#3479F2]  to-purple-500 text-transparent bg-clip-text`}
            >
              SmartLink
            </p>
          </div>
          <div>
            <p className={`font-semibold text-sm text-gray-500 `}>
              Ultra-Short URLs⚡
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-3 dark:text-white text-black">
        <ThemeToggle />
        <div className="flex space-x-2.5 dark:bg-black bg-blue-950/10 py-1.5 items-center px-2.5 rounded-md ring-2 ring-blue-500 hover:cursor-pointer active:scale-98 select-none">
          <div>
            <Sparkles size={14} />
          </div>
          <div
            onClick={() => {
              router.push("/dashboard");
            }}
          >
            <p className={`text-xs font-[600]  dark:bg-transparent `}>
              Dashboard
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
