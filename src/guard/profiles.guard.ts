import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UserRole } from '../common/constants';

@Injectable()
export class ProfilesGuard implements CanActivate {
    // constructor(private readonly reflector: Reflector) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const roles = request.user.payload.profile.roles;
        if (request.body.roles && request.body.roles.length > 0) {
            if (!roles.includes(UserRole.Admin) && !roles.includes(UserRole.Moderator)) {
                request.body.roles = [UserRole.User];
            } else {
                if (!roles.includes(UserRole.Admin)) {
                    const index = request.body.roles.indexOf(UserRole.Admin);
                    if (index > -1) {
                        request.body.roles.splice(index, 1);
                    }
                }
            }
        }
        return true;
    }
}
