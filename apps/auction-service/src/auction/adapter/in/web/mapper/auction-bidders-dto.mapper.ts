import { isValid, parseISO } from 'date-fns';
import { AuctionBiddersRequestDto, AuctionBiddersResponseDto } from '../dto/auction-bidders.dto';
import { AuctionBiddersCommand } from 'apps/auction-service/src/auction/application/port/dto/auction-bidders.command';
import { AuctionBiddersResponse } from 'apps/auction-service/src/auction/application/port/dto/auction-bidders.response';

export class AuctionBiddersDtoMapper {
  static toCommand = (dto: AuctionBiddersRequestDto): AuctionBiddersCommand => {
    const parsed = dto.createdAt ? parseISO(dto.createdAt) : undefined;
    const createdAt = parsed && isValid(parsed) ? parsed : undefined;
    return {
      auctionUuid: dto.auctionUuid,
      cursor:
        dto.bidAmount && createdAt
          ? {
              bidAmount: BigInt(dto.bidAmount),
              createdAt,
            }
          : undefined,
    };
  };

  static fromResponse = (response: AuctionBiddersResponse): AuctionBiddersResponseDto => {
    return {
      items: response.items.map((item) => ({
        auctionUuid: item.auctionUuid,
        bidderUuid: item.bidderUuid,
        bidAmount: Number(item.bidAmount),
        createdAt: item.createdAt.toISOString(),
      })),
      nextCursor: response.nextCursor
        ? {
            bidAmount: Number(response.nextCursor.bidAmount),
            createdAt: response.nextCursor.createdAt.toISOString(),
          }
        : null,
    };
  };
}
