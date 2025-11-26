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

    CONSTRAINT "geoLocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."pool" (
    "id" SERIAL NOT NULL,
    "shortId" BIGINT NOT NULL,

    CONSTRAINT "pool_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "shortIdWithSlug_slug_key" ON "public"."shortIdWithSlug"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "shortIdWithoutSlug_shortId_key" ON "public"."shortIdWithoutSlug"("shortId");

-- CreateIndex
CREATE UNIQUE INDEX "shortIdWithoutSlug_correctUrl_key" ON "public"."shortIdWithoutSlug"("correctUrl");

-- CreateIndex
CREATE UNIQUE INDEX "pool_shortId_key" ON "public"."pool"("shortId");

-- CreateIndex
CREATE INDEX "pool_shortId_idx" ON "public"."pool"("shortId");
