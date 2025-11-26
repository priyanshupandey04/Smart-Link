import React from "react";
import CustomButton from "./customButton";
import Main from "./Main";
import PopularLinks from "./PopularLinks";
import { Sparkles, Zap } from "lucide-react";


const Hero = () => {
  return (
    <div className="flex flex-col items-center  pb-20">
      
      <CustomButton width="220">
        <div
          className={`flex gap-2 border-1 border-blue-400 py-2 px-4 rounded-4xl items-center justify-center bg-gradient-to-r dark:from-blue-400 from-blue-600 to-purple-400   bg-clip-text w-56 h-9 `}
        >
          <div>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="  w-5 h-5  animate-pulse text-blue-400"
            >
              <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
            </svg>
          </div>
          <div>
            <p className="font-medium text-sm text-transparent">
              Next-Gen URL Shortener
            </p>
          </div>
        </div>
      </CustomButton>

      <div
        className={`mt-8 md:text-7xl text-5xl font-bold font-sans w-[100%] md:w-[40%] text-center`}
      >
        <p className="dark:text-white text-gray-800">
          {" "}
          Make Your Links{" "}
          <span
            className={`bg-gradient-to-r dark:from-blue-400 to dark:bg-purple-400
                from-blue-600 to bg-purple-600
                bg-clip-text text-transparent animate-pulse`}
          >
            Ultra Smart
          </span>
        </p>
      </div>

      <div className={`mt-5 md:w-[38%] w-[94%] `}>
        <p
          className={`md:text-xl text-base font-medium text-center dark:text-gray-400 text-gray-800 `}
        >
          Create the{" "}
          <span className="dark:text-blue-400 text-blue-800">
            shortest possible links
          </span>{" "}
          with powerful features like custom slugs, password protection, expiry
          times, and QR codes.
        </p>
      </div>

      <Main />
      <PopularLinks />
      <div className="w-full  ">
        <CustomButton>
          <div
            className={`flex gap-2 border-1 border-blue-400 py-2 px-4 rounded-4xl items-center justify-center bg-gradient-to-r dark:from-blue-400 from-blue-600 to-purple-400  bg-clip-text  `}
          >
            <div className="flex gap-2 items-center justify-center m-2">
              <Sparkles size={14} className="text-blue-300 animate-pulse" />
              <p className="font-medium md:text-lg text-xs text-transparent text-nowrap">
                Built with SmartLink • Ultra-Smart URL Shortening Platform
              </p>
              <Zap size={14} className="text-purple-400 animate-pulse" />
            </div>
          </div>
        </CustomButton>
      </div>
    </div>
  );
};

export default Hero;
