import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UsersModule } from 'src/users/users.module';
import { BcryptService } from './services/bcrypt.service';
import { GoogleController } from './controllers/google.controller';
import { ArgonService } from './services/argon.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/env.config';
import { ConfigModule, ConfigType } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    // JwtModule.register({
    //   secret: process.env.JWT_SECRET,
    //   signOptions: { expiresIn: '60s' }
    // })
    JwtModule.registerAsync({
      // imports: [ConfigModule], // we don't need to import ConfigModule here because it's global
      inject: [jwtConfig.KEY], // we can inject a service here to use it in the factory
      useFactory: (configService: ConfigType<typeof jwtConfig>) => ({
        secret: configService.JWT_SECRET,
        signOptions: { expiresIn: configService.JWT_EXPIREIN }
      })
    })
  ], // use registerAsync when you need to inject a service to configure the module use register when you have static config
  controllers: [AuthController, GoogleController],
  // providers: [AuthService, BcryptService, ArgonService] // we don't want to inject bcrypt and argon directly
  providers: [
    AuthService,
    { provide: 'HashService', useClass: BcryptService },
    { provide: 'CONST', useValue: 200 } // we can inject any constant value
  ] // we can switch between bcrypt and argon easily
})
export class AuthModule {}
