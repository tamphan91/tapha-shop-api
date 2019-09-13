import { Controller, UseGuards, Post, UseInterceptors, Param, UploadedFile, NotFoundException } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth, ApiOperation, ApiImplicitFile, ApiImplicitParam } from '@nestjs/swagger';
import { CrudController, Crud, ParsedRequest, ParsedBody, CrudRequest, Override, CreateManyDto } from '@nestjsx/crud';
import { Category } from './category.entity';
import { CategoryService } from './category.service';
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
        type: Category,
    },
    query: {
        join: {
            parentCategory: {
                eager: false,
            },
            childCategories: {
                eager: false,
            },
            products: {
                eager: false,
            },
        },
    },
    routes: {
        exclude: ['deleteOneBase', 'updateOneBase'],
    },
})
@ApiUseTags('categories')
@Controller('categories')
@Roles(UserRole.Admin, UserRole.Moderator)
export class CategoryController implements CrudController<Category> {
    constructor(public service: CategoryService) { }

    get base(): CrudController<Category> {
        return this;
    }

    @Post(':id/updatePhoto')
    @ApiOperation({ description: 'Update category photo by profileId', title: 'Update category photo' })
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
    @ApiImplicitFile({ name: 'file', required: true, description: 'Photo of Category' })
    @ApiImplicitParam({ name: 'id', required: true, description: 'Id of Category' })
    async uploadPhoto(@Param('id') categoryId, @UploadedFile() file) {
        const category = await this.service.findOne(categoryId);
        if (!category) {
            deleteFile(file.path);
            throw new NotFoundException('Category with id ' + categoryId);
        }
        if (category.image) {
            cloudinaryV2.uploader.destroy(getFileNameFromPath(category.image));
        }
        const result = await cloudinaryV2.uploader.upload(file.path);
        deleteFile(file.path);
        category.image = result.secure_url;
        category.save();
        return result.secure_url;
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBearerAuth()
    @Override('createManyBase')
    createCategories(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: CreateManyDto<Category>,
    ) {
        return this.base.createManyBase(req, dto);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBearerAuth()
    @Override()
    createOne(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: Category,
    ) {
        return this.base.createOneBase(req, dto);
    }

    // @UseGuards(AuthGuard('jwt'), RolesGuard)
    // @ApiBearerAuth()
    // @Override('updateOneBase')
    // updateCategory(
    //     @ParsedRequest() req: CrudRequest,
    //     @ParsedBody() dto: Category,
    // ) {
    //     return this.base.updateOneBase(req, dto);
    // }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBearerAuth()
    @Override('replaceOneBase')
    replaceCategory(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: Category,
    ) {
        return this.base.updateOneBase(req, dto);
    }
}
