import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { RequestWithUser } from 'src/users/interfaces/user.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    // este guard simula que el usuario está autenticado y tiene un rol
    // en una app real esto se podria hacer decodificando un JWT por ejemplo
    //los roles (nombrePerfil) son "admin" y "user"
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    request.user = {
      id: 1,
      nombre: 'Usuario de prueba',
      correoElectronico: 'test@test.com',
      edad: 20,
      perfil: { nombrePerfil: 'admin', codigo: 'USR001', id: 1 } //cambiar el nombrePerfil segun el rol necesario para la prueba
    };

    return true; // siempre retorna true para simular la autenticacion
  }
}
 