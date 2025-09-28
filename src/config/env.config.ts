import { registerAs } from '@nestjs/config';
import { googleSchema, jwtSchema } from './env.schema';

export const envConfig = registerAs('env', () => ({
  port: parseInt(process.env.PORT!)
}));

export const jwtConfig = registerAs('jwt', () => {
  const data = jwtSchema.parse(process.env);
  return data;
});

export const googleConfig = registerAs('google', () => {
  const data = googleSchema.parse(process.env);
  return data;
});
