import { MiddlewareConsumer, Module } from '@nestjs/common'
import { DatabaseModule } from 'src/database/database.module'
import { UserService } from 'src/user/user.service'
import { ProfileController } from './profile.controller'
import { ProfileService } from './profile.service'
import { ProfileMiddleware } from './profile.middleware'

@Module({
  imports: [DatabaseModule],
  controllers: [ProfileController],
  providers: [UserService, ProfileService],
})
export class ProfileModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ProfileMiddleware).forRoutes('profile')
  }
}
