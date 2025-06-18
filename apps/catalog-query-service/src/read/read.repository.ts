import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Db } from 'mongodb';
import { CatalogAuction } from '../sync/schema/catalog.schema';
import * as F from 'fp-ts/function';
import * as TE from 'fp-ts/TaskEither';
import { ReadFn } from './read.fn';
import { AppException } from '@app/common/common/app.exception';
import { ErrorCode } from '@app/common';

@Injectable()
export class ReadRepository {
  constructor(
    @Inject('MONGO_DB') private readonly db: Db,
    private readonly fn: ReadFn,
  ) {}

  findAuction = (auctionUuid: string): TE.TaskEither<AppException, CatalogAuction> => {
    return F.pipe(
      TE.tryCatch(
        () => this.db.collection('catalog').findOne({ _id: auctionUuid as any }),
        (error) =>
          new AppException({ code: ErrorCode.DB_ERROR, message: String(error) }, HttpStatus.INTERNAL_SERVER_ERROR),
      ),
      TE.flatMap(
        TE.fromNullable(
          new AppException({ code: ErrorCode.NOT_FOUND, message: '해당 경매가 없습니다.' }, HttpStatus.NOT_FOUND),
        ),
      ),
      TE.flatMap(F.flow(this.fn.parseAuction, TE.fromEither)),
    );
  };
}
