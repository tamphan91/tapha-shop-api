import { Controller, UseGuards, Post, UseInterceptors, Param, UploadedFile, NotFoundException } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth, ApiOperation, ApiImplicitFile, ApiImplicitParam } from '@nestjs/swagger';
import { CrudController, Crud, ParsedRequest, ParsedBody, CrudRequest, Override, CreateManyDto } from '@nestjsx/crud';
import { Swatch } from './swatch.entity';
import { SwatchService } from './swatch.service';
import { UserRole } from '../common/constants';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../guard/roles.guard';
import { Roles } from '../decorator/custom.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { getFileNameFromPath, cloudinaryV2, deleteFile } from '../common/helper';

@Crud({
    model: {
        type: Swatch,
    },
    query: {
        join: {
            productDetails: {
                eager: false,
            },
        },
    },
    routes: {
        exclude: ['deleteOneBase', 'updateOneBase'],
    },
})
@ApiUseTags('swatches')
@Controller('swatches')
@Roles(UserRole.Admin, UserRole.Moderator)
export class SwatchController implements CrudController<Swatch> {
    constructor(public service: SwatchService) { }

    get base(): CrudController<Swatch> {
        return this;
    }

    @Post(':id/updatePhoto')
    @ApiOperation({ description: 'Update Swatch photo by profileId', title: 'Update Swatch photo' })
    @UseGuards(AuthGuard('jwt'), RolesGuard)
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
    @ApiImplicitFile({ name: 'file', required: true, description: 'Photo of Swatch' })
    @ApiImplicitParam({ name: 'id', required: true, description: 'Id of Swatch' })
    async uploadPhoto(@Param('id') swatchId, @UploadedFile() file) {
        const swatch = await this.service.findOne(swatchId);
        if (!swatch) {
            deleteFile(file.path);
            throw new NotFoundException('Category with id ' + swatchId);
        }
        if (swatch.image) {
            cloudinaryV2.uploader.destroy(getFileNameFromPath(swatch.image));
        }
        const result = await cloudinaryV2.uploader.upload(file.path);
        deleteFile(file.path);
        swatch.image = result.secure_url;
        swatch.save();
        return result.secure_url;
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBearerAuth()
    @Override('createManyBase')
    createCategories(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: CreateManyDto<Swatch>,
    ) {
        return this.base.createManyBase(req, dto);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBearerAuth()
    @Override()
    createOne(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: Swatch,
    ) {
        return this.base.createOneBase(req, dto);
    }

    // @UseGuards(AuthGuard('jwt'), RolesGuard)
    // @ApiBearerAuth()
    // @Override('updateOneBase')
    // updateSwatch(
    //     @ParsedRequest() req: CrudRequest,
    //     @ParsedBody() dto: Swatch,
    // ) {
    //     return this.base.updateOneBase(req, dto);
    // }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBearerAuth()
    @Override('replaceOneBase')
    replaceSwatch(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: Swatch,
    ) {
        return this.base.updateOneBase(req, dto);
    }
}
