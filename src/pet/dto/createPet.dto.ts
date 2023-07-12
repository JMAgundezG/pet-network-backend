import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreatePetDTO {
  @IsNotEmpty()
  readonly name: string;

  @IsUrl()
  readonly image?: string;

  @IsNotEmpty()
  readonly ownerId: number;

}
