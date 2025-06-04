import { PrismaService } from 'apps/auction-service/src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { AuctionRepositoryPort } from '../../../application/port/out/auction-repository.port';
import AuctionForCreateDomain from '../../../domain/model/auction-for-create.domain';
import AuctionDomain from '../../../domain/model/auction.domain';
import { auctionPropsSchema } from '../../../domain/schema/auction.schema';
import AuctionForUpdateDomain from '../../../domain/model/auction-for-update.domain';
import AuctionForDeleteDomain from '../../../domain/model/auction-for-delete.domain';
import { AuctionsArgs, AuctionsReturn } from '../../../application/port/out/auction-repository.port.type';

@Injectable()
export class AuctionPrismaRepository extends AuctionRepositoryPort {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  override auctions = async (cursor?: AuctionsArgs): Promise<AuctionsReturn> => {
    const limit = 20;
    const pageSize = limit + 1;

    const rows = await this.prisma.auctions.findMany({
      where: cursor
        ? {
            OR: [
              { createdAt: { lt: cursor.createdAt } },
              {
                AND: [{ createdAt: cursor.createdAt }, { auctionUuid: { lt: cursor.auctionUuid } }],
              },
            ],
          }
        : undefined,
      include: {
        auctionImages: true,
      },
      orderBy: [{ createdAt: 'desc' }, { auctionUuid: 'desc' }],
      take: pageSize,
    });

    const hasNext = rows.length > limit;
    const items = hasNext ? rows.slice(0, limit) : rows;
    const lastItem = items[items.length - 1];
    const nextCursor = hasNext
      ? {
          createdAt: lastItem.createdAt,
          auctionUuid: lastItem.auctionUuid,
        }
      : null;

    return {
      items: items.map((row) => new AuctionDomain({ ...row, images: row.auctionImages })),
      nextCursor,
    };
  };

  override createAuction = async (auctionForCreateDomain: AuctionForCreateDomain): Promise<AuctionDomain> => {
    const { images, ...auction } = auctionForCreateDomain.getSnapshot();
    const rows = await this.prisma.auctions.create({
      include: {
        auctionImages: true,
      },
      data: {
        ...auction,
        auctionImages: {
          createMany: {
            data: images,
          },
        },
      },
    });
    return new AuctionDomain(auctionPropsSchema.parse({ ...rows, images: rows.auctionImages }));
  };

  override updateAuction = async (auctionForUpdate: AuctionForUpdateDomain): Promise<AuctionDomain> => {
    const { images, auctionUuid, ...auction } = auctionForUpdate.getSnapshot();
    const rows = await this.prisma.auctions.update({
      where: { auctionUuid },
      include: {
        auctionImages: true,
      },
      data: {
        ...auction,
        ...(images && {
          auctionImages: {
            deleteMany: {},
            createMany: {
              data: images,
            },
          },
        }),
      },
    });
    return new AuctionDomain(auctionPropsSchema.parse({ ...rows, images: rows.auctionImages }));
  };

  override deleteAuction = async (auctionForDelete: AuctionForDeleteDomain): Promise<void> => {
    const { auctionUuid } = auctionForDelete.getSnapshot();
    await this.prisma.auctions.delete({
      where: { auctionUuid },
    });
  };
}
