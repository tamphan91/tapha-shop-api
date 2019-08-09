import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { RoleToUser } from './role_user.entity';
import { RoleToUserService } from './role_user.service';
import { ApiUseTags } from '@nestjs/swagger';

@Crud({
    model: {
        type: RoleToUser,
    },
})
@ApiUseTags('role_to_user')
@Controller('role_to_user')
export class RoleToUserController {
    constructor(public service: RoleToUserService) {
    }
}
