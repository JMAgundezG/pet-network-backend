import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { Comment } from './comment.interface';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async getAllFromUser(id: number): Promise<Comment[]> {
    const user = await this.prisma.appUser.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new HttpException('User not found', 404);
    }

    const comments = await this.prisma.comment.findMany({
      where: {
        ownerId: id,
      },
    });

    return comments.map((comment) => {
      return {
        text: comment.text,
        title: comment.title,
      };
    });
  }
}
