import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UserRole } from '../common/constants';
import { getRepository } from 'typeorm';
import { Profile } from '../profile/profile.entity';

@Injectable()
export class PermissionsGuard implements CanActivate {
  // constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    // const id = parseInt(request.params.id, null);
    const roles = request.user.payload.profile.roles;
    return roles.includes(UserRole.Admin) || roles.includes(UserRole.Moderator) || await this.hasPermission(request);
    // return !(request.user.payload.id !== id && (!roles.includes(UserRole.Admin) && !roles.includes(UserRole.Moderator)));
  }

  async hasPermission(request: any) {
    const id = parseInt(request.params.id, null);
    if (request.originalUrl.indexOf('/user/') === 0) {
      return request.user.payload.id === id;
    } else if (request.originalUrl.indexOf('/profile/') === 0) {
      return request.user.payload.profile.id === id;
      // return await getRepository(Profile).findOne(id);
    } else {
      return null;
    }
  }
}
