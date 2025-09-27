import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  ValidationPipe
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('users')
export class UsersController {
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
  createUser(@Body() body: CreateUserDto) {
    // convert body (plain object) to CreateUserDto instance
    // validate instance of CreateUserDto
    // return body (plain object)
    // but we want to return CreateUserDto instance
    // we have to use transform: true in ValidationPipe to convert plain object to class instance
    // we have to use whitelist: true in ValidationPipe to remove extra properties
    // but we can use global pipe in main.ts instead of using it in each controller
    console.log(body);
    console.log(body instanceof CreateUserDto); // true
    return body;
  }
}

// error response to client should be like this
// [{field: 'name', message: 'Name must be a string'}, {field: 'email', message: 'Email must be valid'}]
