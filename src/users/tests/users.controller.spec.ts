import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { NotFoundException } from '@nestjs/common';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  const mockedUser = {id: 1, nombre: 'Juan Perez', correoElectronico: 'test@example.com', edad: 20, perfil: { nombrePerfil: 'user', id: 1, codigo: 'USR001' }};
 
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([{id: 1, nombre: 'Juan Perez', correoElectronico: 'test@example.com', edad: 20, perfil: { nombrePerfil: 'user', id: 1 }}, {id: 2, nombre: 'Ana Perez', correoElectronico: 'test2@example.com', edad: 21, perfil: { nombrePerfil: 'admin', id: 2 }}]),
            findOne: jest.fn().mockResolvedValue(mockedUser),
            create: jest.fn().mockResolvedValue(mockedUser),
            update: jest.fn().mockResolvedValue(mockedUser),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
        {
            provide: AuthGuard,
            useValue: {
                canActivate: jest.fn(() => true)
            }
          },
          {
            provide: RolesGuard,
            useValue: {
                canActivate: jest.fn(() => true)
            },
          },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('create', () => {
    it('should create and return a new user', () =>{ 

      const expectedUser = { 
        id: 1,
        nombre: 'Juan Perez', 
        correoElectronico: 'test@example.com', 
        edad: 20, 
        perfil: { 
          nombrePerfil: 'user', 
          codigo: 'USR001',
          id: 1
        } 
      };

      jest.spyOn(usersService, 'create').mockReturnValue(expectedUser);

      const result = usersController.create(mockedUser);
      expect(result).toEqual(expectedUser);
    });
  });

  describe('findAll', () => {
    it('should call usersService.findAll with search query if provided', () => {
        const search = 'juan';
  
        jest.spyOn(usersService, 'findAll').mockReturnValue([mockedUser]);

        const result = usersController.findAll(search);
  
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(usersService.findAll).toHaveBeenCalledWith(search);

        expect(result).toEqual([mockedUser]);
      });
    
    
    
    it('should call usersService.findAll with undefined if no search query', () => {
        const expectedResult = [];
    
        jest.spyOn(usersService, 'findAll').mockReturnValue(expectedResult);
    
        const result = usersController.findAll();
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(usersService.findAll).toHaveBeenCalledWith(undefined);
        expect(result).toEqual(expectedResult);
      });
    });

  describe('findOne', () => {
    it('should return a user by id', () => {
  
        jest.spyOn(usersService, 'findOne').mockReturnValue(mockedUser);
  
        const result = usersController.findOne(1);
        expect(result).toEqual(mockedUser);
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(usersService.findOne).toHaveBeenCalledWith(1);
    });
  
    it('should throw an error if user is not found', () => {
      jest.spyOn(usersService, 'findOne').mockImplementation(() => {
        throw new NotFoundException('User not found');
      });
  
      expect(() => usersController.findOne(999)).toThrow(NotFoundException);
    });
  });
  

  describe('update', () => {
    it('should update and return the updated user', () => {
      const updateUserDto = { nombre: 'Pepe' };
      const expectedUser = { 
        id: 1, 
        nombre: 'Pepe',
        correoElectronico: 'test@example.com',
        edad: 20,
        perfil: { nombrePerfil: 'user', id: 1, codigo: 'USR001' }
      };
  
      jest.spyOn(usersService, 'update').mockReturnValue(expectedUser);
  
      const result = usersController.update(1, updateUserDto);
      
      expect(result).toEqual(expectedUser);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(usersService.update).toHaveBeenCalledWith(1, updateUserDto);
    });
  });
  

  describe('remove', () => {
    it('should remove a user', async () => {
      await expect(usersController.remove(1)).resolves.not.toThrow();
    });
  
    it('should throw an error if user is not found', () => {
      jest.spyOn(usersService, 'remove').mockImplementation(() => {
        throw new NotFoundException('Usuario no encontrado');
      });
  
      expect(() => usersController.remove(999)).toThrow(NotFoundException);
    });
  });
  
  
});

