import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '../common/services/prisma.service';

@Module({
  providers: [UserService, PrismaService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule implements NestModule {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public configure(_consumer: MiddlewareConsumer) {
    // consumer.apply(AuthMiddleware).forRoutes(UserController);
  }
}
