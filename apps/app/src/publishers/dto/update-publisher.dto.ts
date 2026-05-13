import { IsOptional } from 'class-validator';

export class UpdatePublisherDto {
  @IsOptional()
  name?: string;
  @IsOptional()
  email?: string;
  @IsOptional()
  contact_name?: string;
}
