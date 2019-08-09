import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { Role } from './role.entity';
import { RoleService } from './role.service';
import { ApiUseTags } from '@nestjs/swagger';

@Crud({
    model: {
        type: Role,
    },
    query: {
        join: {
            roleToUsers: {
                eager: false,
            },
        },
    },
})
@ApiUseTags('roles')
@Controller('role')
export class RoleController {
    constructor(public service: RoleService) {
    }
}
