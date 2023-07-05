import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { FriendController } from './friend.controller';
import { FriendService } from './friend.service';
import { PrismaService } from '../common/services/prisma.service';

@Module({
  providers: [FriendService, PrismaService],
  controllers: [FriendController],
  exports: [FriendService],
})
export class FriendModule implements NestModule {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public configure(_consumer: MiddlewareConsumer) {
    // consumer.apply(AuthMiddleware).forRoutes(FriendController);
  }
}
