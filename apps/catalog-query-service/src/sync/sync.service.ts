import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka, Consumer } from 'kafkajs';
import { testPublicTestKeySchema, testPublicTestValueSchema } from './schema/test-public-test.schema';

@Injectable()
export class SyncService implements OnModuleInit {
  private consumer: Consumer;

  constructor() {
    const kafka = new Kafka({
      brokers: ['kafka1:9092', 'kafka2:9092', 'kafka3:9092'],
    });
    this.consumer = kafka.consumer({ groupId: 'catalog-consumer' });
  }

  async onModuleInit() {
    await this.consumer.connect();
    await this.consumer.subscribe({
      topic: 'test.public.Test',
      fromBeginning: true,
    });

    await this.consumer.run({
      eachBatch: async ({ batch, resolveOffset, heartbeat }) => {
        for (const message of batch.messages) {
          if (message.value !== null && message.key !== null) {
            const key = testPublicTestKeySchema.parse(JSON.parse(message.key.toString()));
            const value = testPublicTestValueSchema.parse(JSON.parse(message.value.toString()));

            console.log('Key:', key);
            console.log('Value:', value);
          }
        }
      },
    });
  }
}
