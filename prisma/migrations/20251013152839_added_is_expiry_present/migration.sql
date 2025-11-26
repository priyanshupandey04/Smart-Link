-- AlterTable
ALTER TABLE "shortIdWithSlug" ADD COLUMN     "isExpiry" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "shortIdWithoutSlug" ADD COLUMN     "isExpiry" BOOLEAN DEFAULT false;
