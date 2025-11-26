import CryptoJS from "crypto-js";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import bcrypt from "bcryptjs";
const secret = "my-secret-key";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isExpired(expiry: Date) {
  const now = new Date();
  console.log("expiry = ", expiry, " now = ", now);
  return expiry < now;
}

export function bcryptedPassword(password: string) {
  const encryptedPass = bcrypt.hashSync(password, 10);
  return encryptedPass;
}


export function encryptedPassword(plainPassword: string) {
  const encryptedPass = CryptoJS.AES.encrypt(plainPassword, secret);
  console.log("encryptedPass", encryptedPass);
  return encryptedPass.toString();
}

export function decryptedPassword(encryptedPassword: string) {
  const decrypted = CryptoJS.AES.decrypt(encryptedPassword, secret);
  return decrypted.toString(CryptoJS.enc.Utf8);
}
