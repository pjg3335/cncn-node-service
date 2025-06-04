import { Injectable } from '@nestjs/common';
import AuctionForCreateDomain from '../../domain/model/auction-for-create.domain';
import { AuctionRepositoryPort } from '../port/out/auction-repository.port';
import { CreateAuctionUseCase } from '../port/in/create-auction.use-case';
import { AuctionMapper } from '../mapper/auction.mapper';
import { CreateAuctionCommand } from '../port/dto/create-auction.command';
import { CreateAuctionResponse } from '../port/dto/create-auction.response';
import { User } from '@app/common';
import { AuctionFileStoragePort } from '../port/out/auction-file-storage-port';

@Injectable()
export class CreateAuctionService extends CreateAuctionUseCase {
  constructor(
    private readonly auctionRepositoryPort: AuctionRepositoryPort,
    private readonly auctionFileStoragePort: AuctionFileStoragePort,
    private readonly auctionMapper: AuctionMapper,
  ) {
    super();
  }

  override execute = async (command: CreateAuctionCommand, user: User): Promise<CreateAuctionResponse> => {
    const keys = command.images.map((image) => image.key);
    await Promise.all(keys.map((key) => this.auctionFileStoragePort.checkFileExists({ key })));

    const auctionForCreateDomain = new AuctionForCreateDomain(command, user);
    const res = await this.auctionRepositoryPort.createAuction(auctionForCreateDomain);
    return this.auctionMapper.toResponse(res);
  };
}
