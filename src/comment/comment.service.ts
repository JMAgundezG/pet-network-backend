import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { Comment } from './comment.interface';
import { CreateCommentDTO } from './dto/createComment.dto';

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

  async create(comment: CreateCommentDTO): Promise<Comment> {
    const user = await this.prisma.appUser.findUnique({
      where: {
        id: comment.ownerId,
      },
    });
    if (!user) {
      throw new HttpException('User not found', 404);
    }

    const createdComment = await this.prisma.comment.create({
      data: {
        title: comment.title,
        text: comment.text,
        owner: {
          connect: {
            id: comment.ownerId,
          },
        },
      },
    });

    return {
      text: createdComment.text,
      title: createdComment.title,
    };
  }

  async update(id: number, comment: Comment): Promise<Comment> {
    const user = await this.prisma.appUser.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new HttpException('User not found', 404);
    }

    const updatedComment = await this.prisma.comment.update({
      where: {
        id,
      },
      data: {
        title: comment.title,
        text: comment.text,
      },
    });

    if (!updatedComment) {
      throw new HttpException('Comment not found', 404);
    }

    return {
      text: updatedComment.text,
      title: updatedComment.title,
    };
  }

  async delete(id: number): Promise<Comment> {

    const comment = await this.prisma.comment.findUnique({
      where: {
        id,
      },
    });

    if (!comment) {
      throw new HttpException('Comment not found', 404);
    }
    

    const deletedComment = await this.prisma.comment.delete({
      where: {
        id,
      },
    });

    if (!deletedComment) {
      throw new HttpException('Comment not found', 404);
    }

    return {
      text: deletedComment.text,
      title: deletedComment.title,
    };
  }
}
