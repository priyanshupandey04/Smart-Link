/*
  Warnings:

  - You are about to drop the `geoLocation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pool` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `shortIdWithSlug` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `shortIdWithoutSlug` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."geoLocation";

-- DropTable
DROP TABLE "public"."pool";

-- DropTable
DROP TABLE "public"."shortIdWithSlug";

-- DropTable
DROP TABLE "public"."shortIdWithoutSlug";

-- CreateTable
CREATE TABLE "public"."ShortIdWithSlug" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "correctUrl" TEXT NOT NULL,
    "expireAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUsedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ShortIdWithSlug_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ShortIdWithoutSlug" (
    "id" SERIAL NOT NULL,
    "shortId" BIGINT NOT NULL,
    "correctUrl" TEXT NOT NULL,
    "expireAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUsedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ShortIdWithoutSlug_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."GeoLocation" (
    "id" SERIAL NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "address" TEXT NOT NULL,
    "shortIdWithSlugId" INTEGER,
    "shortIdWithoutSlugId" INTEGER,

    CONSTRAINT "GeoLocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Pool" (
    "id" SERIAL NOT NULL,
    "shortId" BIGINT NOT NULL,

    CONSTRAINT "Pool_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ShortIdWithSlug_slug_key" ON "public"."ShortIdWithSlug"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ShortIdWithoutSlug_shortId_key" ON "public"."ShortIdWithoutSlug"("shortId");

-- CreateIndex
CREATE UNIQUE INDEX "Pool_shortId_key" ON "public"."Pool"("shortId");

-- CreateIndex
CREATE INDEX "Pool_shortId_idx" ON "public"."Pool"("shortId");

-- AddForeignKey
ALTER TABLE "public"."GeoLocation" ADD CONSTRAINT "GeoLocation_shortIdWithSlugId_fkey" FOREIGN KEY ("shortIdWithSlugId") REFERENCES "public"."ShortIdWithSlug"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."GeoLocation" ADD CONSTRAINT "GeoLocation_shortIdWithoutSlugId_fkey" FOREIGN KEY ("shortIdWithoutSlugId") REFERENCES "public"."ShortIdWithoutSlug"("id") ON DELETE SET NULL ON UPDATE CASCADE;
