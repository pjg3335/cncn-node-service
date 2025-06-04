import { auctionPropsSchema } from './auction.schema';

export const auctionForDeletePropsSchema = auctionPropsSchema
  .pick({
    auctionUuid: true,
    sellerUuid: true,
  })
  .strip();
