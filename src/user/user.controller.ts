import { UserService } from './user.service';
import { User } from './user.entity';
import { Controller, UseGuards, ClassSerializerInterceptor, UseInterceptors, Body } from '@nestjs/common';
import { Crud, CrudController, Override, CrudRequest, ParsedRequest, ParsedBody } from '@nestjsx/crud';
import { ApiUseTags, ApiBearerAuth, ApiResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { Roles } from '../decorator/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../guard/roles.guard';
import { UserRole } from '../common/constants';
import { UpdateUserDTO } from './update-user.dto';

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
        exclude: ['deleteOneBase'],
        getManyBase: {
            decorators: [
                UseGuards(AuthGuard('jwt'), RolesGuard),
                ApiBearerAuth(), Roles(UserRole.Admin, UserRole.Moderator),
            ],
            // interceptors: [ClassSerializerInterceptor],
        },
        createManyBase: {
            decorators: [
                UseGuards(AuthGuard('jwt'), RolesGuard),
                ApiBearerAuth(), Roles(UserRole.Admin),
            ],
        },
        // getOneBase: {
        //     decorators: [
        //         UseGuards(AuthGuard('jwt'), RolesGuard),
        //         ApiBearerAuth(), Roles(UserRole.Moderator, UserRole.User),
        //     ],
        // },
        // updateOneBase: {
        //     decorators: [
        //         UseGuards(AuthGuard('jwt'), RolesGuard),
        //         ApiBearerAuth(), Roles(UserRole.Moderator, UserRole.User),
        //     ],
        // },
        // replaceOneBase: {
        //     decorators: [
        //         UseGuards(AuthGuard('jwt'), RolesGuard),
        //         ApiBearerAuth(), Roles(UserRole.Moderator, UserRole.User),
        //     ],
        // },
    },
})
@ApiUseTags('user')
@Controller('user')
// @UseInterceptors(ClassSerializerInterceptor)
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(UserRole.Admin, UserRole.Moderator, UserRole.User)
export class UserController implements CrudController<User> {
    constructor(public service: UserService) { }

    get base(): CrudController<User> {
        return this;
    }

    @Override('updateOneBase')
    updateUser(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: UpdateUserDTO,
    ) {
        // tslint:disable-next-line:no-console
        console.log('updateOneBase', dto);
        return this.base.updateOneBase(req, Object.assign(new User(), dto));
    }

    @Override('replaceOneBase')
    replaceUser(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: UpdateUserDTO,
    ) {
        return this.base.replaceOneBase(req, Object.assign(new User(), dto));
    }
}
