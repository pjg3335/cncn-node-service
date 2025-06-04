import { Module } from '@nestjs/common';
import { SyncModule } from './sync/sync.module';
import { ConfigModule } from '@nestjs/config';
import { envValidate } from './common/env-schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: envValidate,
    }),
    SyncModule,
  ],
  controllers: [],
  providers: [],
})
export class CatalogQueryServiceModule {}
