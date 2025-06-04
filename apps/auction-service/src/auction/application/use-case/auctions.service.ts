import { Injectable } from '@nestjs/common';
import { AuctionRepositoryPort } from '../port/out/auction-repository.port';
import { AuctionsUseCase } from '../port/in/auctions.use-case';
import { AuctionsCommand } from '../port/dto/auctions.command';
import { AuctionMapper } from '../mapper/auction.mapper';
import { AuctionsResponse } from '../port/dto/auctions.response';

@Injectable()
export class AuctionsService extends AuctionsUseCase {
  constructor(
    private readonly auctionRepositoryPort: AuctionRepositoryPort,
    private readonly auctionMapper: AuctionMapper,
  ) {
    super();
  }

  override execute = async (command: AuctionsCommand): Promise<AuctionsResponse> => {
    const res = await this.auctionRepositoryPort.auctions(command);

    return {
      type: 'user',
      items: res.items
        .map((auction) => this.auctionMapper.toResponse(auction))
        .filter(
          (item): item is Extract<typeof item, { status: 'waiting' | 'active' | 'ended' }> =>
            item.status !== 'cancelled' && item.status !== 'hidden',
        ),
      nextCursor: res.nextCursor,
    };
  };
}
