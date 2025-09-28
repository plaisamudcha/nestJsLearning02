import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  ValidationPipe
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { create } from 'domain';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  findById(
    @Param(
      'id',
      new ParseIntPipe({
        // errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY, // if has exceptionFactory, this will be ignored
        // exceptionFactory() {
        //   throw new BadRequestException('ID must be an integer');
        // }
      })
    )
    id: number
  ) {
    return { id };
  }

  // body from client {name, email, dob, status, point, image, hashtag}
  @Post()
  // createUser(
  //   @Body(new ValidationPipe({ transform: true, whitelist: true }))
  //   body: CreateUserDto)
  async createUser(@Body() createUserDto: CreateUserDto) {
    // convert body (plain object) to CreateUserDto instance
    // validate instance of CreateUserDto
    // return body (plain object)
    // but we want to return CreateUserDto instance
    // we have to use transform: true in ValidationPipe to convert plain object to class instance
    // we have to use whitelist: true in ValidationPipe to remove extra properties
    // but we can use global pipe in main.ts instead of using it in each controller
    // console.log(createUserDto);
    // console.log(createUserDto instanceof CreateUserDto); // true
    await this.usersService.createUser(createUserDto);
    return 'User created';
  }

  @Patch(':userId')
  updateUser(@Param('userId') userId: string, @Body() body: UpdateUserDto) {
    // throw new Error('Method not implemented.');
    // throw new HttpException(
    //   {
    //     code: 'email_exist',
    //     status: HttpStatus.CONFLICT,
    //     details: 'Email already exists'
    //   },
    //   HttpStatus.CONFLICT
    // );
    // or we can use ConflictException that is child class of HttpException
    throw new ConflictException({
      code: 'email_exist',
      status: HttpStatus.CONFLICT,
      details: 'Email already exists'
    });

    // Best practice: error end point should return {status,message,code,details,timestamp,path}
  }
}

// error response to client should be like this
// [{field: 'name', message: 'Name must be a string'}, {field: 'email', message: 'Email must be valid'}]
