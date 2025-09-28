import { envSchema } from './env.schema';

export function validate(config: Record<string, any>) {
  const { data, success, error } = envSchema.safeParse(config); // throws if validation fails

  if (!success) {
    console.log(error);
    throw new Error('Invalid environment variables');
  }

  return data;
} // custom validation function such as zod schema
