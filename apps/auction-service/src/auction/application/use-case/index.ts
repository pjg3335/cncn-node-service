import { Provider } from '@nestjs/common';
import { CreateAuctionUseCase } from '../port/in/create-auction.use-case';
import { CreateAuctionService } from './create-auction.service';
import { UpdateAuctionUseCase } from '../port/in/update-auction.use-case';
import { UpdateAuctionService } from './update-auction.service';
import { AuctionsUseCase } from '../port/in/auctions.use-case';
import { AuctionsService } from './auctions.service';
import { DeleteAuctionUseCase } from '../port/in/delete-auction.use-case';
import { DeleteAuctionService } from './delete-auction.service';
import { PresignedUrlUseCase } from '../port/in/presigned-url.use-case';
import { PresignedUrlService } from './presigned-url.service';
import { AuctionUseCase } from '../port/in/auction.use-case';
import { AuctionService } from './auction.service';

export const auctionUseCaseProviders: Provider[] = [
  {
    provide: AuctionUseCase,
    useClass: AuctionService,
  },
  {
    provide: AuctionsUseCase,
    useClass: AuctionsService,
  },
  {
    provide: CreateAuctionUseCase,
    useClass: CreateAuctionService,
  },
  {
    provide: UpdateAuctionUseCase,
    useClass: UpdateAuctionService,
  },
  {
    provide: DeleteAuctionUseCase,
    useClass: DeleteAuctionService,
  },
  {
    provide: PresignedUrlUseCase,
    useClass: PresignedUrlService,
  },
];
