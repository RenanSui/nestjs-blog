import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { DatabaseModule } from 'src/database/database.module'
import { UserService } from 'src/user/user.service'
import { ProfileService } from 'src/profile/profile.service'

@Module({
  imports: [DatabaseModule],
  controllers: [AuthController],
  providers: [AuthService, UserService, ProfileService],
})
export class AuthModule {}
