"use client";

import { encryptedPassword } from "@/lib/utils";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {
  shortId: string;
};

const FetchParam = (props: Props) => {
  const { shortId } = props;
  const baseUrl = process.env.NEXT_PUBLIC_CURRENT_URL!;
  const [isIdCorrect, setIsIdCorrect] = useState(true);
  const [checkingForLocation, setCheckingForLocation] = useState(false);

  useEffect(() => {
    async function fetchTargetUrl() {
      let urlApi = "";
      if (!shortId.endsWith("_")) {
        urlApi = `${baseUrl}/api/getUrl/withoutSlug?shortId=${encodeURIComponent(
          shortId
        )}`;
      } else {
        urlApi = `${baseUrl}/api/getUrl/withSlug?slug=${encodeURIComponent(
          shortId
        )}`;
      }
      console.log("urlApi", urlApi);
      try {
        const res = await fetch(urlApi, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            shortId,
          }),
        });
        const json = await res.json();
        console.log("json", json);
        if (json.originalUrl) {
          let targetUrl = json.originalUrl;
          if (!/^https?:\/\//i.test(targetUrl)) {
            targetUrl = `https://${targetUrl}`;
          }
          return targetUrl;
        } else if (json.error) {
          throw new Error(json.error);
        }
      } catch (err) {
        console.error("Redirect API fetch failed:", err);
        if ((err as { message: string }).message === "Password required") {
          redirect(`/p/${shortId}`);
        }
      }
      return null;
    }

    async function handleLocationAndRedirect() {
      const targetUrl = await fetchTargetUrl();
      if (!targetUrl) {
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

        // send lat/lon and redirect instantly
        sendLocation(pos.coords.latitude, pos.coords.longitude);
        window.location.href = targetUrl;
      };

      try {
        const ipRes = await fetch("https://ipwho.is/");
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

      window.location.href = targetUrl;
    }

    handleLocationAndRedirect();
  }, [shortId, baseUrl]);

  return (
    <div className="flex items-center justify-center w-full h-screen">
      {!checkingForLocation && (
        <h1 className="text-2xl font-bold">
          {isIdCorrect ? "Checking link..." : "Link not found"}
        </h1>
      )}
      {checkingForLocation && (
        <h1 className="text-2xl font-bold">Getting you in...</h1>
      )}
    </div>
  );
};

export default FetchParam;
