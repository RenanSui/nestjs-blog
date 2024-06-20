import { MiddlewareConsumer, Module } from '@nestjs/common'
import { DatabaseService } from 'src/database/database.service'
import { UserService } from 'src/user/user.service'
import { ProfileController } from './profile.controller'
import { ProfileMiddleware } from './profile.middleware'
import { ProfileService } from './profile.service'

@Module({
  controllers: [ProfileController],
  providers: [UserService, DatabaseService, ProfileService],
})
export class ProfileModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ProfileMiddleware).forRoutes('profile')
  }
}
