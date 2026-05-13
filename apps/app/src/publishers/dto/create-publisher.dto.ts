import { IsNotEmpty } from 'class-validator';

export class CreatePublisherDto {
  @IsNotEmpty()
  name!: string;
  @IsNotEmpty()
  email!: string;
  @IsNotEmpty()
  contact_name!: string;
}
