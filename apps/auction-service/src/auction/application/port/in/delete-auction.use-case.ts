import { User } from '@app/common';
import { DeleteAuctionCommand } from '../dto/delete-auction.command';

export abstract class DeleteAuctionUseCase {
  abstract execute: (command: DeleteAuctionCommand, user: User) => Promise<void>;
}
