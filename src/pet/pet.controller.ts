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
}
