import { Injectable } from '@nestjs/common';
import { ReadRepository } from './read.repository';
import { CatalogAuction } from '../sync/schema/catalog.schema';
import * as TE from 'fp-ts/TaskEither';
import { AppException } from '@app/common/common/app.exception';

@Injectable()
export class ReadService {
  constructor(private readonly readRepository: ReadRepository) {}

  getAuction = (auctionUuid: string): TE.TaskEither<AppException, CatalogAuction> => {
    return this.readRepository.findAuction(auctionUuid);
  };
}
