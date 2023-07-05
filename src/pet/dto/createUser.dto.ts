import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  readonly name: string;
  @IsNotEmpty()
  readonly description: string;

  @IsUrl()
  readonly image?: string;
}
