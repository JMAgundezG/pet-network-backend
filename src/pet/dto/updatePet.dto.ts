import { IsNotEmpty } from 'class-validator';

export class UpdatePetDTO {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly image?: string;

  @IsNotEmpty()
  readonly ownerId: number;
}
