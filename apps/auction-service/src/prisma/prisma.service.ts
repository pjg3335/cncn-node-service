import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import versionMiddleware from './middleware/pessimistic-lock.middleware';
import { PrismaClient } from './generated';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'stdout', level: 'error' },
        { emit: 'stdout', level: 'info' },
        { emit: 'stdout', level: 'warn' },
      ],
    });
  }

  async onModuleInit() {
    await this.$connect();
    this.$extends(versionMiddleware);

    // this.$on('query', (e) => {
    //   console.log('[PRISMA QUERY]', e.query, e.params);
    // });
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
