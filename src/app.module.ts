import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config/env.validation';
import { envConfig, jwtConfig } from './config/env.config';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true, // makes ConfigModule available globally without needing to import in other modules
      validationSchema: null, // You can use Joi or any validation library to validate environment variables
      validate: validate,
      load: [envConfig, jwtConfig]
    }) // ConfigModule is a dynamic module that has a forRoot method or register method (convention)
    // DynamicModule.forRoot()
  ]
})
export class AppModule {}
