import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import versionMiddleware from './middleware/pessimistic-lock.middleware';
import { PrismaClient } from './generated';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
    this.$extends(versionMiddleware);
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
