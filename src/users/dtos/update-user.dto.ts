// import { Transform, Type } from 'class-transformer';
// import {
//   ArrayNotEmpty,
//   IsArray,
//   IsBoolean,
//   IsDate,
//   IsEmail,
//   IsInt,
//   IsNotEmpty,
//   IsNumber,
//   IsOptional,
//   IsPositive,
//   IsString,
//   IsUrl,
//   ValidateNested
// } from 'class-validator';

import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

// class Address {
//   @IsString()
//   @IsNotEmpty()
//   @Transform(({ value }) => {
//     if (typeof value === 'string') {
//       return value.trim();
//     }
//   })
//   city: string;

//   @IsString()
//   @IsNotEmpty()
//   province: string;
// }

// export class UpdateUserDto {
//   @IsString({ message: 'Name must be a string' })
//   @IsOptional()
//   name?: string;

//   @IsEmail({}, { message: 'Email must be valid' })
//   @IsOptional()
//   email?: string;

//   @IsDate()
//   @Type(() => Date) // transform string to Date
//   @IsOptional()
//   dob?: Date;

//   @IsNumber()
//   @IsInt()
//   @IsPositive()
//   @IsOptional()
//   point?: number;

//   @IsBoolean()
//   @IsOptional()
//   status?: boolean;

//   @IsUrl()
//   @IsOptional() // image is not required
//   image?: string;

//   @IsArray()
//   @ArrayNotEmpty()
//   @IsString({ each: true }) // each: true => check each element in array
//   @IsOptional()
//   hashtag?: string[];

//   @ValidateNested()
//   @Type(() => Address) // transform plain object to Address class instance
//   @IsOptional()
//   address?: Address;
// }

// we can use PartialType from @nestjs/mapped-types to make all properties optional
export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['email'] as const)
) {}
