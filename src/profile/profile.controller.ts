import { Controller, UseGuards, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { ProfileService } from './profile.service';
import { Crud, CrudController, Override, ParsedRequest, CrudRequest, ParsedBody, CreateManyDto } from '@nestjsx/crud';
import { Profile } from './profile.entity';
import { RolesGuard } from '../guard/roles.guard';
import { Roles } from '../decorator/custom.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UserRole } from '../common/constants';
import { UpdateProfileDTO } from '../profile/update-profile.dto';
import { PermissionsGuard } from '../guard/permissions.guard';
import { ProfilesGuard } from '../guard/profiles.guard';

@Crud({
    model: {
        type: Profile,
    },
    query: {
        join: {
            user: {
                eager: false,
            },
        },
    },
    routes: {
        exclude: ['deleteOneBase'],
    },
})
@ApiUseTags('profile')
@Controller('profile')
@Roles(UserRole.Admin)
@UseInterceptors(ClassSerializerInterceptor)
export class ProfileController implements CrudController<Profile> {
    constructor(public service: ProfileService) {
    }

    get base(): CrudController<Profile> {
        return this;
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard, PermissionsGuard)
    @ApiBearerAuth()
    @Override('getManyBase')
    @Roles(UserRole.Moderator)
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
        @ParsedBody() dto: CreateManyDto<Profile>,
    ) {
        return this.base.createManyBase(req, dto);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard, PermissionsGuard)
    @ApiBearerAuth()
    @Override('getOneBase')
    @Roles(UserRole.User, UserRole.Moderator)
    getUser(
        @ParsedRequest() req: CrudRequest,
    ) {
        return this.base.getOneBase(req);
    }

    @Override()
    createOne(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: Profile,
    ) {
        delete dto.roles;
        return this.base.createOneBase(req, dto);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard, PermissionsGuard, ProfilesGuard)
    @ApiBearerAuth()
    @Override('updateOneBase')
    @Roles(UserRole.User, UserRole.Moderator)
    updateProfile(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: UpdateProfileDTO,
    ) {
        return this.base.updateOneBase(req, Object.assign(new Profile(), dto));
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard, PermissionsGuard, ProfilesGuard)
    @ApiBearerAuth()
    @Override('replaceOneBase')
    @Roles(UserRole.User, UserRole.Moderator)
    replaceProfile(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: UpdateProfileDTO,
    ) {
        return this.base.updateOneBase(req, Object.assign(new Profile(), dto));
    }
}
