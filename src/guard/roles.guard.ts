import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles1 = this.reflector.get<string[]>('roles', context.getClass());
    const roles2 = this.reflector.get<string[]>('roles', context.getHandler());
    const roles = roles1 ? (roles2 ? roles1.concat(roles2) : roles1) : roles2;
    // const roles = roles2 ? roles2 : roles1;
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const hasRole = () => user.payload.profile.roles.some((role) => roles.includes(role));
    return (user && user.payload.profile.roles && hasRole());
  }
}
