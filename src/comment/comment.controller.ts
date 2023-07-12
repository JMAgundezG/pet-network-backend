import {
  Get,
  Param,
  Controller,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { ApiTags } from '@nestjs/swagger/dist';
import { CreateCommentDTO } from './dto';
import { UpdateCommentDTO } from './dto';

@ApiTags('comments')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get(':id')
  async getCommentsFromUser(@Param('id') id: string) {
    return await this.commentService.getAllFromUser(parseInt(id));
  }

  @Post()
  async createComment(@Body() comment: CreateCommentDTO) {
    return await this.commentService.create(comment);
  }

  @Put(':id')
  async updateComment(
    @Param('id') id: string,
    @Body() comment: UpdateCommentDTO,
  ) {
    return await this.commentService.update(parseInt(id), comment);
  }

  @Delete(':id')
  async deleteComment(@Param('id') id: string) {
    return await this.commentService.delete(parseInt(id));
  }
}
