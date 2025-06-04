import { Module } from '@nestjs/common';
import { AuctionController } from './adapter/in/web/auction.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { auctionUseCaseProviders } from './application/use-case';
import { auctionPortProviders } from './adapter/out';
import { S3Module } from '@app/common/s3/s3.module';
import { mapperProviders } from './application/mapper/inext';

@Module({
  providers: [...auctionUseCaseProviders, ...auctionPortProviders, ...mapperProviders],
  controllers: [AuctionController],
  imports: [PrismaModule, S3Module],
})
export class AuctionModule {}
