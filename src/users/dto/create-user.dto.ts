import { IsString, IsEmail, IsNumber, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CreateProfileDto } from './create-profile.dto';

export class CreateUserDto {
  @IsString({message: "El nombre debe ser una cadena de texto"})
  @IsNotEmpty({message: "El nombre no puede estar vacio"})
  @ApiProperty({ description: 'Nombre del usuario' })
  nombre: string;

  @IsEmail({}, {message: "El correo electronico debe ser una direccion de correo valida"})
  @IsNotEmpty({message: "El correo electronico no puede estar vacio"})
  @ApiProperty({ description: 'Correo electronico' })
  correoElectronico: string;

  @IsNumber({}, {message: "La edad debe ser un numero"})
  @IsNotEmpty({message: "La edad no puede estar vacia"})
  @ApiProperty({ description: 'Edad' })
  edad: number;

  @ValidateNested()
  @Type(() => CreateProfileDto)
  @IsNotEmpty({message: "El perfil no puede estar vacio"})
  @ApiProperty({ description: 'Datos del perfil' })
  perfil: CreateProfileDto;
} 