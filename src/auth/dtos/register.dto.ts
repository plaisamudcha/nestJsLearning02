import { IsAlphanumeric, IsEmail, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsAlphanumeric()
  @MinLength(6)
  password: string;
}
