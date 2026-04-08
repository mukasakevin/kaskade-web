import { IsString, IsNotEmpty, IsDateString, IsUUID } from 'class-validator';

export class CreateRequestDto {
  @IsUUID()
  @IsNotEmpty()
  serviceId: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsDateString()
  @IsNotEmpty()
  date: string;
}
