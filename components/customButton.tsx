"use client";

import React, { useState } from "react";

type Props = {
  children?: React.ReactNode;
  width?: string;
};

const CustomButton = ({ children, width }: Props) => {
  const [hoveredNextGen, setHoveredNextGen] = useState(false);
  const normal = {
    boxShadow: "0 0 30px 8px rgba(52, 152, 242, 0.2)",
  };

  const hover = {
    boxShadow: "0 0 30px 12px rgba(52, 152, 242, 0.4)",
  };
  return (
    <div className={`flex flex-col items-center justify-center mt-10 w-full`}>
      <div
        style={hoveredNextGen ? hover : normal}
        onMouseEnter={() => setHoveredNextGen(true)}
        onMouseLeave={() => setHoveredNextGen(false)}
        className={` dark:bg-[#252655] bg-[#ffffff]   border-blue-500  rounded-4xl hover:scale-110 transition-transform duration-300 ease-in-out w-fit`}
      >
        {children}
      </div>
    </div>
  );
};

export default CustomButton;
