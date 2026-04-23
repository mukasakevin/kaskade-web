import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsPositive,
  MinLength,
} from 'class-validator';

export class CreateServiceDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsString()
  @IsOptional()
  imageKey?: string; // Clé du CDN (ex: "service-123-abc.jpg")
}

/**
 * ServiceResponseDto - Expose imageUrl au lieu de imageKey
 * L'imageKey n'est jamais envoyé au frontend
 */
export class ServiceResponseDto {
  id: string;
  name: string;
  category: string;
  description: string | null;
  price: number;
  isActive: boolean;
  imageUrl: string | null; // ← Généré dynamiquement du imageKey
  createdAt: Date;
  updatedAt: Date;
}

/**
 * UpdateServiceDto - Permet de modifier imageKey
 */
export class UpdateServiceDto {
  @IsString()
  @IsOptional()
  @MinLength(2)
  name?: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  price?: number;

  @IsString()
  @IsOptional()
  imageKey?: string; // Peut changer l'image

  @IsOptional()
  isActive?: boolean;
}
