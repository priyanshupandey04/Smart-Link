/*
  Warnings:

  - You are about to drop the column `shortId` on the `shortIdWithoutSlug` table. All the data in the column will be lost.
  - You are about to drop the `pool` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "public"."shortIdWithoutSlug_shortId_key";

-- AlterTable
ALTER TABLE "public"."shortIdWithoutSlug" DROP COLUMN "shortId";

-- DropTable
DROP TABLE "public"."pool";
