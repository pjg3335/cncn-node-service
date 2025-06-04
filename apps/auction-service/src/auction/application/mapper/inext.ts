import { Provider } from '@nestjs/common';
import { AuctionMapper } from './auction.mapper';

export const mapperProviders: Provider[] = [AuctionMapper];
