import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { PrismaService } from '../common/services/prisma.service';

@Module({
  providers: [CommentService, PrismaService],
  controllers: [CommentController],
  exports: [CommentService],
})
export class CommentModule implements NestModule {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public configure(_consumer: MiddlewareConsumer) {
    // consumer.apply(AuthMiddleware).forRoutes(CommentController);
  }
}
