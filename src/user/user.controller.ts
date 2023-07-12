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
import { UserService } from './user.service';
import { UserData, UserListData } from './user.interface';
import { CreateUserDTO, UpdateUserDTO } from './dto';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger/dist';

@ApiTags('user')
@Controller('')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('users')
  @ApiQuery({
    name: 'q',
    type: String,
    description: 'query string for search',
    required: false,
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    description: 'page number',
    required: false,
  })
  @ApiQuery({
    name: 'orderBy',
    type: String,
    description: 'order by',
    required: false,
  })
  async findAll(
    @Query('q') q: string,
    @Query('page') page: number,
    @Query('orderBy') orderBy: string,
  ): Promise<UserListData> {
    const name = q || '';
    const pagination = page - 1 || 0;
    const order = orderBy == 'name' ? 'name' : 'id';
    console.log('name', name, 'pagination', pagination);
    const returned = await this.userService.getAllByName(
      name,
      pagination,
      order,
    );
    return returned;
  }

  @Post('users')
  @ApiBody({ type: CreateUserDTO })
  async create(@Body() userData: CreateUserDTO) {
    return await this.userService.create(userData);
  }

  @Get('user/:id')
  async findOne(@Param('id') id: string): Promise<UserData> {
    return await this.userService.getById(parseInt(id));
  }

  @Put('user/:id')
  @ApiBody({ type: UpdateUserDTO })
  async update(
    @Param('id') id: string,
    @Body() userData: UpdateUserDTO,
  ): Promise<UserData> {
    return await this.userService.update(id, userData);
  }

  @Delete('user/:id')
  async delete(@Param('id') id: string) {
    return await this.userService.delete(parseInt(id));
  }

  @Get('users/ids')
  async getAllIds(): Promise<string[]> {
    console.log('getAllIds', await this.userService.getAllIds());
    return await this.userService.getAllIds();
  }
}
