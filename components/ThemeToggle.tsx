"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useState } from "react";

const ThemeToggle = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { theme, setTheme } = useTheme();
  return (
    <div>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="h-7 w-7 cursor-pointer dark:hover:bg-gray-300/20 hover:bg-gray-800/40 flex items-center justify-center  rounded "
      >
        {theme === "dark" ? (
          <Sun
            className={` ${
              isHovered
                ? "animate-rotateLightModeIn"
                : "animate-rotateLightModeOut"
            }`}
            size={20}
          />
        ) : (
          <Moon
            size={20}
            className={` ${
              isHovered
                ? "animate-rotateLightModeIn"
                : "animate-rotateLightModeOut"
            }`}
          />
        )}
      </div>
    </div>
  );
};

export default ThemeToggle;
