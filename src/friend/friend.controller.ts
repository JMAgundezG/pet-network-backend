import {
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  Controller,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { DeleteFriendDTO } from './dto/deleteFriend.dto';
import { FriendService } from './friend.service';
import { CreateFriendDTO } from './dto/createFriend.dto';
@ApiTags('friend')
@Controller('friend')
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @Get(':id')
  async findAll(@Param('id') id: string) {
    return await this.friendService.getAllFromUser(parseInt(id));
  }

  @Post()
  @ApiBody({ type: CreateFriendDTO })
  async create(@Body() dto) {
    return await this.friendService.create(dto);
  }

  @Delete()
  async delete(@Body() dto: DeleteFriendDTO) {
    return await this.friendService.delete(dto);
  }
}
