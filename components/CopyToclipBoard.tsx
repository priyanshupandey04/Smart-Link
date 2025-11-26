import { Copy } from "lucide-react";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";
import QRCode from "react-qr-code";

type Props = {
  shortId: string;
};

const CopyToclipBoard = (props: Props) => {
  const baseUrl = window.location.origin || "http://localhost:3000";

  const newUrl = `${baseUrl}/${props.shortId}`;

  return (
    <div className="flex flex-col md:flex-row md:gap-10 gap-2 w-[90%]">
      <div className="flex flex-col items-center justify-center">
        <div>
          <button
            onClick={() => {
              navigator.clipboard.writeText(newUrl);
            }}
            className="bg-black/50  flex  justify-center items-center gap-10 rounded-2xl cursor-pointer  p-2 py-3 border border-blue-400"
          >
            <Link
              href={newUrl}
              target="_blank"
              className="text-white font-semibold text-base px-2 underline hover:text-blue-500"
            >
              {newUrl}
            </Link>
            <span
              onClick={() => {
                console.log("Copied to clipboard");
                toast.custom((t) => (
                  <div className="p-4  bg-gradient-to-br from-blue-400 via-blue-500/90 to-purple-500 w-52 flex  justify-center items-center  rounded-2xl cursor-pointer hover:scale-105  text-sm">
                    Copied to clipboard!
                  </div>
                ));
              }}
            >
              <Copy
                size={18}
                className="active:scale-5 transition-all duration-100 "
              />
            </span>
          </button>
        </div>
        <div className="md:opacity-100 opacity-0 md:w-[80%] md:mt-5">
          <p className="text-center font-sans">
            Scan QR code to access the shortened link or copy the link to
            clipboard.
          </p>
        </div>
      </div>

      <div className="rounded-2xl  h-56 py-1 px-0 md:p-2 flex justify-center items-center ">
        <QRCode
          value={newUrl}
          level="H"
          className="h-[100%] w-[100%] rounded-2xl"
        />
      </div>
    </div>
  );
};

export default CopyToclipBoard;
