import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private users: User[] = [];
  private nextId = 1;

  create(createUserDto: CreateUserDto): User {

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
    if (!searchText) {
      return this.users;
    }
    const searchLower = searchText.toLowerCase();
    return this.users.filter(
      user =>
        user.nombre.toLowerCase().includes(searchLower) ||
        user.correoElectronico.toLowerCase().includes(searchLower) ||
        user.perfil.nombrePerfil.toLowerCase().includes(searchLower),
    );
  }

} 