-- CreateTable
CREATE TABLE "Phenopacket" (
    "id" SERIAL NOT NULL,
    "hash" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "Phenopacket_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Phenopacket_hash_key" ON "Phenopacket"("hash");
