import { z } from 'zod';
import { auctionPropsSchema } from '../schema/auction.schema';

export type AuctionProps = z.infer<typeof auctionPropsSchema>;

export type AuctionArgs = AuctionProps;

export default class AuctionDomain {
  private props: AuctionProps;

  constructor(input: AuctionArgs) {
    const props: AuctionProps = input;
    this.props = auctionPropsSchema.parse(props);
  }

  getSnapshot = () => {
    return this.props;
  };
}
