-- CreateTable
CREATE TABLE "PpfType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PpfType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PpfTypeImage" (
    "id" SERIAL NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "altText" TEXT,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "ppfTypeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PpfTypeImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PpfTypeImage" ADD CONSTRAINT "PpfTypeImage_ppfTypeId_fkey" FOREIGN KEY ("ppfTypeId") REFERENCES "PpfType"("id") ON DELETE CASCADE ON UPDATE CASCADE;
