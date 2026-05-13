import { IsNotEmpty } from 'class-validator';

export class CreateWebsiteDto {
  @IsNotEmpty()
  name!: string;
  @IsNotEmpty()
  publisherId!: number;
}
