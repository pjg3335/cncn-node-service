import { ApiProperty } from '@nestjs/swagger';

export class DeleteAuctionRequestDto {
  @ApiProperty({ type: String })
  auctionUuid!: string;
}
