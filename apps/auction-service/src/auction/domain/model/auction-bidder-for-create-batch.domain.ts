import { z } from 'zod';
import { auctionBidderForCreateBatchPropsSchema } from '../schema/auction-bidder-for-create-batch.schema';
import AuctionDomain from './auction.domain';
import * as F from 'fp-ts/function';
import * as A from 'fp-ts/Array';
import * as Ord from 'fp-ts/Ord';
import * as Num from 'fp-ts/number';
import * as NEA from 'fp-ts/NonEmptyArray';
import * as Rec from 'fp-ts/Record';
import { U } from '@app/common';

export type AuctionBidderForCreateBatchProps = z.infer<typeof auctionBidderForCreateBatchPropsSchema>;

export type AuctionBidderForCreateBatchArgs = {
  auction: AuctionDomain;
  bidders: AuctionBidderForCreateBatchProps[];
};

export default class AuctionBidderForCreateBatchDomain {
  props: AuctionBidderForCreateBatchProps[];

  constructor({ bidders, auction }: AuctionBidderForCreateBatchArgs) {
    const nowAuction = auction.getSnapshot();

    const byBidAmount = Ord.reverse(
      Ord.contramap((bidder: AuctionBidderForCreateBatchProps) => Number(bidder.bidAmount))(Num.Ord),
    );

    const newBidders = F.pipe(
      bidders,
      A.filter((bidder) => bidder.bidderUuid !== nowAuction.sellerUuid),
      A.filter((bidder) => bidder.bidAmount > nowAuction.currentBid),
      NEA.groupBy((bidder) => bidder.bidderUuid),
      Rec.map(NEA.sort(byBidAmount)),
      Rec.map(NEA.head), // 입찰자 별 최고 입찰가 추출
      U.Rec.values,
      A.sort(byBidAmount),
      A.filter((bidder) => auction.validateBidAmount(bidder.bidAmount).isValid),
      U.A.dropLastIf((bidder) => bidder.bidderUuid === nowAuction.currentBidderUuid), // 현재 입찰자는 제외
    );

    const props: AuctionBidderForCreateBatchProps[] = newBidders;
    this.props = auctionBidderForCreateBatchPropsSchema.array().parse(props);
  }

  getSnapshot = () => {
    return this.props;
  };

  /** 결과적으로 최고 입찰자가 되는 입찰자 */
  getCurrent = (): AuctionBidderForCreateBatchProps | undefined => {
    return this.props[0];
  };
}
