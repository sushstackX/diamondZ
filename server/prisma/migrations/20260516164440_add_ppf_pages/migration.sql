/*
  Warnings:

  - You are about to drop the `PpfFeature` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PpfType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PpfTypeImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PpfWarranty` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PpfFeature" DROP CONSTRAINT "PpfFeature_ppfTypeId_fkey";

-- DropForeignKey
ALTER TABLE "PpfTypeImage" DROP CONSTRAINT "PpfTypeImage_ppfTypeId_fkey";

-- DropForeignKey
ALTER TABLE "PpfWarranty" DROP CONSTRAINT "PpfWarranty_ppfTypeId_fkey";

-- DropTable
DROP TABLE "PpfFeature";

-- DropTable
DROP TABLE "PpfType";

-- DropTable
DROP TABLE "PpfTypeImage";

-- DropTable
DROP TABLE "PpfWarranty";

-- CreateTable
CREATE TABLE "PpfPage" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "subtitle" TEXT,
    "introTitle" TEXT,
    "introDesc" TEXT,
    "features" JSONB NOT NULL,
    "warranties" JSONB NOT NULL,
    "gallery" JSONB NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PpfPage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PpfPage_slug_key" ON "PpfPage"("slug");
