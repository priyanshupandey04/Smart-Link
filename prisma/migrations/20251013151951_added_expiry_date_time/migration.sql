/*
  Warnings:

  - You are about to drop the column `lastUsedAt` on the `shortIdWithSlug` table. All the data in the column will be lost.
  - The `expiry` column on the `shortIdWithSlug` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `lastUsedAt` on the `shortIdWithoutSlug` table. All the data in the column will be lost.
  - The `expiry` column on the `shortIdWithoutSlug` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "shortIdWithSlug" DROP COLUMN "lastUsedAt",
DROP COLUMN "expiry",
ADD COLUMN     "expiry" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "shortIdWithoutSlug" DROP COLUMN "lastUsedAt",
DROP COLUMN "expiry",
ADD COLUMN     "expiry" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;
