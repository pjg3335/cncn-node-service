import { ErrorCode } from '@app/common';
import { AppException } from '@app/common/common/app.exception';
import { HttpStatus } from '@nestjs/common';

export type MapAuctionStatusArgs = {
  status: 'visible' | 'hidden' | 'cancelled';
  startAt: Date;
  endAt: Date;
};

export type MapAuctionStatusReturn = 'waiting' | 'active' | 'ended' | 'hidden' | 'cancelled';

export function mapAuctionStatus({ endAt, startAt, status }: MapAuctionStatusArgs): MapAuctionStatusReturn {
  if (status === 'cancelled' || status === 'hidden') {
    return status;
  } else if (status === 'visible') {
    const now = new Date();
    if (now < startAt) {
      return 'waiting';
    } else if (now > endAt) {
      return 'ended';
    } else {
      return 'active';
    }
  } else {
    const _exhaustiveCheck: never = status;
    throw new AppException(
      { message: status + '는 유효하지 않은 상태입니다.', code: ErrorCode.INTERNAL_VALIDATION_ERROR },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
