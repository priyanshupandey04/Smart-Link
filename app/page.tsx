import Header from "@/components/Header";
import Hero from "@/components/Hero";
import React from "react";

const Page = () => {
  return (
    <div className="dark:bg-[#0a0f1a] bg-amber-50  w-screen relative pt-[0.1px] ">
      <div
        style={{
          background:
            "radial-gradient(circle, rgba(80,120,255,0.35) 0%, rgba(0,0,0,0) 100%)",
        }}
        className="absolute right-16 w-[500px] h-[500px] top-20 rounded-full blur-3xl -z-10 md:z-0"
      />

      <Header />
      <Hero />
    </div>
  );
};

export default Page;
