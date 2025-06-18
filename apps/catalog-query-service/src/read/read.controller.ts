import { Controller, Get, Param, Version } from '@nestjs/common';
import { CatalogAuctionResponseDto } from './dto/auction-dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { ReadService } from './read.service';
import * as TE from 'fp-ts/TaskEither';
import * as F from 'fp-ts/function';
import { AppException } from '@app/common/common/app.exception';
import { AuctionMapper } from './mapper/auction.mapper';

@Controller()
export class ReadController {
  constructor(private readonly readService: ReadService) {}

  @Get('auctions/:auctionUuid')
  @Version('1')
  @ApiOkResponse({ type: CatalogAuctionResponseDto })
  getAuction(@Param('auctionUuid') auctionUuid: string): TE.TaskEither<AppException, CatalogAuctionResponseDto> {
    return F.pipe(this.readService.getAuction(auctionUuid), TE.map(AuctionMapper.toResponseDto));
  }
}
