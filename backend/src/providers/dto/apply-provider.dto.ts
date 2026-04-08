import { IsNotEmpty, IsString } from 'class-validator';

export class ApplyProviderDto {
  @IsString()
  @IsNotEmpty()
  motivation: string;
}
