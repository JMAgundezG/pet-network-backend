import { Get, Param, Controller } from '@nestjs/common';
import { CommentService } from './comment.service';
import { ApiTags } from '@nestjs/swagger/dist';

@ApiTags('comments')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get(':id')
  async getCommentsFromUser(@Param('id') id: string) {
    return await this.commentService.getAllFromUser(parseInt(id));
  }
}
