import { z } from 'zod';
import { auctionAdminPropsSchema } from '../schema/auction-admin.schema';

export type AuctionAdminProps = z.infer<typeof auctionAdminPropsSchema>;

export type AuctionAdminArgs = AuctionAdminProps;

export default class AuctionAdminDomain {
  static readonly maxAllowedBidRange = 30n;
  private props: AuctionAdminProps;

  constructor(input: AuctionAdminArgs) {
    const props: AuctionAdminProps = input;
    this.props = auctionAdminPropsSchema.parse(props);
  }

  validateBidAmount = (bidAmount: bigint) => {
    if (this.props.minimumBid > bidAmount) {
      return { isValid: false, message: '최소 입찰가보다 높은 입찰가를 입력해주세요.' };
    }
    if (this.props.currentBid >= bidAmount) {
      return { isValid: false, message: '현재 입찰가보다 높은 입찰가를 입력해주세요.' };
    }
    const maxAllowed = this.props.currentBid + (this.props.currentBid * AuctionAdminDomain.maxAllowedBidRange) / 100n;
    if (maxAllowed < bidAmount) {
      return {
        isValid: false,
        message: `최고 입찰가의 ${AuctionAdminDomain.maxAllowedBidRange}%를 초과할 수 없습니다.`,
      };
    }
    return { isValid: true };
  };

  isEnded = () => {
    return new Date() > this.props.endAt;
  };

  getSnapshot = () => {
    return this.props;
  };
}
