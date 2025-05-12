import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  let usersService: UsersService;
  const mockedUser = {
    nombre: 'Juan Perez',
    correoElectronico: 'juan.perez@example.com',
    edad: 30,
    perfil: { nombrePerfil: 'user', codigo: 'USR001', id: 1},
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('create', () => {
    it('should create and return a new user', () => {
  
      const result = usersService.create(mockedUser);
  
      expect(result).toEqual({
        id: 1,
        ...mockedUser,
        perfil: {...mockedUser.perfil },
      });
    });

    it('should throw an error if the email is already in use', () => {
  
      usersService.create(mockedUser);

      expect(() => usersService.create(mockedUser)).toThrow(
        new BadRequestException(
          'El correo electrónico juan.perez@example.com ya está en uso.'
        )
      );
    });
  });

  describe('findAll', () => {
    it('should return all users if no search query is provided', () => {
      const createUserDto1 = { nombre: 'Juan', correoElectronico: 'juan@example.com', edad: 30, perfil: { nombrePerfil: 'user', codigo: 'USR001' } };
      const createUserDto2 = { nombre: 'Maria', correoElectronico: 'maria@example.com', edad: 25, perfil: { nombrePerfil: 'admin', codigo: 'ADM001' } };
  
      usersService.create(createUserDto1);
      usersService.create(createUserDto2);
  
      const result = usersService.findAll();
      expect(result.length).toBe(2);
      expect(result).toEqual([
        {
          ...createUserDto1,
          id: 1,
          perfil: {
            ...createUserDto1.perfil,
            id: 1
          }
        },
        {
          ...createUserDto2,
          id: 2,
          perfil: {
            ...createUserDto2.perfil,
            id: 2
          }
        }
      ]);
    });
  
    it('should return filtered users based on search query', () => {
      const createUserDto1 = { nombre: 'Juan', correoElectronico: 'juan@example.com', edad: 30, perfil: { nombrePerfil: 'user', codigo: 'USR001', id: 1 } };
      const createUserDto2 = { nombre: 'Maria', correoElectronico: 'maria@example.com', edad: 25, perfil: { nombrePerfil: 'admin', codigo: 'ADM001', id: 2 } };
  
      usersService.create(createUserDto1);
      usersService.create(createUserDto2);
  
      const result = usersService.findAll('juan');
      expect(result.length).toBe(1);
      expect(result[0].nombre).toBe('Juan');
    });
  });
  
  describe('findOne', () => {
    it('should return a user by id', () => {  
      const newUser = usersService.create(mockedUser);
  
      const result = usersService.findOne(newUser.id);
      expect(result).toEqual(newUser);
    });
  
    it('should throw NotFoundException if the user is not found', () => {
      expect(() => usersService.findOne(999)).toThrow(
        new NotFoundException('Usuario con ID 999 no encontrado')
      );
    });
  });

  describe('update', () => {
    it('should update and return the user', () => {  
      const newUser = usersService.create(mockedUser);
  
      const updateUserDto = { nombre: 'Pepe' };
      const updatedUser = usersService.update(newUser.id, updateUserDto);
  
      expect(updatedUser.nombre).toBe('Pepe');
      expect(updatedUser.id).toBe(newUser.id);
    });
  
    it('should throw NotFoundException if the user to update is not found', () => {
      const updateUserDto = { nombre: 'Pepe' };
  
      expect(() => usersService.update(999, updateUserDto)).toThrow(
        new NotFoundException('Usuario con ID 999 no encontrado')
      );
    });
  });

  describe('remove', () => {
    it('should remove the user', () => {  
      const newUser = usersService.create(mockedUser);
  
      usersService.remove(newUser.id);
      expect(() => usersService.findOne(newUser.id)).toThrow(
        new NotFoundException(`Usuario con ID ${newUser.id} no encontrado`)
      );
    });
  
    it('should throw NotFoundException if the user to remove is not found', () => {
      expect(() => usersService.remove(999)).toThrow(
        new NotFoundException('Usuario con ID 999 no encontrado')
      );
    });
  });
  
});
