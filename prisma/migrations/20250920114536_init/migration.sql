-- CreateEnum
CREATE TYPE "public"."ProfileType" AS ENUM ('GUEST', 'USER');

-- CreateTable
CREATE TABLE "public"."Profile" (
    "id" TEXT NOT NULL,
    "type" "public"."ProfileType" NOT NULL DEFAULT 'GUEST',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserCard" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,
    "nickname" TEXT,
    "last4" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "meta" JSONB,

    CONSTRAINT "UserCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Offer" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "categories" JSONB NOT NULL,
    "region" TEXT,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "baseRate" DOUBLE PRECISION,
    "bonusRate" DOUBLE PRECISION,
    "capPerMonth" INTEGER,
    "minSpend" INTEGER,
    "source" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "meta" JSONB,

    CONSTRAINT "Offer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CardOffer" (
    "id" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,
    "userCardId" TEXT NOT NULL,
    "offerId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "CardOffer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserCard_profileId_idx" ON "public"."UserCard"("profileId");

-- CreateIndex
CREATE INDEX "UserCard_cardId_idx" ON "public"."UserCard"("cardId");

-- CreateIndex
CREATE INDEX "CardOffer_userCardId_idx" ON "public"."CardOffer"("userCardId");

-- CreateIndex
CREATE INDEX "CardOffer_offerId_idx" ON "public"."CardOffer"("offerId");

-- CreateIndex
CREATE UNIQUE INDEX "CardOffer_userCardId_offerId_key" ON "public"."CardOffer"("userCardId", "offerId");

-- AddForeignKey
ALTER TABLE "public"."UserCard" ADD CONSTRAINT "UserCard_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "public"."Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CardOffer" ADD CONSTRAINT "CardOffer_userCardId_fkey" FOREIGN KEY ("userCardId") REFERENCES "public"."UserCard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CardOffer" ADD CONSTRAINT "CardOffer_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "public"."Offer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
