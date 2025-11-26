"use client";

import Input from "@/components/Input";
import { bcryptedPassword, encryptedPassword } from "@/lib/utils";
import { Eye, EyeOff, TriangleAlert } from "lucide-react";
import React, { useState } from "react";

type Props = {
  shortId: string;
};

const Main = (props: Props) => {
  const [isPwShown, setIsPwShown] = useState(false);
  const { shortId } = props;
  const baseUrl = process.env.NEXT_PUBLIC_CURRENT_URL!;
  const [isIdCorrect, setIsIdCorrect] = useState(true);
  const [password, setPassword] = useState("");
  const [isPwWrong, setIsPwWrong] = useState<string | null>(null);
  const [checkingForLocation, setCheckingForLocation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // ✅ rewritten: no stale state read, returns result explicitly
  async function fetchTargetUrl(): Promise<{
    targetUrl: string | null;
    error: string | null;
  }> {
    const urlApi = shortId.endsWith("_")
      ? `${baseUrl}/api/getUrl/withSlug`
      : `${baseUrl}/api/getUrl/withoutSlug`;

    console.log("urlApi", urlApi);

    try {
      const res = await fetch(urlApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shortId,
          password: encryptedPassword(password),
        }),
      });

      const json = await res.json();
      console.log("json", json);

      if (json.originalUrl) {
        let targetUrl = json.originalUrl;
        if (!/^https?:\/\//i.test(targetUrl)) {
          targetUrl = `https://${targetUrl}`;
        }

        setIsPwWrong(null);
        console.log("1111targetUrl", targetUrl);
        return { targetUrl, error: null };
      } else if (json.error) {
        throw new Error(json.error);
      }
    } catch (err: unknown) {
      let errMsg = null;

      if (err instanceof Error && err.message === "Wrong password") {
        errMsg = "Wrong password!! Try again.";
      } else if (err instanceof Error && err.message === "Password required") {
        errMsg = "Password required!! Enter password.";
      }

      if (errMsg) setIsPwWrong(errMsg);
      console.error("Redirect API fetch failed:", err);

      return { targetUrl: null, error: errMsg };
    }

    return { targetUrl: null, error: null };
  }

  async function handleLocationAndRedirect() {
    console.log("1111111111111111111111111111");

    setIsPwWrong(null);
    setIsIdCorrect(false);
    setIsLoading(true);

    const { targetUrl, error } = await fetchTargetUrl();
    console.log("targetUrl", targetUrl, "error", error);

    if (error) {
      setIsLoading(false);
      return;
    }

    if (!targetUrl) {
      setIsLoading(false);
      setIsIdCorrect(false);
      return;
    }

    setCheckingForLocation(true);

    // choose correct API based on shortId
    const beaconUrl = shortId.endsWith("_")
      ? "/api/createGeolocationWithSlug"
      : "/api/createGeolocationWithoutSlug";

    // helper to send lat/lon via beacon
    function sendLocation(lat: number, lon: number) {
      const data = { latitude: lat, longitude: lon, id: shortId };
      const blob = new Blob([JSON.stringify(data)], {
        type: "application/json",
      });
      console.log("Sending blob:", blob);
      console.log("beaconUrl", beaconUrl);
      console.log("Sending beacon:", data);
      navigator.sendBeacon(beaconUrl, blob);
    }

    const success = async (pos: {
      coords: { latitude: number; longitude: number; accuracy: number };
    }) => {
      console.log("📍 User Location:", {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
        accuracy: pos.coords.accuracy,
      });

      sendLocation(pos.coords.latitude, pos.coords.longitude);
      if (window !== undefined) window.location.href = targetUrl;
    };

    try {
      const ipRes = await fetch("https://ipapi.co/json/");
      if (ipRes.ok) {
        const ipData = await ipRes.json();
        if (ipData.latitude && ipData.longitude) {
          console.log("🌍 IP-based location:", {
            lat: ipData.latitude,
            lon: ipData.longitude,
          });
          sendLocation(ipData.latitude, ipData.longitude);
        }
      }
    } catch (e) {
      console.error("IP fallback failed", e);
    }

    // fallback redirect
    window.location.href = targetUrl;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <div className="flex justify-center items-center gap-7">
        <TriangleAlert size={25} className="animate-ping text-orange-400" />
        <h1 className="text-2xl font-bold">Password Required!</h1>
      </div>

      <div
        className={`w-[50%] space-y-3 mt-10 flex ${
          isPwWrong ? "animate-wrongInput ring-4 ring-red-500 rounded-2xl" : ""
        }`}
      >
        <Input>
          <input
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setIsLoading(true);
                setIsPwWrong(null);
                handleLocationAndRedirect();
              }
            }}
            type={isPwShown ? "text" : "password"}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`m-5 focus:outline-none dark:text-white text-black text-md px-2 w-full`}
          />

          {isPwShown ? (
            <Eye
              size={25}
              className="cursor-pointer"
              onClick={() => setIsPwShown(false)}
            />
          ) : (
            <EyeOff
              size={25}
              className="cursor-pointer"
              onClick={() => setIsPwShown(true)}
            />
          )}
        </Input>
      </div>

      {isPwWrong && <p className="text-red-500 text-base mt-3">{isPwWrong}</p>}

      <button
        onClick={() => {
          setIsLoading(true);
          setIsPwWrong(null);
          handleLocationAndRedirect();
        }}
        disabled={isLoading}
        className={`mt-8 bg-gradient-to-r from-blue-500 via-blue-600/90 to-purple-500 w-52 flex shrink-0 justify-center items-center gap-2 px-2 rounded-2xl transition-all h-16 ${
          isLoading
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer hover:scale-105 active:scale-95"
        }`}
      >
        <p className="text-white font-semibold text-lg">
          {isLoading ? "Redirecting..." : "Go to the target URL"}
        </p>
      </button>

      {!isIdCorrect && !isPwWrong && !isLoading && (
        <p className="text-red-500 text-lg mt-5">❌ Link not found</p>
      )}
    </div>
  );
};

export default Main;
