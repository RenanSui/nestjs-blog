import { MiddlewareConsumer, Module } from '@nestjs/common'
import { DatabaseModule } from 'src/database/database.module'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { UserMiddleware } from './user.middleware'

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes('user')
  }
}
