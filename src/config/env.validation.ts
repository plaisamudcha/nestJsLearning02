import z from 'zod';

export function validate(config: Record<string, any>) {
  const envSchema = z.object({
    PORT: z.coerce.number().int().min(0).max(65535),
    DATABASE_URL: z.url(),
    JWT_SECRET: z.string().min(32)
  });
  const { data, success, error } = envSchema.safeParse(config); // throws if validation fails

  if (!success) {
    console.log(error);
    throw new Error('Invalid environment variables');
  }

  return data;
} // custom validation function such as zod schema
