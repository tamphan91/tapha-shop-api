import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../common/constants';

@Injectable()
export class UsersGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const id = parseInt(request.params.id, null);
    const roles = request.user.payload.profile.roles;
    // tslint:disable-next-line:no-console
    console.log(roles);
    return roles.includes(UserRole.Admin) || roles.includes(UserRole.Moderator) || request.user.payload.id === id;
    // return !(request.user.payload.id !== id && (!roles.includes(UserRole.Admin) && !roles.includes(UserRole.Moderator)));
  }
}
