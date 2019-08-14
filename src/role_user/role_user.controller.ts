import { Controller, UseGuards } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { RoleToUser } from './role_user.entity';
import { RoleToUserService } from './role_user.service';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Crud({
    model: {
        type: RoleToUser,
    },
    query: {
        join: {
            role: {
                eager: false,
            },
            user: {
                eager: false,
            },
        },
    },
})
@ApiUseTags('roleToUser')
@Controller('roleToUser')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class RoleToUserController {
    constructor(public service: RoleToUserService) {
    }
}
