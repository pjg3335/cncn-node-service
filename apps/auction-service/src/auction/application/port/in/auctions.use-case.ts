import { AuctionsCommand } from '../dto/auctions.command';
import { AuctionsResponse } from '../dto/auctions.response';

export abstract class AuctionsUseCase {
  abstract execute: (command: AuctionsCommand) => Promise<AuctionsResponse>;
}
