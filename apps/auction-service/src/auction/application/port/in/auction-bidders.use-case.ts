import { AuctionBiddersCommand } from '../dto/auction-bidders.command';
import { AuctionBiddersResponse } from '../dto/auction-bidders.response';

export abstract class AuctionBiddersUseCase {
  abstract execute: (command: AuctionBiddersCommand) => Promise<AuctionBiddersResponse>;
}
