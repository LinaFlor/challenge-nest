import { IsString, IsEmail, IsNumber, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateProfileDto } from './create-profile.dto';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsEmail()
  @IsNotEmpty()
  correoElectronico: string;

  @IsNumber()
  @IsNotEmpty()
  edad: number;

  @ValidateNested()
  @Type(() => CreateProfileDto)
  perfil: CreateProfileDto;
} 