import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ExecutionContext } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { AuthGuard } from '../src/auth/guards/auth.guard';
import { RequestWithUser } from '../src/users/interfaces/user.interface';

interface ApiResponse {
  id?: number;
  nombre: string;
  correoElectronico: string;
  edad: number;
  perfil: {
    nombrePerfil: string;
    codigo: string;
    id: number;
  };
  message?: string;
}

describe('UsersController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
    .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should create a new user if user is authenticated and has admin role', async () => {
    const createUserDto = {
      nombre: 'Juan Perez',
      correoElectronico: 'juan.perez@example.com',
      edad: 30,
      perfil: { nombrePerfil: 'admin', codigo: 'USR001', id: 1 },
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const response = await request(app.getHttpServer())
      .post('/users')
      .send(createUserDto)
      .expect(201);

    const responseBody = response.body as ApiResponse;
    expect(responseBody).toEqual({
      id: expect.any(Number) as unknown as number,
      ...createUserDto,
      perfil: { ...createUserDto.perfil },
    });
  });

  it('should return 403 Forbidden if user is not an admin', async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
    .overrideGuard(AuthGuard) // Mockeamos AuthGuard para simular un usuario autenticado con un rol específico
    .useValue({
      canActivate: (context: ExecutionContext) => {
        const req = context.switchToHttp().getRequest<RequestWithUser>();
        // simulamos un usuario autenticado con el rol 'user'
        req.user = {
          id: 1,
          nombre: 'Juan Perez',
          edad: 30,
          correoElectronico: 'user@example.com',
          perfil: { nombrePerfil: 'user', codigo: 'USR002', id: 2 }, 
        };
        return true; // AuthGuard permite el paso
      },
    })
    .compile();

    const app = moduleFixture.createNestApplication();
    await app.init();

    const createUserDto = {
      nombre: 'Juan Perez',
      correoElectronico: 'juan.perez@example.com',
      edad: 30,
      perfil: { nombrePerfil: 'user', codigo: 'USR002', id: 2 },
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const response = await request(app.getHttpServer())
      .post('/users')
      .send(createUserDto)
      .expect(403);
    
    const responseBody = response.body as ApiResponse;
    console.log(responseBody);
    expect(responseBody.message).toBe('Acceso denegado: permisos insuficientes');

    await app.close();
  });

  it('should return 401 Unauthorized if user is not authenticated', async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
    .overrideGuard(AuthGuard)
    .useValue({
        canActivate: (context: ExecutionContext) => {
          const req = context.switchToHttp().getRequest<RequestWithUser>();
          // usuario no autenticado
          req.user = undefined;
          return true; 
        },
      })
    .compile();

    const app = moduleFixture.createNestApplication();
    await app.init();

    const createUserDto = {
      nombre: 'Juan Perez',
      correoElectronico: 'juan.perez@example.com',
      edad: 30,
      perfil: { nombrePerfil: 'admin', codigo: 'USR001', id: 1 },
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const response = await request(app.getHttpServer())
      .post('/users')
      .send(createUserDto)
      .expect(401);
    
    const responseBody = response.body as ApiResponse;
    expect(responseBody.message).toBe('La solicitud no contiene informacion de un usuario');

    await app.close();
  });

  afterAll(async () => {
    await app.close();
  });
}); 