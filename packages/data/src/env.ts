import { z } from 'zod';

const envSchema = z.object({
  EXPO_PUBLIC_API_URL: z.string().nonempty(),
});

export const env = envSchema.parse(process.env);

export type Env = z.infer<typeof envSchema>;
