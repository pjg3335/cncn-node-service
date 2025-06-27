import { z } from 'zod';

export const dlqTopicValueSchema = z.object({
  startOffset: z.string().nullable(),
  lastOffset: z.string(),
  partition: z.number(),
  topic: z.string(),
  error: z.string(),
  timestamp: z.date(),
});

export type DlqTopicValue = z.infer<typeof dlqTopicValueSchema>;
