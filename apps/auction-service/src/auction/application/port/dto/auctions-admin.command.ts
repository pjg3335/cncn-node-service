export type AuctionsAdminCommand = {
  type: 'admin';
  cursor?: {
    auctionUuid: string;
    createdAt: Date;
  };
};
