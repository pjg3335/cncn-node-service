import { User } from '@app/common';
import { UpdateAuctionCommand } from '../dto/update-auction.command';
import { UpdateAuctionResponse } from '../dto/update-auction.response';

export abstract class UpdateAuctionUseCase {
  abstract execute: (command: UpdateAuctionCommand, user: User) => Promise<UpdateAuctionResponse>;
}
