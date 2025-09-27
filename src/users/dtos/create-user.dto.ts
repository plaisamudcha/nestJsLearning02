import { Transform, Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsDate,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  ValidateNested
} from 'class-validator';

class Address {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.trim();
    }
  })
  city: string;

  @IsString()
  @IsNotEmpty()
  province: string;
}

export class CreateUserDto {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty()
  name: string;

  @IsEmail({}, { message: 'Email must be valid' })
  email: string;

  @IsDate()
  @Type(() => Date) // transform string to Date
  dob: Date;

  @IsNumber()
  @IsInt()
  @IsPositive()
  point: number;

  @IsBoolean()
  status: boolean;

  @IsUrl()
  @IsOptional() // image is not required
  image?: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true }) // each: true => check each element in array
  hashtag: string[];

  @ValidateNested()
  @Type(() => Address) // transform plain object to Address class instance
  address: Address;
}
