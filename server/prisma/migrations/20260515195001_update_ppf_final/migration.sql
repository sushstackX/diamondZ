/*
  Warnings:

  - You are about to drop the column `description` on the `PpfType` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `PpfType` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `PpfFeature` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `PpfType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `PpfTypeImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `PpfWarranty` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PpfFeature" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "PpfType" DROP COLUMN "description",
ADD COLUMN     "heroDesc" TEXT,
ADD COLUMN     "heroTitle" TEXT,
ADD COLUMN     "shortDesc" TEXT,
ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PpfTypeImage" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "PpfWarranty" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PpfType_slug_key" ON "PpfType"("slug");
