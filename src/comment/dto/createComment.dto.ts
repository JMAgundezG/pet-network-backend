import { IsNotEmpty } from 'class-validator';

export class CreateCommentDTO {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  ownerId: number;
}
