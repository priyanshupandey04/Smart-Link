"use client";

import {
  ChevronDown,
  ChevronUp,
  ClockFading,
  Link,
  Lock,
  PencilLine,
  Zap,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import Input from "./Input";
import Options from "./Options";
import { toast } from "sonner";
import { isUrlCorrect } from "@/lib/isUrlCorrect";
import CopyToclipBoard from "./CopyToclipBoard";
import { encryptedPassword } from "@/lib/utils";
import { DateTime } from "./DateTime";

type Props = {};

const Main = (props: Props) => {
  const [isCustomizeActive, setIsCustomizeActive] = useState(false);
  const [isPasswordActive, setIsPasswordActive] = useState(false);
  const [isExpiryActive, setIsExpiryActive] = useState(false);
  const [linkerror, setLinkError] = useState<string | null>(null);
  const [customizeError, setCustomizeError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [expiryError, setExpiryError] = useState<string | null>(null);
  const [createdSuccessfully, setCreatedSuccessfully] = useState(false);
  const [shortId, setShortId] = useState<string | null>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const customRef = useRef<HTMLInputElement>(null);
  const expiryRef = useRef<HTMLInputElement>(null);
  const [isUrlShortening, setIsUrlShortening] = useState(false);

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string | undefined>("10:30:00");

  const HandleSubmit = async (formData: FormData) => {
    setLinkError(null);
    setCustomizeError(null);
    setPasswordError(null);
    setExpiryError(null);
    setCreatedSuccessfully(false);
    setShortId(null);

    let isAllChecked: Boolean = false;

    // Small delay for smoothness
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Check empty fields
    if (isPasswordActive && !passRef.current?.value.trim()) {
      setPasswordError("Please enter a password");
      isAllChecked = true;
    }

    if (isCustomizeActive && !customRef.current?.value.trim()) {
      setCustomizeError("Please enter a custom slug");
      isAllChecked = true;
    }

    // Collect form data

    const input = formData.get("link") as string;
    const password = passRef?.current?.value as string | null;
    const custom = customRef?.current?.value as string | null;

    if (date && time) {
      const [hours, minutes, seconds] = time.split(":").map(Number);

      // Convert IST time to UTC before setting, because JS Date stores in UTC internally
      const dateInIST = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        hours,
        minutes,
        seconds || 0
      );

      // IST = UTC + 5:30 → so UTC = IST - 5:30
      const utcTime = dateInIST.getTime() ;

      date.setTime(utcTime);
    }

    console.log("date = ", date, "tyye = ", typeof date);

    if (isExpiryActive && !date) {
      setExpiryError("Please select a date");
      isAllChecked = true;
    }

    // Basic validation
    if (!input || !input.trim() || !isUrlCorrect(input)) {
      setLinkError("Please enter a valid link");
      isAllChecked = true;
    }

    console.log({
      input,
      password: password || "N/A",
      custom: custom || "N/A",
    });
    if (isAllChecked) {
      return;
    }
    setIsUrlShortening(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (isCustomizeActive) {
      async function createWithSlug() {
        const res = await fetch("/api/createWithSlug", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            correctUrl: input,
            slug: custom,
            password: encryptedPassword(password || ""),
            isPassword: isPasswordActive,
            expiry: date
              ? date
              : new Date().setFullYear(new Date().getFullYear() + 1),
            isExpiry: isExpiryActive,
          }),
        });
        const data = await res.json();
        console.log("a) data", data);
        if (res.status === 200) {
          setCustomizeError(null);
          setShortId(data.shortId);
        } else {
          setCustomizeError(data.error);
          isAllChecked = true;
        }
      }

      await createWithSlug();
      console.log("11");
    }

    console.log("2 isAllChecked", isAllChecked);
    if (isAllChecked) {
      setIsUrlShortening(false);
      return;
    }

    if (!isCustomizeActive) {
      async function createWithPassword() {
        console.log("creating with date = ", date);
        const res = await fetch("/api/createWithoutSlug", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            correctUrl: input,
            password: encryptedPassword(password || ""),
            isPassword: isPasswordActive,
            expiry: date
              ? date
              : new Date().setFullYear(new Date().getFullYear() + 1),
            isExpiry: isExpiryActive,
          }),
        });
        const data = await res.json();
        console.log(
          ".........data",
          data,
          "data.status",
          data.status + " res status",
          res.status
        );
        if (res.status == 200) {
          setPasswordError(null);
          setShortId(data.shortId);
        } else {
          setPasswordError(data.error);
          return;
        }
      }
      await createWithPassword();

      console.log("222");
    }

    if (isAllChecked) {
      setIsUrlShortening(false);
      return;
    }

    toast.custom((t) => (
      <div className="p-4  bg-gradient-to-br from-blue-400 via-blue-500/90 to-purple-500 w-52 flex  justify-center items-center  rounded-2xl cursor-pointer hover:scale-105  text-sm">
        Successfully shortened!
      </div>
    ));
    setCreatedSuccessfully(true);
    setIsUrlShortening(false);
    console.log("✅ Form submitted successfully!");
  };

  return (
    <div
      style={{ boxShadow: "0 0 20px 20px rgba(52, 152, 242, 0.25)" }}
      className="mt-10 dark:bg-black/80 bg-white w-[97%] sm:w-3/4 md:w-2/3 lg:w-1/2 flex flex-col items-center justify-center  md:px-3 py-9 rounded-xl gap-4 transition-all"
    >
      <form action={HandleSubmit} className="flex md:w-[90%] w-[95%] gap-4">
        <Input>
          <Link className="dark:text-white text-black/70" />
          <input
            name="link"
            className="w-full h-full focus:outline-none dark:text-white text-black text-md px-2"
            type="text"
            placeholder="Paste your link here..."
          />
        </Input>

        <button
          type="submit"
          disabled={isUrlShortening}
          onClick={() => {
            setShortId(null);
            setCreatedSuccessfully(false);
          }}
          className={`bg-gradient-to-r from-blue-500 via-blue-600/90 to-purple-500 sm:w-52 w-28 flex shrink-0 justify-center items-center gap-2  px-2 rounded-2xl   transition-all ${
            isUrlShortening
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer hover:scale-105"
          }`}
        >
          <Zap className="hidden sm:block" />
          <p className="text-white font-bold sm:text-lg text-sm ">
            {isUrlShortening ? "Shortening..." : "Shorten now"}
          </p>
        </button>
      </form>
      {linkerror && <p className="text-red-500 text-sm">{linkerror}</p>}

      {/* Options row */}
      <div className="flex gap-5">
        <Options>
          <div
            className="flex gap-2 items-center justify-center group cursor-pointer"
            onClick={() => {
              setIsCustomizeActive((prev) => !prev);
            }}
          >
            <PencilLine
              size={13}
              className="group-hover:-skew-x-12 dark:text-white text-black"
            />
            <p className="text-sm dark:text-white text-black">Customize</p>
            {!isCustomizeActive ? (
              <ChevronDown className="dark:text-white text-black" />
            ) : (
              <ChevronUp className="dark:text-white text-black" />
            )}
          </div>
        </Options>

        <Options>
          <div
            className="flex gap-2 items-center justify-center group cursor-pointer"
            onClick={() => {
              setIsPasswordActive((prev) => !prev);
            }}
          >
            <Lock
              size={15}
              className={`${
                isPasswordActive
                  ? "dark:text-blue-400 text-blue-800"
                  : "dark:text-white text-black"
              }`}
            />
            <p className="text-sm pt-0.5 dark:text-white text-black">
              Password
            </p>
          </div>
        </Options>

        <Options>
          <div
            className="flex gap-2 items-center justify-center group cursor-pointer"
            onClick={() => {
              setIsExpiryActive((prev) => !prev);
            }}
          >
            <ClockFading
              size={15}
              className={`${
                isExpiryActive
                  ? "dark:text-blue-400 text-blue-800"
                  : "dark:text-white text-black"
              }`}
            />
            <p className="text-sm  dark:text-white text-black">Expiry</p>
          </div>
        </Options>
      </div>

      {/* Dynamic inputs */}
      <div className="w-[90%] space-y-3">
        {isCustomizeActive && (
          <>
            <div
              className={`rounded-2xl sm:w-[80%] w-[100%] ${
                customizeError ? "animate-wrongInput ring-4 ring-red-500" : ""
              }`}
            >
              <Input>
                <input
                  name="custom"
                  ref={customRef}
                  className="w-full h-full focus:outline-none dark:text-white text-black text-md px-2"
                  type="text"
                  placeholder="✨ Enter custom slug (e.g., abc123)"
                />
              </Input>
            </div>

            {customizeError && (
              <p className="text-red-500 text-sm">{customizeError}</p>
            )}
          </>
        )}

        {isPasswordActive && (
          <>
            <div
              className={`rounded-2xl sm:w-[80%] w-[100%] ${
                passwordError ? "animate-wrongInput ring-4 ring-red-500" : ""
              }`}
            >
              <Input>
                <input
                  name="password"
                  ref={passRef}
                  className="w-full h-full focus:outline-none dark:text-white text-black text-md px-2"
                  type="text"
                  placeholder="🔒 Add a password"
                />
              </Input>
            </div>

            {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )}
          </>
        )}

        {isExpiryActive && (
          <>
            <div
              className={`rounded-2xl w-[100%] sm:w-[80%] ${
                expiryError ? "animate-wrongInput ring-4 ring-red-500" : ""
              }`}
            >
              <Input>
                <div className=" w-full flex justify-center items-center gap-10">
                  <p className={`text-gray-400 hidden md:block`}>
                    Set expiry date and time[HR:Min:Sec]
                  </p>
                  <DateTime
                    date={date}
                    setDate={setDate}
                    time={time}
                    setTime={setTime}
                    open={open}
                    setOpen={setOpen}
                  />
                </div>
              </Input>
            </div>

            {expiryError && (
              <p className="text-red-500 text-sm">{expiryError}</p>
            )}
          </>
        )}
      </div>
      {createdSuccessfully && shortId && <CopyToclipBoard shortId={shortId} />}
    </div>
  );
};

export default Main;
