import { AuctionsByIdsCommand } from '../dto/auctions-by-ids.command';
import { AuctionsByIdsResponse } from '../dto/auctions-by-ids.response';

export abstract class AuctionsByIdsUseCase {
  abstract execute: (command: AuctionsByIdsCommand) => Promise<AuctionsByIdsResponse>;
}
