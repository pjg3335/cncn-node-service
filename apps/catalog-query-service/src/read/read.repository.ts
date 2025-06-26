import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Db } from 'mongodb';
import { Catalog, CatalogAuction } from '../sync/schema/catalog.schema';
import * as F from 'fp-ts/function';
import * as TE from 'fp-ts/TaskEither';
import * as A from 'fp-ts/Array';
import * as E from 'fp-ts/Either';
import { ReadFn } from './read.fn';
import { ErrorCode, AppException, MongoProjection } from '@app/common';
import { Thumbnail } from './schema/thumbnail-schema';

@Injectable()
export class ReadRepository {
  constructor(
    @Inject('MONGO_DB') private readonly db: Db,
    private readonly fn: ReadFn,
  ) {}

  findAuction = (auctionUuids: string[]): TE.TaskEither<AppException, CatalogAuction[]> => {
    return F.pipe(
      TE.tryCatch(
        () =>
          this.db
            .collection('catalog')
            .find({ _id: { $in: auctionUuids as any[] } })
            .toArray(),
        (error) =>
          new AppException({ code: ErrorCode.DB_ERROR, message: String(error) }, HttpStatus.INTERNAL_SERVER_ERROR),
      ),
      TE.map(A.map(this.fn.parseAuction)),
      TE.map(A.sequence(E.Applicative)),
      TE.flatMap(TE.fromEither),
    );
  };

  findThumbnails = (ids: string[]): TE.TaskEither<AppException, Thumbnail[]> => {
    return F.pipe(
      TE.tryCatch(
        () =>
          this.db
            .collection('catalog')
            .find(
              { _id: { $in: ids as any[] } },
              {
                projection: {
                  _id: 1,
                  thumbnailUrl: 1,
                  type: 1,
                } satisfies MongoProjection<Catalog>,
              },
            )
            .toArray(),
        (error) =>
          new AppException({ code: ErrorCode.DB_ERROR, message: String(error) }, HttpStatus.INTERNAL_SERVER_ERROR),
      ),
      TE.map(this.fn.parseThumbnails),
    );
  };
}
