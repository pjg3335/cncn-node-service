import { Injectable } from '@nestjs/common';
import AuctionForDeleteDomain from '../../domain/model/auction-for-delete.domain';
import { AuctionRepositoryPort } from '../port/out/auction-repository.port';
import { User } from '@app/common';
import { DeleteAuctionUseCase } from '../port/in/delete-auction.use-case';
import { DeleteAuctionCommand } from '../port/dto/delete-auction.command';

@Injectable()
export class DeleteAuctionService extends DeleteAuctionUseCase {
  constructor(private readonly auctionRepositoryPort: AuctionRepositoryPort) {
    super();
  }

  override execute = async (command: DeleteAuctionCommand, user: User): Promise<void> => {
    const auctionForDeleteDomain = new AuctionForDeleteDomain(command, user);
    await this.auctionRepositoryPort.deleteAuction(auctionForDeleteDomain);
  };
}
