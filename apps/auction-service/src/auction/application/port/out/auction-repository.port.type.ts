import AuctionDomain from '../../../domain/model/auction.domain';

export type AuctionsArgs = {
  createdAt: Date;
  auctionUuid: string;
};

export type AuctionsReturn = {
  nextCursor: AuctionsArgs | null;
  items: AuctionDomain[];
};
