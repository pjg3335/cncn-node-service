import AuctionBidderDomain from '../../domain/model/auction-bidder.domain';
import { AuctionBiddersResponse } from '../port/dto/auction-bidders.response';

export class AuctionBidderMapper {
  toResponse = (auctionBidder: AuctionBidderDomain): AuctionBiddersResponse['items'][number] => {
    const snapshot = auctionBidder.getSnapshot();

    return {
      auctionUuid: snapshot.auctionUuid,
      bidderUuid: snapshot.bidderUuid,
      bidAmount: snapshot.bidAmount,
      createdAt: snapshot.createdAt,
    };
  };
}
