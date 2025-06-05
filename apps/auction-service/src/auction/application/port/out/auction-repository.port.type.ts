import AuctionAdminDomain from '../../../domain/model/auction-admin.domain';
import AuctionDomain from '../../../domain/model/auction.domain';

export type AuctionsArgs = {
  createdAt: Date;
  auctionUuid: string;
};

export type AuctionsReturn = {
  nextCursor: AuctionsArgs | null;
  items: AuctionDomain[];
};

export type AuctionsAdminReturn = {
  nextCursor: AuctionsArgs | null;
  items: AuctionAdminDomain[];
};
