import { ApiProperty } from '@nestjs/swagger';

export class CreateAuctionBidderRequestDto {
  @ApiProperty({ type: Number })
  bidAmount!: number;
}
