/*
  Warnings:

  - You are about to drop the column `expireAt` on the `shortIdWithSlug` table. All the data in the column will be lost.
  - You are about to drop the column `expireAt` on the `shortIdWithoutSlug` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "shortIdWithSlug" DROP COLUMN "expireAt";

-- AlterTable
ALTER TABLE "shortIdWithoutSlug" DROP COLUMN "expireAt";
