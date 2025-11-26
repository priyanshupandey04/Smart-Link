-- AlterTable
ALTER TABLE "shortIdWithSlug" ADD COLUMN     "expiry" INTEGER,
ADD COLUMN     "password" TEXT;

-- AlterTable
ALTER TABLE "shortIdWithoutSlug" ADD COLUMN     "expiry" INTEGER,
ADD COLUMN     "password" TEXT;
