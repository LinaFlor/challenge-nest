import { Injectable, CanActivate, ExecutionContext, ForbiddenException} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { RequestWithUser } from 'src/users/interfaces/user.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  //guard para verificar los roles de los usuarios
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true; // si no hay roles requeridos, se permite el acceso
    }

    const request = context.switchToHttp().getRequest<RequestWithUser>();

    if (!request.user) {
      throw new ForbiddenException('La solicitud no contiene informacion de un usuario');
    }

    const role = request.user.perfil.nombrePerfil;

    if (!role) {
      throw new ForbiddenException('No se encontró un rol para el usuario');
    }

    // verificar si el rol del usuario esta entre los requeridos
    const hasRole = requiredRoles.includes(role);

    if (!hasRole) {
      throw new ForbiddenException('Acceso denegado: permisos insuficientes');
    }


    return true;
  }
}
 