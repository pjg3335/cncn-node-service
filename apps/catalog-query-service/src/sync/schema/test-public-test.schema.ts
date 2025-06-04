import { z } from 'zod';

export const testPublicTestKeySchema = z.object({
  testId: z.string(),
});

export const testPublicTestValueSchema = z.object({
  after: z.object({
    testId: z.string(),
    title: z.string(),
    value: z.number(),
  }),
  op: z.enum(['c', 'u', 'd']),
  ts_ms: z.number(),
});
