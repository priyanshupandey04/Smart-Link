/*
  Warnings:

  - You are about to drop the `GeoLocation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ShortIdWithSlug` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ShortIdWithoutSlug` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."GeoLocation" DROP CONSTRAINT "GeoLocation_shortIdWithSlugId_fkey";

-- DropForeignKey
ALTER TABLE "public"."GeoLocation" DROP CONSTRAINT "GeoLocation_shortIdWithoutSlugId_fkey";

-- DropTable
DROP TABLE "public"."GeoLocation";

-- DropTable
DROP TABLE "public"."ShortIdWithSlug";

-- DropTable
DROP TABLE "public"."ShortIdWithoutSlug";

-- CreateTable
CREATE TABLE "public"."shortIdWithSlug" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "correctUrl" TEXT NOT NULL,
    "expireAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUsedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "shortIdWithSlug_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."shortIdWithoutSlug" (
    "id" SERIAL NOT NULL,
    "shortId" BIGINT NOT NULL,
    "correctUrl" TEXT NOT NULL,
    "expireAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUsedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "shortIdWithoutSlug_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."geoLocation" (
    "id" SERIAL NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "address" TEXT NOT NULL,
    "shortIdWithSlugId" INTEGER,
    "shortIdWithoutSlugId" INTEGER,

    CONSTRAINT "geoLocation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "shortIdWithSlug_slug_key" ON "public"."shortIdWithSlug"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "shortIdWithoutSlug_shortId_key" ON "public"."shortIdWithoutSlug"("shortId");

-- AddForeignKey
ALTER TABLE "public"."geoLocation" ADD CONSTRAINT "geoLocation_shortIdWithSlugId_fkey" FOREIGN KEY ("shortIdWithSlugId") REFERENCES "public"."shortIdWithSlug"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."geoLocation" ADD CONSTRAINT "geoLocation_shortIdWithoutSlugId_fkey" FOREIGN KEY ("shortIdWithoutSlugId") REFERENCES "public"."shortIdWithoutSlug"("id") ON DELETE SET NULL ON UPDATE CASCADE;
