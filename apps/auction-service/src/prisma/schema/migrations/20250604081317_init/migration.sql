-- CreateEnum
CREATE TYPE "AuctionStatus" AS ENUM ('visible', 'hidden', 'cancelled');

-- CreateEnum
CREATE TYPE "ProductCondition" AS ENUM ('unopened', 'new', 'used');

-- CreateTable
CREATE TABLE "Test" (
    "testId" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "value" BIGINT NOT NULL,

    CONSTRAINT "Test_pkey" PRIMARY KEY ("testId")
);

-- CreateTable
CREATE TABLE "Auctions" (
    "auctionId" BIGSERIAL NOT NULL,
    "auctionUuid" UUID NOT NULL,
    "categoryId" INTEGER,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "minimumBid" BIGINT NOT NULL,
    "startAt" TIMESTAMPTZ(6) NOT NULL,
    "endAt" TIMESTAMPTZ(6) NOT NULL,
    "isDirectDeal" BOOLEAN NOT NULL,
    "directDealLocation" TEXT,
    "status" "AuctionStatus" NOT NULL,
    "productCondition" "ProductCondition" NOT NULL,
    "viewCount" BIGINT NOT NULL DEFAULT 0,
    "thumbnailKey" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "deletedAt" TIMESTAMPTZ(6),
    "version" INTEGER NOT NULL DEFAULT 0,
    "sellerUuid" UUID NOT NULL,

    CONSTRAINT "Auctions_pkey" PRIMARY KEY ("auctionId")
);

-- CreateTable
CREATE TABLE "AuctionImages" (
    "auctionImageId" BIGSERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMPTZ(6),
    "version" INTEGER NOT NULL DEFAULT 0,
    "auctionId" BIGINT NOT NULL,

    CONSTRAINT "AuctionImages_pkey" PRIMARY KEY ("auctionImageId")
);

-- CreateTable
CREATE TABLE "AuctionBidders" (
    "auctionBidderId" BIGSERIAL NOT NULL,
    "auctionBidderUuid" UUID NOT NULL,
    "bidAmount" BIGINT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "deletedAt" TIMESTAMPTZ(6),
    "version" INTEGER NOT NULL DEFAULT 0,
    "bidderUuid" UUID NOT NULL,
    "auctionId" BIGINT NOT NULL,

    CONSTRAINT "AuctionBidders_pkey" PRIMARY KEY ("auctionBidderId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Auctions_auctionUuid_key" ON "Auctions"("auctionUuid");

-- CreateIndex
CREATE INDEX "AuctionImages_auctionId_idx" ON "AuctionImages"("auctionId");

-- CreateIndex
CREATE UNIQUE INDEX "AuctionBidders_auctionBidderUuid_key" ON "AuctionBidders"("auctionBidderUuid");

-- CreateIndex
CREATE INDEX "AuctionBidders_auctionId_idx" ON "AuctionBidders"("auctionId");

-- AddForeignKey
ALTER TABLE "AuctionImages" ADD CONSTRAINT "AuctionImages_auctionId_fkey" FOREIGN KEY ("auctionId") REFERENCES "Auctions"("auctionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuctionBidders" ADD CONSTRAINT "AuctionBidders_auctionId_fkey" FOREIGN KEY ("auctionId") REFERENCES "Auctions"("auctionId") ON DELETE RESTRICT ON UPDATE CASCADE;
