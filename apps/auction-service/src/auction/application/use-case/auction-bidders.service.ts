import { AuctionBiddersCommand } from '../port/dto/auction-bidders.command';
import { AuctionBiddersResponse } from '../port/dto/auction-bidders.response';
import { AuctionBiddersUseCase } from '../port/in/auction-bidders.use-case';
import { AuctionRepositoryPort } from '../port/out/auction-repository.port';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuctionBiddersService extends AuctionBiddersUseCase {
  constructor(private readonly auctionRepositoryPort: AuctionRepositoryPort) {
    super();
  }

  override execute = async (command: AuctionBiddersCommand): Promise<AuctionBiddersResponse> => {
    const auctionBidders = await this.auctionRepositoryPort.findAuctionBidders(command);
    return {
      items: auctionBidders.items.map((item) => item.getSnapshot()),
      nextCursor: auctionBidders.nextCursor,
    };
  };
}
