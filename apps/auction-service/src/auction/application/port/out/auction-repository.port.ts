import AuctionForCreateDomain from '../../../domain/model/auction-for-create.domain';
import AuctionForDeleteDomain from '../../../domain/model/auction-for-delete.domain';
import AuctionForUpdateDomain from '../../../domain/model/auction-for-update.domain';
import AuctionDomain from '../../../domain/model/auction.domain';
import { AuctionsArgs, AuctionsReturn } from './auction-repository.port.type';

export abstract class AuctionRepositoryPort {
  abstract auctions: (cursor?: AuctionsArgs) => Promise<AuctionsReturn>;

  abstract createAuction: (auctionForCreate: AuctionForCreateDomain) => Promise<AuctionDomain>;

  abstract updateAuction: (auctionForUpdate: AuctionForUpdateDomain) => Promise<AuctionDomain>;

  abstract deleteAuction: (auctionForDelete: AuctionForDeleteDomain) => Promise<void>;
}
