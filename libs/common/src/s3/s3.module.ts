import { Module } from '@nestjs/common';
import { S3Service } from './s3.service';
import { ConfigModule } from '@nestjs/config';
import { envValidate } from '../common/env-schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: envValidate,
    }),
  ],
  providers: [S3Service],
  exports: [S3Service],
})
export class S3Module {}
