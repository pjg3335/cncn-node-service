import { HttpStatus, Injectable } from '@nestjs/common';
import { CatalogAuction } from '../sync/schema/catalog.schema';
import * as F from 'fp-ts/function';
import * as TE from 'fp-ts/TaskEither';
import * as E from 'fp-ts/Either';
import * as A from 'fp-ts/Array';
import { catalogAuctionSchema } from '../sync/schema/catalog.schema';
import { ErrorCode, AppException, User } from '@app/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { EnvSchema } from '../common/env-schema';
import { z } from 'zod';
import { RemoteMember, remoteMemberSchema } from './schema/remote-member.schema';
import { Thumbnail, thumbnailSchema } from './schema/thumbnail-schema';
import { KafkaService } from '@app/common/kafka/kafka.service';
import { AuctionViewedTopicValue } from '@app/common/schema/acution-viewed-topic.schema';

@Injectable()
export class ReadFn {
  constructor(
    private readonly configService: ConfigService<EnvSchema>,
    private readonly kafkaService: KafkaService,
  ) {}

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

  parseThumbnails = (thumbnails: any[]): Thumbnail[] => {
    return F.pipe(
      thumbnails,
      A.map((row) => ({ ...row, id: row._id })),
      A.map(thumbnailSchema.safeParse),
      A.filter((thumbnail) => thumbnail.success),
      A.map((thumbnail) => thumbnail.data),
    );
  };

  fetchMembers = (memberUuids: string[]): TE.TaskEither<AppException, RemoteMember[]> => {
    return F.pipe(
      TE.tryCatch(
        () =>
          axios.post(`${this.configService.get('MEMBER_SERVICE')}/api/v1/member/list`, {
            memberUuidList: memberUuids,
          }),
        (error) =>
          new AppException(
            { code: ErrorCode.OTHER_SERVICE_ERROR, message: String(error) },
            HttpStatus.INTERNAL_SERVER_ERROR,
          ),
      ),
      TE.flatMap((tags) =>
        TE.fromEither(
          E.tryCatch(
            () => z.array(remoteMemberSchema).parse(tags.data),
            (error) =>
              new AppException(
                { code: ErrorCode.INTERNAL_VALIDATION_ERROR, message: `멤버 스키마 검증 실패: ${String(error)}` },
                HttpStatus.INTERNAL_SERVER_ERROR,
              ),
          ),
        ),
      ),
    );
  };

  sendAuctionViewed = async (auctionUuid: string, user: User) => {
    await this.kafkaService.send({
      topic: 'catalog-query-service.auction.viewed',
      messages: [
        {
          key: auctionUuid,
          value: JSON.stringify({ auctionUuid, viewerUuid: user.memberUuid } satisfies AuctionViewedTopicValue),
        },
      ],
    });
  };
}
