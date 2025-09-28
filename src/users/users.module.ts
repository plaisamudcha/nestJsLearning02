import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}

// Dynamic module example
// @Module({
//   imports: []
// })
// export class DynamicModule {
//   static forRoot(options: any) {
//     return {
//       imports: [options.module]
//     };
//   }
// }
// is same as imports : [AuthModule, DatabaseModule]
