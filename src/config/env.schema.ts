import z from 'zod';

export const baseSchema = z.object({
  PORT: z.coerce.number().int().min(0).max(65535),
  DATABASE_URL: z.url()
});

export const jwtSchema = z.object({
  JWT_SECRET: z.string().min(32),
  JWT_EXPIREIN: z.coerce.number().int().positive(),
  JWT_REFRESH_SECRET: z.string().min(32)
});

export const googleSchema = z.object({
  GOOGLE_CLIENT_ID: z.string().min(32),
  GOOGLE_CLIENT_SECRET: z.string().min(32)
});

export const envSchema = baseSchema.and(jwtSchema).and(googleSchema);

export type EnvConfig = z.infer<typeof envSchema>;
