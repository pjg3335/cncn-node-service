import { Provider } from '@nestjs/common';
import { AuctionServiceBidderCreatedConsumer } from './auction-service-bidder-created.consumer';

export const auctionMessageHandlerProviders: Provider[] = [AuctionServiceBidderCreatedConsumer];
