import { Injectable, NotFoundException } from '@nestjs/common';
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
    this.users.splice(userIndex, 1);
  }


} 