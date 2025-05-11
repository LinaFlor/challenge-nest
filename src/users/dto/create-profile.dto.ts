import { IsString, IsNotEmpty } from 'class-validator';

export class CreateProfileDto {
  @IsString({message: "El codigo debe ser una cadena de texto"})
  @IsNotEmpty({message: "El codigo no puede estar vacio"})
  codigo: string;

  @IsString({message: "El nombre del perfil debe ser una cadena de texto"})
  @IsNotEmpty({message: "El nombre del perfil no puede estar vacio"})
  nombrePerfil: string;
} 