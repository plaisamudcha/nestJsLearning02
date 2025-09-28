import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { type HashService } from '../interfaces/hash-service.interface';
import { JwtService } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/env.config';
import { type ConfigType } from '@nestjs/config';
import { RegisterDto } from '../dtos/register.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    @Inject('HashService') private readonly hashService: HashService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly prismaService: PrismaService
  ) {}

  async register(registerBody: RegisterDto) {
    // find Existing email
    const existingUser = await this.prismaService.user.findUnique({
      where: { email: registerBody.email }
    });
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }
    // hash password
    const hashedPassword = await this.hashService.hash(registerBody.password);
    // insert into database
    await this.prismaService.user.create({
      data: { email: registerBody.email, password: hashedPassword }
    });
    // send verification email
  }

  async login() {
    const accessToken = await this.jwtService.signAsync({ id: 1 });
    const refreshToken = await this.jwtService.signAsync(
      { id: 1 },
      { secret: this.jwtConfiguration.JWT_REFRESH_SECRET, expiresIn: '7d' }
    );
    return { accessToken, refreshToken };
  }
}
