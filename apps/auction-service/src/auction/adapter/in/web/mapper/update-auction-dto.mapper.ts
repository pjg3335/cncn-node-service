import { parseISO } from 'date-fns';
import { toNumber } from '@app/common/utils/number.utils';
import { UpdateAuctionRequestDto, UpdateAuctionResponseDto } from '../dto/update-auction.dto';
import { UpdateAuctionCommand } from 'apps/auction-service/src/auction/application/port/dto/update-auction.command';
import { UpdateAuctionResponse } from 'apps/auction-service/src/auction/application/port/dto/update-auction.response';

export class UpdateAuctionDtoMapper {
  static toCommand = (dto: UpdateAuctionRequestDto): UpdateAuctionCommand => {
    return {
      auctionUuid: dto.auctionUuid,
      description: dto.description,
      title: dto.title,
      minimumBid: dto.minimumBid ? BigInt(dto.minimumBid) : undefined,
      startAt: dto.startAt ? parseISO(dto.startAt) : undefined,
      endAt: dto.endAt ? parseISO(dto.endAt) : undefined,
      images: dto.images
        ? dto.images.map((image) => ({
            key: image.key,
            order: image.order,
          }))
        : undefined,
      isDirectDeal: dto.isDirectDeal,
      directDealLocation: dto.directDealLocation,
      productCondition: dto.productCondition,
      thumbnailKey: dto.thumbnailKey,
      categoryId: dto.categoryId,
    };
  };

  static fromResponse = (response: UpdateAuctionResponse): UpdateAuctionResponseDto => {
    return {
      auctionUuid: response.auctionUuid,
      categoryId: response.categoryId,
      title: response.title,
      description: response.description,
      minimumBid: toNumber(response.minimumBid),
      startAt: response.startAt.toISOString(),
      endAt: response.endAt.toISOString(),
      isDirectDeal: response.isDirectDeal,
      directDealLocation: response.directDealLocation,
      status: response.status,
      productCondition: response.productCondition,
      viewCount: toNumber(response.viewCount),
      thumbnailUrl: response.thumbnailUrl,
      createdAt: response.createdAt.toISOString(),
      sellerUuid: response.sellerUuid,
      images: response.images.map(
        (image) =>
          ({
            auctionImageId: toNumber(image.auctionImageId),
            url: image.url,
            order: image.order,
          }) satisfies UpdateAuctionResponseDto['images'][number],
      ),
    };
  };
}
