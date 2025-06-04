type AuctionsNextCursorResponse = {
  createdAt: Date;
  auctionUuid: string;
};

type AuctionsImageResponse = {
  auctionImageId: bigint;
  url: string;
  order: number;
};

type AuctionsItemCommonResponse = {
  auctionUuid: string;
  categoryId?: number | null;
  title: string;
  description: string;
  minimumBid: bigint;
  startAt: Date;
  endAt: Date;
  isDirectDeal: boolean;
  directDealLocation?: string | null;
  productCondition: 'unopened' | 'new' | 'used';
  viewCount: bigint;
  thumbnailUrl: string;
  createdAt: Date;
  sellerUuid: string;
  images: AuctionsImageResponse[];
};

type AuctionsUserResponse = {
  type: 'user';
  items: (AuctionsItemCommonResponse & {
    status: 'waiting' | 'active' | 'ended';
  })[];
  nextCursor: AuctionsNextCursorResponse | null;
};

type AuctionsAdminResponse = {
  type: 'admin';
  items: (AuctionsItemCommonResponse & {
    status: 'waiting' | 'active' | 'ended' | 'hidden' | 'cancelled';
  })[];
  nextCursor: AuctionsNextCursorResponse | null;
};

export type AuctionsResponse = AuctionsUserResponse | AuctionsAdminResponse;
