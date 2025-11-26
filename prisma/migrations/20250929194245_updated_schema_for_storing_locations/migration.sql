/*
  Warnings:

  - You are about to drop the `Pool` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."Pool";

-- CreateTable
CREATE TABLE "public"."pool" (
    "id" SERIAL NOT NULL,
    "shortId" BIGINT NOT NULL,

    CONSTRAINT "pool_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pool_shortId_key" ON "public"."pool"("shortId");

-- CreateIndex
CREATE INDEX "pool_shortId_idx" ON "public"."pool"("shortId");
