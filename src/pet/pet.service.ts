import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { UpdatePetDTO } from './dto/updatePet.dto';
import { CreatePetDTO } from './dto';
import { Pet } from './pet.interface';
@Injectable()
export class PetService {
  constructor(private prisma: PrismaService) {}

  async getAllFromUser(id: number): Promise<Pet[]> {
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
        ownerId: pet.ownerId,
      };
    });
  }

  async create(pet: CreatePetDTO): Promise<Pet> {
    const user = await this.prisma.appUser.findUnique({
      where: {
        id: pet.ownerId,
      },
    });
    if (!user) {
      throw new HttpException('User not found', 404);
    }

    const createdPet = await this.prisma.pet.create({
      data: {
        name: pet.name,
        image: pet.image,
        owner: {
          connect: {
            id: pet.ownerId,
          },
        },
      },
    });

    return {
      name: createdPet.name,
      image: createdPet.image,
      ownerId: createdPet.ownerId,
    };
  }

  async update(id: number, pet: UpdatePetDTO): Promise<Pet> {
    const user = await this.prisma.appUser.findUnique({
      where: {
        id: pet.ownerId,
      },
    });
    if (!user) {
      throw new HttpException('User not found', 404);
    }

    const updatedPet = await this.prisma.pet.update({
      where: {
        id,
      },
      data: {
        name: pet.name,
        image: pet.image,
        owner: {
          connect: {
            id: pet.ownerId,
          },
        },
      },
    });

    return {
      name: updatedPet.name,
      image: updatedPet.image,
      ownerId: updatedPet.ownerId,
    };
  }

  async delete(id: number): Promise<Pet> {
    const pet: Pet = await this.prisma.pet.findUnique({
      where: {
        id,
      },
    });
    if (!pet) {
      throw new HttpException('Pet not found', 404);
    }

    await this.prisma.pet.delete({
      where: {
        id,
      },
    });

    return {
      name: pet.name,
      image: pet.image,
      ownerId: pet.ownerId,
    };
  }
}
