"use client";
import React, { ReactNode, useState, useRef, useEffect } from "react";

type Props = {
  children: ReactNode;
};

const Options = ({ children }: Props) => {
  const [active, setActive] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  // Detect click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        setActive(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={divRef}
      onClick={() => setActive(true)}
      className={`flex flex-col items-center justify-center gap-2  h-10
        dark:bg-black bg-white px-3 py-2 rounded-2xl border border-blue-600 
        hover:border-blue-400 
        ${active ? "ring-3 ring-blue-600" : ""}`}
    >
      {children}
    </div>
  );
};

export default Options;
