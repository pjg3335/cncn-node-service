import { Injectable } from '@nestjs/common';
import AuctionForUpdateDomain from '../../domain/model/auction-for-update.domain';
import { AuctionRepositoryPort } from '../port/out/auction-repository.port';
import { AuctionMapper } from '../mapper/auction.mapper';
import { User } from '@app/common';
import { UpdateAuctionUseCase } from '../port/in/update-auction.use-case';
import { UpdateAuctionCommand } from '../port/dto/update-auction.command';
import { UpdateAuctionResponse } from '../port/dto/update-auction.response';

@Injectable()
export class UpdateAuctionService extends UpdateAuctionUseCase {
  constructor(
    private readonly auctionRepositoryPort: AuctionRepositoryPort,
    private readonly auctionMapper: AuctionMapper,
  ) {
    super();
  }

  override execute = async (command: UpdateAuctionCommand, user: User): Promise<UpdateAuctionResponse> => {
    const auctionForUpdateDomain = new AuctionForUpdateDomain(command, user);
    const res = await this.auctionRepositoryPort.updateAuction(auctionForUpdateDomain);
    return this.auctionMapper.toResponse(res);
  };
}
