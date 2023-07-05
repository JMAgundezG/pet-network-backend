import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PetController } from './pet.controller';
import { PetService } from './pet.service';
import { PrismaService } from '../common/services/prisma.service';

@Module({
  providers: [PetService, PrismaService],
  controllers: [PetController],
  exports: [PetService],
})
export class PetModule implements NestModule {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public configure(_consumer: MiddlewareConsumer) {
    // consumer.apply(AuthMiddleware).forRoutes(PetController);
  }
}
