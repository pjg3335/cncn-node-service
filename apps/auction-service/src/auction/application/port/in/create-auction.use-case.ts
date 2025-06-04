import { User } from '@app/common';
import { CreateAuctionCommand } from '../dto/create-auction.command';
import { CreateAuctionResponse } from '../dto/create-auction.response';

export abstract class CreateAuctionUseCase {
  abstract execute: (command: CreateAuctionCommand, user: User) => Promise<CreateAuctionResponse>;
}
