import { CheckFileExistsArgs, PresignedUrlArgs, PrisignedUrlReturn } from './auction-file-storage-port.types';

export abstract class AuctionFileStoragePort {
  abstract presignedUrl: (args: PresignedUrlArgs) => Promise<PrisignedUrlReturn>;

  abstract checkFileExists: (args: CheckFileExistsArgs) => Promise<void>;

  abstract toFullUrl: (key: string) => string;
}
