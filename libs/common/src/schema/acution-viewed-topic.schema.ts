import { z } from 'zod';

export const auctionViewedTopicValueSchema = z.object({
  auctionUuid: z.string(),
  viewerUuid: z.string(),
});

export type AuctionViewedTopicValue = z.infer<typeof auctionViewedTopicValueSchema>;
