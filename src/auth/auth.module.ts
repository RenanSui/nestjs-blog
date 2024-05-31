import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { DatabaseModule } from 'src/database/database.module'
import { UserService } from 'src/user/user.service'

@Module({
  imports: [DatabaseModule],
  controllers: [AuthController],
  providers: [AuthService, UserService],
})
export class AuthModule {}