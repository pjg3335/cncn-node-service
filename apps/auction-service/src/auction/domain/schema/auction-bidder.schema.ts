import { z } from 'zod';

export const auctionBidderPropsSchema = z
  .object({
    auctionBidderId: z.bigint(),
    auctionBidderUuid: z.string(),
    bidAmount: z.bigint(),
    createdAt: z.date(),
    updatedAt: z.date(),
    deletedAt: z.date().nullable(),
    version: z.number(),
    bidderUuid: z.string().uuid({ message: '입찰자 UUID의 형식이 올바르지 않습니다.' }),
    auctionId: z.bigint(),
    auctionUuid: z.string().uuid({ message: '경매 UUID의 형식이 올바르지 않습니다.' }),
  })
  .strip();
