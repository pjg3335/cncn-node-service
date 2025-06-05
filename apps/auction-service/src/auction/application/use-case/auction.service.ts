import { Injectable } from '@nestjs/common';
import { AuctionRepositoryPort } from '../port/out/auction-repository.port';
import { AuctionUseCase } from '../port/in/auction.use-case';
import { AuctionCommand } from '../port/dto/auction.command';
import { AuctionMapper } from '../mapper/auction.mapper';
import { AuctionResponse } from '../port/dto/auction.response';

@Injectable()
export class AuctionService extends AuctionUseCase {
  constructor(
    private readonly auctionRepositoryPort: AuctionRepositoryPort,
    private readonly auctionMapper: AuctionMapper,
  ) {
    super();
  }

  override execute = async (command: AuctionCommand): Promise<AuctionResponse> => {
    const row = await this.auctionRepositoryPort.findAuction(command);

    return this.auctionMapper.toResponse(row);
  };
}
