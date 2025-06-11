import { auctionBidderPropsSchema } from './auction-bidder.schema';

export const auctionBidderForCreatePropsSchema = auctionBidderPropsSchema
  .pick({
    auctionId: true,
    bidderUuid: true,
    bidAmount: true,
  })
  .strip();
