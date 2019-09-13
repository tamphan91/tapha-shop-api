import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UserRole } from '../common/constants';
import { getRepository } from 'typeorm';
import { Profile } from '../profile/profile.entity';
import { Address } from '../address/address.entity';

@Injectable()
export class PermissionsGuard implements CanActivate {
  // constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    // tslint:disable-next-line:no-console
    console.log(request);
    const id = parseInt(request.params.id, null);
    if (!id) {
      return true;
    }
    const roles = request.user.payload.profile.roles;
    return roles.includes(UserRole.Admin) || await this.hasPermission(request, id, roles);
    // return roles.includes(UserRole.Admin) || roles.includes(UserRole.Moderator) || await this.hasPermission(request);
    // return !(request.user.payload.id !== id && (!roles.includes(UserRole.Admin) && !roles.includes(UserRole.Moderator)));
  }

  async hasPermission(request: any, id: number, roles: UserRole[]) {
    let isAllow = false;
    if (request.originalUrl.indexOf('/users/') === 0) {
      isAllow = request.user.payload.id === id;
    } else if (request.originalUrl.indexOf('/profiles/') === 0) {
      if (request.user.payload.profile.id === id) {
        isAllow = true;
      } else {
        const profile = await getRepository(Profile).findOne(id);
        isAllow = !profile.roles.includes(UserRole.Admin) && roles.includes(UserRole.Moderator);
      }
    } else if (request.originalUrl.indexOf('/addresses/') === 0) {
      const address = await getRepository(Address).findOne(id);
      if (request.user.payload.profile.id === address.profileId) {
        isAllow = true;
      } else {
        const profile = await getRepository(Profile).findOne(address.profileId);
        isAllow = !profile.roles.includes(UserRole.Admin) && roles.includes(UserRole.Moderator);
      }
    }
    return isAllow;
  }
}
