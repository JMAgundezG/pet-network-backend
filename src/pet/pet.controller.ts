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
import { PetService } from './pet.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('pets')
@Controller('pets')
export class PetController {
  constructor(private readonly petService: PetService) {}
  @Get(':id')
  async getPetsFromUser(@Param('id') id: string) {
    return await this.petService.getAllFromUser(parseInt(id));
  }
}
