export type AuctionsCommand =
  | {
      auctionUuid: string;
      createdAt: Date;
    }
  | undefined;
