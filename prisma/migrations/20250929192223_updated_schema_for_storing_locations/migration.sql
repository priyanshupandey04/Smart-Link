-- DropForeignKey
ALTER TABLE "public"."geoLocation" DROP CONSTRAINT "geoLocation_shortIdWithSlugId_fkey";

-- DropForeignKey
ALTER TABLE "public"."geoLocation" DROP CONSTRAINT "geoLocation_shortIdWithoutSlugId_fkey";

-- AddForeignKey
ALTER TABLE "public"."geoLocation" ADD CONSTRAINT "geoLocation_shortIdWithSlugId_fkey" FOREIGN KEY ("shortIdWithSlugId") REFERENCES "public"."shortIdWithSlug"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."geoLocation" ADD CONSTRAINT "geoLocation_shortIdWithoutSlugId_fkey" FOREIGN KEY ("shortIdWithoutSlugId") REFERENCES "public"."shortIdWithoutSlug"("id") ON DELETE CASCADE ON UPDATE CASCADE;
