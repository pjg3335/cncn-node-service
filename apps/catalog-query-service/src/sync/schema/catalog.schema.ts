import { z } from 'zod';
import { AuctionSchema } from './auction.schema';
import { categorySchema } from './category.schema';
import { tagSchema } from './tag.schema';

export const catalogAuctionSchema = z
  .object({
    type: z.enum(['auction']),
    category: categorySchema.nullable(),
    tags: z.array(tagSchema),
  })
  .merge(AuctionSchema);
export type CatalogAuction = z.infer<typeof catalogAuctionSchema>;

export const catalogProductSchema = z.object({
  type: z.enum(['product']),
});
export type CatalogProduct = z.infer<typeof catalogProductSchema>;

export const catalogSchema = z.union([catalogAuctionSchema, catalogProductSchema]);

export type Catalog = z.infer<typeof catalogSchema>;
