import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { CreateFriendDTO } from './dto/createFriend.dto';
import { DeleteFriendDTO } from './dto/deleteFriend.dto';
import { FriendListItem } from './friend.interface';

@Injectable()
export class FriendService {
  constructor(private prisma: PrismaService) {}

  async getAllFromUser(id: number): Promise<FriendListItem[]> {
    const user = await this.prisma.appUser.findFirst({
      where: {
        id,
      },
    });

    console.log('frienduser', user);
    if (!user) {
      throw new HttpException('User not found', 404);
    }

    const friends = await this.prisma.friend.findMany({
      where: {
        user_id: id,
      },
      select: {
        id: true,
        friend: true,
      },
    });

    return friends.map((friend) => {
      return {
        id: friend.friend.id,
        name: friend.friend.name,
        image: friend.friend.image,
      } as FriendListItem;
    });
  }
  async create(dto: CreateFriendDTO) {
    if (dto.userId === dto.friendId) {
      throw new HttpException('You cannot add yourself as a friend', 400);
    }
    const user = await this.prisma.appUser.findFirst({
      where: {
        id: dto.userId,
      },
    });
    const friend = await this.prisma.appUser.findFirst({
      where: {
        id: dto.friendId,
      },
    });

    if (!user) {
      throw new HttpException('User not found', 404);
    }
    if (!friend) {
      throw new HttpException('Friend not found', 404);
    }

    const friendship = await this.prisma.friend.createMany({
      data: [
        {
          user_id: dto.userId,
          friend_id: dto.friendId,
        },
        {
          user_id: dto.friendId,
          friend_id: dto.userId,
        },
      ],
    });
    return friendship;
  }

  async delete(dto: DeleteFriendDTO) {
    const friendship = await this.prisma.friend.deleteMany({
      where: {
        OR: [
          {
            user_id: dto.userId,
            friend_id: dto.friendId,
          },
          { user_id: dto.friendId, friend_id: dto.userId },
        ],
      },
    });
    return friendship;
  }
}
