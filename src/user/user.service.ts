import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UserData, UsersListItem } from './user.interface';

const select = {
  id: true,
  name: true,
  description: true,
  image: true,
};

const selectAllByName = {
  name: true,
  image: true,
  id: true,
};

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto): Promise<UserData> {
    console.log(dto);
    const { name, description, image } = dto;

    const data = {
      name,
      description,
      image,
    };
    const user = await this.prisma.appUser.create({
      data,
      select,
    });

    return user;
  }

  async getAllByName(
    name: string,
    starts: number,
    orderBy: string,
  ): Promise<UsersListItem[]> {
    const users = await this.prisma.appUser.findMany({
      where: {
        name: {
          contains: name,
        },
      },
      select: selectAllByName,
      skip: starts,
      take: 10,
      orderBy: {
        [orderBy]: 'asc',
      },
    });

    return users;
  }

  async getById(id: number): Promise<UserData> {
    const user = await this.prisma.appUser.findFirst({
      where: {
        id,
      },
      select,
    });

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    return user;
  }

  async update(name, dto: UpdateUserDto): Promise<UserData> {
    const { description, image } = dto;

    const user = await this.prisma.appUser.findFirst({
      where: {
        name,
      },
      select,
    });

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    const data = {
      name,
      description,
      image,
    };

    const updatedUser = await this.prisma.appUser.update({
      where: {
        id: user.id,
      },

      data,
      select,
    });

    return updatedUser;
  }

  async delete(id: number): Promise<boolean> {
    const user = await this.prisma.appUser.findFirst({
      where: {
        id,
      },
    });
    console.log(user);
    if (!user) {
      throw new HttpException('User not found', 404);
    }

    // NOTE: THIS COULD BE RESOLVE WITH CASCADE DELETE IN PRISMA SCHEMA
    //       BUT IT'S EASIER TO EXPLAIN THIS WAY. IT WILL BE CHANGED IN THE FUTURE
    await this.prisma.friend.deleteMany({
      where: {
        OR: [
          {
            user_id: user.id,
          },
          {
            friend_id: user.id,
          },
        ],
      },
    });

    await this.prisma.pet.deleteMany({
      where: {
        ownerId: user.id,
      },
    });

    await this.prisma.appUser.delete({
      where: {
        id: user.id,
      },
    });

    return true;
  }

  async getAllIds(): Promise<string[]> {
    const users = await this.prisma.appUser.findMany({
      select: {
        id: true,
      },
    });

    return users.map((user) => user.id.toString());
  }
}
