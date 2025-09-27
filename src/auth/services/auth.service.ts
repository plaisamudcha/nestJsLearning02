import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  register() {
    // find Existing email
    // hash password
    // insert into database
    // send verification email
  }
}
