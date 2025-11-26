import { Link } from "lucide-react";
import React, { ReactNode, useState } from "react";

type Props = {
    children?: ReactNode;
};

const Input = ({children}: Props) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={`w-[100%] h-16 dark:bg-black  bg-white flex items-center justify-center gap-1 px-3 py-2 rounded-2xl border border-blue-600 hover:border-blue-400 focus:right-2  ${
        isFocused ? "ring-2 ring-blue-400" : ""
      }`}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      {children}
    </div>
  );
};

export default Input;
