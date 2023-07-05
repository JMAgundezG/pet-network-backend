import { IsNotEmpty } from 'class-validator';

export class CreateFriendDTO {
  @IsNotEmpty()
  readonly userId: number;

  @IsNotEmpty()
  readonly friendId: number;
}
