import { Body, Controller, Get, Param, Post, Version } from '@nestjs/common';
import { CatalogAuctionResponseDto } from './dto/auction-dto';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { ReadService } from './read.service';
import * as TE from 'fp-ts/TaskEither';
import * as F from 'fp-ts/function';
import { AuctionMapper } from './mapper/auction.mapper';
import { AppException, JwtUser, User } from '@app/common';
import { ThumbnailsRequestDto, ThumbnailsResponseDto } from './dto/thumbnails-dto';

@Controller()
export class ReadController {
  constructor(private readonly readService: ReadService) {}

  @Get('auctions/:auctionUuid')
  @Version('1')
  @ApiBearerAuth()
  @ApiOkResponse({ type: CatalogAuctionResponseDto })
  getAuction(
    @Param('auctionUuid') auctionUuid: string,
    @JwtUser() user: User,
  ): TE.TaskEither<AppException, CatalogAuctionResponseDto> {
    return F.pipe(this.readService.auction(auctionUuid, user), TE.map(AuctionMapper.toResponseDto));
  }

  @Post('catalogs/thumbnails')
  @Version('1')
  @ApiOkResponse({ type: [String] })
  getThumbnails(@Body() dto: ThumbnailsRequestDto): TE.TaskEither<AppException, ThumbnailsResponseDto[]> {
    return this.readService.thumbnails(dto.ids);
  }
}
