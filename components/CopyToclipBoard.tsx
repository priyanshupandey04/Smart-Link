// components/CopyToclipBoard.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Copy } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import QRCode from "react-qr-code";

type Props = {
  shortId: string;
};

const CopyToclipBoard: React.FC<Props> = ({ shortId }) => {
  const [baseUrl, setBaseUrl] = useState<string | null>(null);

  useEffect(() => {
    // only run on client
    if (typeof window !== "undefined") {
      setBaseUrl(window.location.origin);
    }
  }, []);

  const fullUrl = baseUrl ? `${baseUrl}/${shortId}` : `/${shortId}`;

  const handleCopy = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(fullUrl);
        toast.custom(() => (
          <div className="p-4 bg-gradient-to-br from-blue-400 via-blue-500/90 to-purple-500 w-52 flex justify-center items-center rounded-2xl text-sm">
            Copied to clipboard!
          </div>
        ));
      } else {
        // fallback: select text (or show message)
        console.log("Clipboard API not available");
        toast("Clipboard API not available in this browser");
      }
    } catch (err) {
      console.error("Copy failed", err);
      toast("Failed to copy");
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:gap-10 gap-2 w-[90%]">
      <div className="flex flex-col items-center justify-center">
        <div>
          <div className="bg-black/50 flex justify-center items-center gap-10 rounded-2xl cursor-pointer p-2 py-3 border border-blue-400">
            <a
              href={fullUrl}
              target="_blank"
              rel="noreferrer"
              className="text-white font-semibold text-base px-2 underline hover:text-blue-500"
            >
              {fullUrl}
            </a>

            <button
              onClick={handleCopy}
              aria-label="Copy link"
              className="pl-2"
            >
              <Copy size={18} className="active:scale-95 transition-all duration-100" />
            </button>
          </div>
        </div>

        <div className="md:opacity-100 opacity-0 md:w-[80%] md:mt-5">
          <p className="text-center font-sans">
            Scan QR code to access the shortened link or copy the link to clipboard.
          </p>
        </div>
      </div>

      <div className="rounded-2xl h-56 py-1 px-0 md:p-2 flex justify-center items-center">
        {/* react-qr-code renders client-side properly because this component is client-only */}
        <QRCode value={fullUrl} level="H" className="h-[100%] w-[100%] rounded-2xl" />
      </div>
    </div>
  );
};

export default CopyToclipBoard;
