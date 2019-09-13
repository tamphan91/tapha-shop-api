// tslint:disable-next-line:max-line-length
import { Controller, UseGuards, UseInterceptors, ClassSerializerInterceptor, Post, UploadedFile, Param, Body, Inject, Get, Req, NotFoundException } from '@nestjs/common';
// tslint:disable-next-line:max-line-length
import { ApiUseTags, ApiBearerAuth, ApiImplicitFile, ApiImplicitParam, ApiImplicitBody, ApiOperation, ApiResponse, ApiImplicitQuery, ApiConsumes } from '@nestjs/swagger';
import { ProfileService } from './profile.service';
import { Crud, CrudController, Override, ParsedRequest, CrudRequest, ParsedBody, CreateManyDto, CrudRequestInterceptor } from '@nestjsx/crud';
import { Profile } from './profile.entity';
import { RolesGuard } from '../guard/roles.guard';
import { Roles } from '../decorator/custom.decorator';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserRole } from '../common/constants';
import { UpdateProfileDTO } from '../profile/update-profile.dto';
import { PermissionsGuard } from '../guard/permissions.guard';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { cloudinaryV2, getFileNameFromPath, deleteFile } from '../common/helper';

@Crud({
    model: {
        type: Profile,
    },
    query: {
        join: {
            user: {
                eager: false,
                exclude: ['password'],
            },
            address: {
                eager: false,
            },
        },
    },
    routes: {
        exclude: ['deleteOneBase', 'updateOneBase'],
    },
})
@ApiUseTags('profiles')
@Controller('profiles')
@Roles(UserRole.Admin)
@UseInterceptors(ClassSerializerInterceptor)
export class ProfileController implements CrudController<Profile> {
    constructor(public service: ProfileService) {
    }

    get base(): CrudController<Profile> {
        return this;
    }

    // @UseInterceptors(CrudRequestInterceptor)
    // @Get('/:id/user')
    // // @ApiResponse({status: 0})
    // // @ApiImplicitParam({name: 'id'})
    // async getDetails(@ParsedRequest() req: CrudRequest, @Param('id') id: number) {
    //     // some awesome feature handling
    //     const result = await this.service.findOne(id, { relations: ['user'] });
    //     return result;
    // }

    // // @UseInterceptors(CrudRequestInterceptor)
    // @Get('/:id/user/:id2')
    // // @ApiImplicitParam({name: 'id'})
    // async getDetail(@ParsedRequest() req: CrudRequest, @Param('id') id: number, @Param('id2') id2: number) {
    //     // some awesome feature handling
    //     return 'id2: ' + id2;
    // }

    // FORM DATA
    // @Post(':id/updateRoles2')
    // @ApiOperation({ description: 'Update user role by profileId', title: 'Update user role (Admin only)' })
    // // @UseGuards(AuthGuard('jwt'), RolesGuard)
    // // @ApiBearerAuth()
    // @ApiImplicitParam({ name: 'id', required: true, description: 'Id of profile' })
    // // @ApiImplicitBody({type: UpdateRoleDTO, name: 'roles'})
    // @ApiConsumes('multipart/form-data')
    // @UseInterceptors(FileInterceptor('file')) // this line helps to get formdata
    // async updateRole2(
    //     // @Body('roles') roles: UserRole[],
    //     @Body() body: UpdateRoleDTO,
    //     @Param('id') profileId,
    //     @ParsedRequest() req,
    // ) {
    //     // tslint:disable-next-line:no-console
    //     console.log('req: ', body.roles);
    //     // await this.service.updateRoles(roles, profileId);
    //     return 'Updated Roles successfully';
    // }

    @Post(':id/updateRoles')
    @ApiOperation({ description: 'Update user role by profileId', title: 'Update user role (Admin only)' })
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBearerAuth()
    @ApiImplicitParam({ name: 'id', required: true, description: 'Id of profile' })
    @ApiImplicitBody({ name: 'roles', type: Object, description: 'Array of UserRole, example: {"roles": ["Admin", "Moderator", "User"]}' })
    async updateRole(
        @Body('roles') roles: UserRole[],
        @Param('id') profileId,
    ) {
        await this.service.updateRoles(roles, profileId);
        return 'Updated Roles successfully';
    }

    @Post(':id/updatePhoto')
    @ApiOperation({ description: 'Update profile photo by profileId', title: 'Update profile photo' })
    @UseGuards(AuthGuard('jwt'), RolesGuard, PermissionsGuard)
    @Roles(UserRole.User, UserRole.Moderator)
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './photos',
            filename: (req, file, cb) => {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                return cb(null, `${randomName}${extname(file.originalname)}`);
            },
        }),
    }))
    @ApiBearerAuth()
    @ApiImplicitFile({ name: 'file', required: true, description: 'Photo of profile' })
    @ApiImplicitParam({ name: 'id', required: true, description: 'Id of profile' })
    async uploadPhoto(@Param('id') profileId, @UploadedFile() file) {
        const profile = await this.service.findOne(profileId);
        if (!profile) {
            deleteFile(file.path);
            throw new NotFoundException('Category with id ' + profileId);
        }
        if (profile.photo) {
            cloudinaryV2.uploader.destroy(getFileNameFromPath(profile.photo));
        }
        const result = await cloudinaryV2.uploader.upload(file.path);
        deleteFile(file.path);
        profile.photo = result.secure_url;
        profile.save();
        // await this.service.updatePhoto(result.secure_url, profileId);
        return result.secure_url;
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

    // @UseGuards(AuthGuard('jwt'), RolesGuard, PermissionsGuard)
    // @ApiBearerAuth()
    // @Override('updateOneBase')
    // @Roles(UserRole.User, UserRole.Moderator)
    // updateProfile(
    //     @ParsedRequest() req: CrudRequest,
    //     @ParsedBody() dto: UpdateProfileDTO,
    // ) {
    //     delete dto.roles;
    //     return this.base.updateOneBase(req, Object.assign(new Profile(), dto));
    // }

    @UseGuards(AuthGuard('jwt'), RolesGuard, PermissionsGuard)
    @ApiBearerAuth()
    @Override('replaceOneBase')
    @Roles(UserRole.User, UserRole.Moderator)
    replaceProfile(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: UpdateProfileDTO,
    ) {
        delete dto.roles;
        return this.base.updateOneBase(req, Object.assign(new Profile(), dto));
    }
}
