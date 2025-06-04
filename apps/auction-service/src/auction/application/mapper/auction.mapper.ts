import { mapAuctionStatus } from 'apps/auction-service/src/utils/utils';
import AuctionDomain from '../../domain/model/auction.domain';
import { AuctionsResponse } from '../port/dto/auctions.response';
import { Injectable } from '@nestjs/common';
import { AuctionFileStoragePort } from '../port/out/auction-file-storage-port';

@Injectable()
export class AuctionMapper {
  constructor(private readonly auctionFileStoragePort: AuctionFileStoragePort) {}

  toResponse = (auction: AuctionDomain): AuctionsResponse['items'][number] => {
    const snapshot = auction.getSnapshot();

    return {
      auctionUuid: snapshot.auctionUuid,
      createdAt: snapshot.createdAt,
      viewCount: snapshot.viewCount,
      title: snapshot.title,
      description: snapshot.description,
      minimumBid: snapshot.minimumBid,
      startAt: snapshot.startAt,
      endAt: snapshot.endAt,
      isDirectDeal: snapshot.isDirectDeal,
      productCondition: snapshot.productCondition,
      thumbnailUrl: this.auctionFileStoragePort.toFullUrl(snapshot.thumbnailKey),
      sellerUuid: snapshot.sellerUuid,
      status: mapAuctionStatus(snapshot),
      categoryId: snapshot.categoryId,
      directDealLocation: snapshot.directDealLocation,
      images: snapshot.images.map((image) => ({
        auctionImageId: image.auctionImageId,
        url: this.auctionFileStoragePort.toFullUrl(image.key),
        order: image.order,
      })),
    };
  };
}
