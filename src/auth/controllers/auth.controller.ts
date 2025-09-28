import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { RegisterDto } from '../dtos/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login() {
    const { accessToken, refreshToken } = await this.authService.login();
    return { accessToken, refreshToken };
  }

  @Post('register')
  async register(@Body() registerBody: RegisterDto) {
    await this.authService.register(registerBody);
    return { message: 'User registered successfully' };
  }
}
