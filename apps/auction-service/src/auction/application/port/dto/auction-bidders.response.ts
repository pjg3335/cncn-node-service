type AuctionBiddersNextCursorResponse = {
  bidAmount: bigint;
  createdAt: Date;
};

type AuctionBiddersItemResponse = {
  auctionUuid: string;
  bidderUuid: string;
  bidAmount: bigint;
  createdAt: Date;
};

export type AuctionBiddersResponse = {
  items: AuctionBiddersItemResponse[];
  nextCursor: AuctionBiddersNextCursorResponse | null;
};
