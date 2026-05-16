-- AlterTable
ALTER TABLE "PpfType" ADD COLUMN     "whyChoose" TEXT;

-- CreateTable
CREATE TABLE "PpfFeature" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "ppfTypeId" INTEGER NOT NULL,

    CONSTRAINT "PpfFeature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PpfWarranty" (
    "id" SERIAL NOT NULL,
    "years" INTEGER NOT NULL,
    "title" TEXT,
    "points" JSONB NOT NULL,
    "ppfTypeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PpfWarranty_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PpfFeature" ADD CONSTRAINT "PpfFeature_ppfTypeId_fkey" FOREIGN KEY ("ppfTypeId") REFERENCES "PpfType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PpfWarranty" ADD CONSTRAINT "PpfWarranty_ppfTypeId_fkey" FOREIGN KEY ("ppfTypeId") REFERENCES "PpfType"("id") ON DELETE CASCADE ON UPDATE CASCADE;
