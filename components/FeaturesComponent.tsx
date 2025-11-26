import React, { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  title?: string;
  description?: string;
};

const FeaturesComponent = (props: Props) => {
  return (
    <div
      className="w-[100%] bg-white dark:bg-black/80 p-8 rounded-2xl group cursor-pointer hover:scale-105 transition-transform duration-200 active:scale-99"
      style={{
        boxShadow: "0 0 15px 5px rgba(52, 152, 242, 0.2)",
      }}
    >
      <div
        className="glow glowOnHover bg-gradient-to-br from-blue-900/60 via-black/50 to bg-purple-900/50 
                     rounded-xl p-3 border border-blue-400 text-blue-400 
                     group-hover:scale-110 transition-all duration-100 h-16 w-16 flex items-center justify-center"
      >
        <div className="group-hover:rotate-12 transition-transform delay-10">
          {props.children}
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-10">
        <div className="flex gap-2 items-center">
          <p className="text-2xl  font-bold text-gray-700 dark:text-gray-200">
            {props.title}
          </p>
        </div>
        <p className="text-md font-medium text-gray-400">{props.description}</p>
      </div>
    </div>
  );
};

export default FeaturesComponent;
