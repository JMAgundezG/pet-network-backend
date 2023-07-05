import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  readonly name: string;
  @IsNotEmpty()
  readonly description: string;

  readonly pets: string[];

  @IsUrl()
  readonly image?: string;
}
