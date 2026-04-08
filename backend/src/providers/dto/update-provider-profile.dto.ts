import { IsString, IsOptional } from 'class-validator';

export class UpdateProviderProfileDto {
  @IsString()
  @IsOptional()
  metier?: string;

  @IsString()
  @IsOptional()
  experience?: string;

  @IsString()
  @IsOptional()
  quartier?: string;

  @IsString()
  @IsOptional()
  bio?: string;
}
