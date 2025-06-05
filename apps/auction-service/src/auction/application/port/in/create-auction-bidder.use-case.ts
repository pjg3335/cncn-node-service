import { User } from '@app/common';
import { CreateAuctionBidderCommand } from '../dto/create-auction-bidder.command';

export abstract class CreateAuctionBidderUseCase {
  abstract execute: (command: CreateAuctionBidderCommand, user: User) => Promise<void>;
}
