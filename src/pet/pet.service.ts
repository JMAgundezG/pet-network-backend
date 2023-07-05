import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';

@Injectable()
export class PetService {
  constructor(private prisma: PrismaService) {}

  async getAllFromUser(id: number) {
    const user = await this.prisma.appUser.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new HttpException('User not found', 404);
    }

    const pets = await this.prisma.pet.findMany({
      where: {
        ownerId: id,
      },
    });

    return pets.map((pet) => {
      return {
        name: pet.name,
        image: pet.image,
      };
    });
  }
}
