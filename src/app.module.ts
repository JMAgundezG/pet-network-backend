import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FriendModule } from './friend/friend.module';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [UserModule, FriendModule, CommentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
