import {
  ChartNoAxesCombined,
  Clock4,
  HandHelping,
  Link,
  Lock,
  QrCode,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";
import React from "react";
import PopularLinkComponent from "./PopularLinkComponent";
import FeaturesComponent from "./FeaturesComponent";

type Props = {};

const PopularLinks = (props: Props) => {
  return (
    <div className="mt-20 w-[90%] flex flex-col items-center justify-center gap-4">
      <div className="flex items-center gap-4  w-[100%] sm:w-[30%]">
        <div className="h-10 w-10 bg-gradient-to-br from-blue-500 via-blue-600/90 to bg-purple-500 rounded-md">
          <TrendingUp className="m-2 text-white" />
        </div>
        <div className="bg-gradient-to-r from-blue-500 via-blue-600/90 to bg-purple-500 text-transparent bg-clip-text">
          <h1 className="text-3xl font-bold">Popular Short Links 🔥</h1>
        </div>
      </div>
      <div className="w-[100%] md:w-[90%] lg:w-[80%] grid  gap-6  mt-5 grid-cols-1  md:grid-cols-2 lg:grid-cols-2   ">
        <PopularLinkComponent shortLink="123" clicks={10} deltapercent={0.5} />
        <PopularLinkComponent
          shortLink="account_"
          clicks={7}
          deltapercent={0.8}
        />
        <PopularLinkComponent
          shortLink="myShop123_"
          clicks={20}
          deltapercent={3.5}
        />
        <PopularLinkComponent shortLink="5" clicks={15} deltapercent={1.2} />
      </div>

      <div className="flex items-center gap-4  w-[100%] sm:w-[30%] mt-10">
        <div className="h-10 w-10 bg-gradient-to-br from-blue-500 via-blue-600/90 to bg-purple-500 rounded-md">
          <HandHelping className="m-2 text-white" />
        </div>
        <div className="bg-gradient-to-r from-blue-500 via-blue-600/90 to bg-purple-500 text-transparent bg-clip-text">
          <h1 className="text-3xl font-bold">Features & Benefits 🔥</h1>
        </div>
      </div>

      <div className="w-[90%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5 mb-20">
        <FeaturesComponent
          title="Ultra-Short"
          description="Shortest numeric links possible"
        >
          <Zap />
        </FeaturesComponent>
        <FeaturesComponent
          title="Secure Links"
          description="Password protection built-in

"
        >
          <Lock />
        </FeaturesComponent>
        <FeaturesComponent
          title="QR Codes"
          description="Generate QR codes for your links"
        >
          <QrCode />
        </FeaturesComponent>
        <FeaturesComponent
          title="Expiry Times"
          description="Auto-delete expired links"
        >
          <Clock4 />
        </FeaturesComponent>

        <FeaturesComponent
          title="Analytics"
          description="Track clicks & location"
        >
          <ChartNoAxesCombined />
        </FeaturesComponent>
        <FeaturesComponent
          title="Custom Slugs"
          description="Customize your links with custom slugs"
        >
          <Sparkles />
        </FeaturesComponent>
      </div>
    </div>
  );
};

export default PopularLinks;
