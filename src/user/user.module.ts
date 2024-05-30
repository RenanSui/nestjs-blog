import { MiddlewareConsumer, Module } from '@nestjs/common'
import { DatabaseModule } from 'src/database/database.module'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { AuthMiddleware } from 'src/middlewares/authMiddleware'

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('user')
  }
}
