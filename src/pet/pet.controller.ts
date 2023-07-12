import { Get, Param, Controller } from '@nestjs/common';
import { PetService } from './pet.service';
import { ApiTags } from '@nestjs/swagger';
import { Pet } from './pet.interface';

@ApiTags('pets')
@Controller('pets')
export class PetController {
  constructor(private readonly petService: PetService) {}
  @Get(':id')
  async getPetsFromUser(@Param('id') id: string): Promise<Pet[]> {
    return await this.petService.getAllFromUser(parseInt(id));
  }
}
