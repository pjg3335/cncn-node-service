import { Module } from '@nestjs/common';
import { TestModule } from './test/test.module';
import { ConfigModule } from '@nestjs/config';
import { envValidate } from './common/env-schema';
import { PrismaModule } from './prisma/prisma.module';
import { AuctionModule } from './auction/auction.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: envValidate,
    }),
    PrismaModule,
    TestModule,
    AuctionModule,
  ],
})
export class AppModule {}
