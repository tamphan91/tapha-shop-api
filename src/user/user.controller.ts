import { UserService } from './user.service';
import { User } from './user.entity';
import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController, Override, CrudRequest, ParsedRequest, ParsedBody, CreateManyDto } from '@nestjsx/crud';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../decorator/custom.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../guard/roles.guard';
import { UserRole } from '../common/constants';
import { UpdateUserDTO } from './update-user.dto';
import { PermissionsGuard } from '../guard/permissions.guard';

@Crud({
    model: {
        type: User,
    },
    query: {
        exclude: ['password'],
        join: {
            profile: {
                eager: false,
            },
        },
    },
    routes: {
        exclude: ['deleteOneBase', 'updateOneBase'],
    },
})
@ApiUseTags('users')
@Controller('users')
@Roles(UserRole.Admin)
export class UserController implements CrudController<User> {
    constructor(public service: UserService) { }

    get base(): CrudController<User> {
        return this;
    }

    @Roles(UserRole.Moderator)
    @UseGuards(AuthGuard('jwt'), RolesGuard, PermissionsGuard)
    @ApiBearerAuth()
    @Override('getManyBase')
    getUsers(
        @ParsedRequest() req: CrudRequest,
    ) {
        return this.base.getManyBase(req);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard, PermissionsGuard)
    @ApiBearerAuth()
    @Override('createManyBase')
    createUsers(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: CreateManyDto<User>,
    ) {
        return this.base.createManyBase(req, dto);
    }

    @Roles(UserRole.User, UserRole.Moderator)
    @UseGuards(AuthGuard('jwt'), RolesGuard, PermissionsGuard)
    @ApiBearerAuth()
    @Override('getOneBase')
    getUser(
        @ParsedRequest() req: CrudRequest,
    ) {
        return this.base.getOneBase(req);
    }

    // @Roles(UserRole.User, UserRole.Moderator)
    // @UseGuards(AuthGuard('jwt'), RolesGuard, PermissionsGuard)
    // @ApiBearerAuth()
    // @Override('updateOneBase')
    // updateUser(
    //     @ParsedRequest() req: CrudRequest,
    //     @ParsedBody() dto: UpdateUserDTO,
    // ) {
    //     return this.base.updateOneBase(req, Object.assign(new User(), dto));
    // }

    @Roles(UserRole.User, UserRole.Moderator)
    @UseGuards(AuthGuard('jwt'), RolesGuard, PermissionsGuard)
    @ApiBearerAuth()
    @Override('replaceOneBase')
    replaceUser(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: UpdateUserDTO,
    ) {
        return this.base.replaceOneBase(req, Object.assign(new User(), dto));
    }
}
