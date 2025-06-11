import { AuctionCommand } from '../dto/auction.command';
import { AuctionResponse } from '../dto/auction.response';

export abstract class AuctionUseCase {
  abstract execute: (command: AuctionCommand) => Promise<AuctionResponse>;
}
