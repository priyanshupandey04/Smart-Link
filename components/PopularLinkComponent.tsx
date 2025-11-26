"use client";

import { Link, TrendingUp } from "lucide-react";
import React, { useEffect, useState } from "react";

type Props = {
  shortLink: string;
  clicks: number;
  deltapercent: number;
};

const PopularLinkComponent = (props: Props) => {
  const [baseUrl, setBaseUrl] = useState<string | null>(null);

  useEffect(() => {
    // only run on client
    if (typeof window !== "undefined") {
      setBaseUrl(window.location.origin);
    }
  }, []);
  // baseUrl = baseUrl.replace("http://", "");
  setBaseUrl((prev) => prev?.replace("http://", "") || null);

  return (
    <div className="py-12  h-20 dark:bg-black bg-white rounded-2xl flex items-center justify-between group hover:scale-105 transition-transform duration-200 cursor-pointer glow ">
      <div className="flex items-center gap-4 p-4 w-fit">
        <div
          className="glow glowOnHover bg-gradient-to-br from-blue-900/60 via-black/50 to bg-purple-900/50 
                     rounded-xl p-3 border border-blue-400 text-blue-400 
                     group-hover:scale-110 transition-all duration-100"
        >
          <Link
            size={28}
            className="group-hover:rotate-12 transition-all duration-100"
          />
        </div>

        <div className="flex flex-col gap-1 dark:text-white text-black">
          <p>{baseUrl + "/" + props.shortLink.substring(0, 5) + "..."}</p>
          <div className="flex gap-2 items-center">
            <TrendingUp size={10} />{" "}
            <span className="text-sm text-gray-400">{props.clicks} clicks</span>
          </div>
        </div>
      </div>

      <div className="border border-green-400 p-2 mr-4 bg-green-900/50 rounded-xl text-nowrap">
        <p className="font-bold dark:text-green-400 text-green-800">
          + {props.deltapercent}%
        </p>
      </div>
    </div>
  );
};

export default PopularLinkComponent;
