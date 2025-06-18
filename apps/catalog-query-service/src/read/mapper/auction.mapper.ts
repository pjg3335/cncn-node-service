import { CatalogAuction } from '../../sync/schema/catalog.schema';
import { CatalogAuctionResponseDto } from '../dto/auction-dto';

export class AuctionMapper {
  static toResponseDto = (auction: CatalogAuction): CatalogAuctionResponseDto => {
    return {
      ...auction,
      startAt: auction.startAt.toISOString(),
      endAt: auction.endAt.toISOString(),
      createdAt: auction.createdAt.toISOString(),
    };
  };
}
