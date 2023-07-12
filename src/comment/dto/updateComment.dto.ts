import { IsNotEmpty } from 'class-validator';

export class UpdateCommentDTO {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  ownerId: number;
}
