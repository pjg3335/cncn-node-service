import { Injectable } from '@nestjs/common';
import { AuctionRepositoryPort } from '../port/out/auction-repository.port';
import { AuctionMapper } from '../mapper/auction.mapper';
import { AuctionsByIdsUseCase } from '../port/in/auctions-by-ids.use-case';
import { AuctionsByIdsResponse } from '../port/dto/auctions-by-ids.response';
import { AuctionsByIdsCommand } from '../port/dto/auctions-by-ids.command';

@Injectable()
export class AuctionsByIdsService extends AuctionsByIdsUseCase {
  constructor(
    private readonly auctionRepositoryPort: AuctionRepositoryPort,
    private readonly auctionMapper: AuctionMapper,
  ) {
    super();
  }

  override execute = async (command: AuctionsByIdsCommand): Promise<AuctionsByIdsResponse> => {
    const res = await this.auctionRepositoryPort.findAuctionsByIds(command);
    return res.map((auction) => this.auctionMapper.toResponse(auction));
  };
}
