"use client";

import React, { ReactNode } from "react";
import { ThemeProvider } from "next-themes"; 

type Props = {
  children: ReactNode;
};

const MyThemeProvider = ({ children }: Props) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      {children}
    </ThemeProvider>
  );
};

export default MyThemeProvider;
