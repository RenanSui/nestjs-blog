import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { DatabaseModule } from './database/database.module'
import { ProfileModule } from './profile/profile.module'
import { UserModule } from './user/user.module'
import { PostModule } from './post/post.module';

@Module({
  imports: [AuthModule, UserModule, DatabaseModule, ProfileModule, PostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
