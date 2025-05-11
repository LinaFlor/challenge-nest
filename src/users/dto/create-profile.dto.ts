import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateProfileDto {
  @IsString({message: "El codigo debe ser una cadena de texto"})
  @IsNotEmpty({message: "El codigo no puede estar vacio"})
  @ApiProperty({ description: 'Codigo del perfil' })
  codigo: string;

  @IsString({message: "El nombre del perfil debe ser una cadena de texto"})
  @IsNotEmpty({message: "El nombre del perfil no puede estar vacio"})
  @ApiProperty({ description: 'Nombre del perfil' })
  nombrePerfil: string;
} 