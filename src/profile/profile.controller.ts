import { Controller, UseGuards, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { ProfileService } from './profile.service';
import { Crud, CrudController, Override, ParsedRequest, CrudRequest, ParsedBody } from '@nestjsx/crud';
import { Profile } from './profile.entity';
import { RolesGuard } from '../guard/roles.guard';
import { Roles } from '../decorator/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UserRole } from '../common/constants';
import { UpdateProfileDTO } from '../profile/update-profile.dto';

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
        // getManyBase: {
        //     decorators: [UseInterceptors(ClassSerializerInterceptor)],
        // },
        // getOneBase: {
        //     decorators: [UseInterceptors(ClassSerializerInterceptor)],
        // },
    },
})
@ApiUseTags('profile')
@Controller('profile')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(UserRole.Admin, UserRole.Moderator)
@UseInterceptors(ClassSerializerInterceptor)
export class ProfileController implements CrudController<Profile> {
    constructor(public service: ProfileService) {
    }

    get base(): CrudController<Profile> {
        return this;
    }

    @Override('updateOneBase')
    // @TransformPlainToClass(Profile)
    updateProfile(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: UpdateProfileDTO,
    ) {
        // tslint:disable-next-line:no-console
        console.log('dto', dto);
        return this.base.updateOneBase(req, Object.assign(new Profile(null), dto));
    }

    @Override('replaceOneBase')
    // @TransformPlainToClass(Profile)
    replaceProfile(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: UpdateProfileDTO,
    ) {
        // tslint:disable-next-line:no-console
        console.log('dto', dto);
        return this.base.updateOneBase(req, Object.assign(new Profile(null), dto));
    }
}
