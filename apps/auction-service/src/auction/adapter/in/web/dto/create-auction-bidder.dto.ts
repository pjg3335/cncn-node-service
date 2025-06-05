import { ApiProperty } from '@nestjs/swagger';

export class CreateAuctionBidderRequestDto {
  @ApiProperty({ type: String })
  bidderUuid!: string;

  @ApiProperty({ type: Number })
  bidAmount!: number;
}
