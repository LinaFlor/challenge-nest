import { Injectable, NotFoundException, BadRequestException} from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private users: User[] = [];
  private nextId = 1;

  create(createUserDto: CreateUserDto): User {

    //primero verificamos que el email no este ya registrado
    const emailLower = createUserDto.correoElectronico.toLowerCase(); 
    const emailExists = this.users.some(user => user.correoElectronico.toLowerCase() === emailLower); 

    if (emailExists) {
      throw new BadRequestException(`El correo electrónico ${createUserDto.correoElectronico} ya está en uso.`)
    }

    const newUser: User = {
      id: this.nextId++,
      ...createUserDto,
      perfil: {
        id: this.nextId,
        ...createUserDto.perfil,
      },
    };

    this.users.push(newUser);
    return newUser;
  }

  findAll(searchText?: string): User[] {
    //si no se proporciona un parametro de busqueda, se devuelve todos los usuarios
    if (!searchText) {
      return this.users;
    }
    //convertimos el parametro de busqueda a minusculas
    const searchLower = searchText.toLowerCase();
    return this.users.filter(
      user =>
        user.nombre.toLowerCase().includes(searchLower) ||  //pasamos todas las propiedades a minusculas para asegurar que la busqueda sea correcta
        user.correoElectronico.toLowerCase().includes(searchLower) ||
        user.perfil.nombrePerfil.toLowerCase().includes(searchLower),
    );
  }

  findOne(id: number): User {
    const user = this.users.find(user => user.id === id);
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return user;
  }

  update(id: number, updateUserDto: Partial<CreateUserDto>): User {
    const userIndex = this.users.findIndex(user => user.id === id);

    if (userIndex === -1) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
  
    const existingUser = this.users[userIndex];

    const updatedUser: User = {
      ...existingUser,
      ...updateUserDto,
      perfil: {
        ...(existingUser.perfil || {}), // Asegura que perfil existe
        ...(updateUserDto.perfil || {}),
      },
    };
  
    this.users[userIndex] = updatedUser;
    return updatedUser;
  }
  

  remove(id: number): void {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    //usamos el metodo splice para eliminar el usuario de la lista, modificando el array original en memoria
    this.users.splice(userIndex, 1);
  }


} 