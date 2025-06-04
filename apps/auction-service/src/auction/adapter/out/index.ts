import { Provider } from '@nestjs/common';
import { AuctionRepositoryPort } from '../../application/port/out/auction-repository.port';
import { AuctionPrismaRepository } from './postgresql/auction-prisma.repository';
import { AuctionFileStoragePort } from '../../application/port/out/auction-file-storage-port';
import { AuctionS3Storage } from './s3/auction-s3.storage';

export const auctionPortProviders: Provider[] = [
  {
    provide: AuctionRepositoryPort,
    useClass: AuctionPrismaRepository,
  },
  {
    provide: AuctionFileStoragePort,
    useClass: AuctionS3Storage,
  },
];
