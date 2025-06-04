export type UpdateAuctionCommand = {
  auctionUuid: string;
  categoryId?: number | null;
  directDealLocation?: string | null;
  description?: string;
  startAt?: Date;
  endAt?: Date;
  isDirectDeal?: boolean;
  productCondition?: 'unopened' | 'new' | 'used';
  thumbnailKey?: string;
  title?: string;
  minimumBid?: bigint;
  images?: {
    key: string;
    order: number;
  }[];
};
