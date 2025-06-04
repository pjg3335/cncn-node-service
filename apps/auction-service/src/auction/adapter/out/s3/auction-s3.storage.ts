import { Injectable } from '@nestjs/common';
import { AuctionFileStoragePort } from '../../../application/port/out/auction-file-storage-port';
import {
  CheckFileExistsArgs,
  PresignedUrlArgs,
  PrisignedUrlReturn,
} from '../../../application/port/out/auction-file-storage-port.types';
import { S3Service } from '@app/common/s3/s3.service';

@Injectable()
export class AuctionS3Storage extends AuctionFileStoragePort {
  constructor(private readonly s3Service: S3Service) {
    super();
  }

  override presignedUrl = async (args: PresignedUrlArgs): Promise<PrisignedUrlReturn> => {
    return await this.s3Service.generatePresignedPostUrl(args);
  };

  override checkFileExists = async (args: CheckFileExistsArgs): Promise<void> => {
    await this.s3Service.checkFileExists(args);
  };

  override toFullUrl = (key: string): string => {
    return this.s3Service.toFullUrl(key);
  };
}
