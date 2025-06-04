import { User } from '@app/common';
import { PresignedUrlCommand } from '../dto/presigned-url.command';
import { PresignedUrlResponse } from '../dto/presigned-url.response';

export abstract class PresignedUrlUseCase {
  abstract execute: (command: PresignedUrlCommand, user: User) => Promise<PresignedUrlResponse>;
}
