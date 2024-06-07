import { MiddlewareConsumer, Module } from '@nestjs/common'
import { DatabaseService } from 'src/database/database.service'
import { UserMiddleware } from 'src/user/user.middleware'
import { UserService } from 'src/user/user.service'
import { PostController } from './post.controller'
import { PostService } from './post.service'

@Module({
  controllers: [PostController],
  providers: [PostService, DatabaseService, UserService],
})
export class PostModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes('post')
  }
}
