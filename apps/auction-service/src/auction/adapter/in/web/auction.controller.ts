import { Body, Controller, Delete, Get, Post, Put, Query, Version } from '@nestjs/common';
import { CreateAuctionUseCase } from '../../../application/port/in/create-auction.use-case';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { JwtUser, User } from '@app/common';
import { UpdateAuctionUseCase } from '../../../application/port/in/update-auction.use-case';
import { AuctionsUseCase } from '../../../application/port/in/auctions.use-case';
import { DeleteAuctionUseCase } from '../../../application/port/in/delete-auction.use-case';
import { AuctionsRequestDto, AuctionsResponseDto } from './dto/auctions.dto';
import { CreateAuctionRequestDto, CreateAuctionResponseDto } from './dto/create-auction.dto';
import { UpdateAuctionRequestDto, UpdateAuctionResponseDto } from './dto/update-auction.dto';
import { DeleteAuctionRequestDto } from './dto/delete-auction.dto';
import { AuctionsDtoMapper } from './mapper/auctions-dto.mapper';
import { CreateAuctionDtoMapper } from './mapper/create-auction-dto.mapper';
import { UpdateAuctionDtoMapper } from './mapper/update-auction-dto.mapper';
import { PresignedUrlRequestDto, PresignedUrlResponseDto } from './dto/presigned-url.dto';
import { PresignedUrlUseCase } from '../../../application/port/in/presigned-url.use-case';

@Controller('/auction')
export class AuctionController {
  constructor(
    private readonly auctionsUseCase: AuctionsUseCase,
    private readonly createAuctionUseCase: CreateAuctionUseCase,
    private readonly updateAuctionUseCase: UpdateAuctionUseCase,
    private readonly deleteAuctionUseCase: DeleteAuctionUseCase,
    private readonly presignedUrlUseCase: PresignedUrlUseCase,
  ) {}

  @Version('1')
  @Get('/list')
  @ApiBearerAuth()
  @ApiOkResponse({ type: AuctionsResponseDto })
  async auctionsV1(@Query() requestDto: AuctionsRequestDto): Promise<AuctionsResponseDto> {
    const command = AuctionsDtoMapper.toCommand(requestDto);
    const response = await this.auctionsUseCase.execute(command);
    return AuctionsDtoMapper.fromResponse(response);
  }

  @Version('1')
  @Post('/create')
  @ApiBearerAuth()
  @ApiOkResponse({ type: CreateAuctionResponseDto })
  async createAuctionV1(
    @JwtUser() user: User,
    @Body() requestDto: CreateAuctionRequestDto,
  ): Promise<CreateAuctionResponseDto> {
    const command = CreateAuctionDtoMapper.toCommand(requestDto);
    const response = await this.createAuctionUseCase.execute(command, user);
    return CreateAuctionDtoMapper.fromResponse(response);
  }

  @Version('1')
  @Put('/update')
  @ApiBearerAuth()
  @ApiOkResponse({ type: UpdateAuctionResponseDto })
  async updateAuctionV1(
    @JwtUser() user: User,
    @Body() requestDto: UpdateAuctionRequestDto,
  ): Promise<UpdateAuctionResponseDto> {
    const command = UpdateAuctionDtoMapper.toCommand(requestDto);
    const response = await this.updateAuctionUseCase.execute(command, user);
    return UpdateAuctionDtoMapper.fromResponse(response);
  }

  @Version('1')
  @Delete('/delete')
  @ApiBearerAuth()
  async deleteAuctionV1(@JwtUser() user: User, @Query() requestDto: DeleteAuctionRequestDto): Promise<void> {
    await this.deleteAuctionUseCase.execute(requestDto, user);
  }

  @Version('1')
  @Post('/presigned-url')
  @ApiBearerAuth()
  @ApiOkResponse({ type: PresignedUrlResponseDto })
  async presignedUrlV1(
    @JwtUser() user: User,
    @Body() requestDto: PresignedUrlRequestDto,
  ): Promise<PresignedUrlResponseDto> {
    return await this.presignedUrlUseCase.execute(requestDto, user);
  }
}
