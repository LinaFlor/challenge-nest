import { IsString, IsEmail, IsNumber, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateProfileDto } from './create-profile.dto';

export class CreateUserDto {
  @IsString({message: "El nombre debe ser una cadena de texto"})
  @IsNotEmpty({message: "El nombre no puede estar vacio"})
  nombre: string;

  @IsEmail({}, {message: "El correo electronico debe ser una direccion de correo valida"})
  @IsNotEmpty({message: "El correo electronico no puede estar vacio"})
  correoElectronico: string;

  @IsNumber({}, {message: "La edad debe ser un numero"})
  @IsNotEmpty({message: "La edad no puede estar vacia"})
  edad: number;

  @ValidateNested()
  @Type(() => CreateProfileDto)
  @IsNotEmpty({message: "El perfil no puede estar vacio"})
  perfil: CreateProfileDto;
} 