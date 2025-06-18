import { HttpStatus, Injectable } from '@nestjs/common';
import { CatalogAuction } from '../sync/schema/catalog.schema';
import * as E from 'fp-ts/Either';
import { catalogAuctionSchema } from '../sync/schema/catalog.schema';
import { AppException } from '@app/common/common/app.exception';
import { ErrorCode } from '@app/common';

@Injectable()
export class ReadFn {
  parseAuction = (auction: any): E.Either<AppException, CatalogAuction> => {
    return E.tryCatch(
      () => catalogAuctionSchema.parse(auction),
      (error) =>
        new AppException(
          { code: ErrorCode.INTERNAL_VALIDATION_ERROR, message: String(error) },
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
    );
  };
}
