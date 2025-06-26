import { auctionBidderPropsSchema } from './auction-bidder.schema';
import { auctionPropsSchema } from './auction.schema';

export const auctionBidderForCreateBatchPropsSchema = auctionBidderPropsSchema
  .pick({
    auctionId: true,
    bidderUuid: true,
    bidAmount: true,
    createdAt: true,
  })
  .merge(
    auctionPropsSchema.pick({
      currentBid: true,
    }),
  )
  .strip();
