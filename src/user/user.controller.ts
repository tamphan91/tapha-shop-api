import { UserService } from './user.service';
import { User } from './user.entity';
import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { ApiUseTags } from '@nestjs/swagger';

@Crud({
    model: {
        type: User,
    },
    query: {
        join: {
            roleToUsers: {
                eager: false,
            },
        },
    },
})
@ApiUseTags('user')
@Controller('user')
export class UserController {
    constructor(public service: UserService) {}
}
