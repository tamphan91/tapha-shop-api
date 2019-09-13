import { Controller, UseGuards, Post, UseInterceptors, Param, UploadedFiles, NotFoundException, BadRequestException, Body } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth, ApiOperation, ApiImplicitFile, ApiImplicitParam, ApiConsumes } from '@nestjs/swagger';
import { CrudController, Crud, ParsedRequest, ParsedBody, CrudRequest, Override, CreateManyDto } from '@nestjsx/crud';
import { ProductDetail } from './productDetail.entity';
import { ProductDetailService } from './productDetail.service';
import { UserRole, ProductStatus } from '../common/constants';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../guard/roles.guard';
import { Roles } from '../decorator/custom.decorator';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { getFileNameFromPath, cloudinaryV2, deleteFile } from '../common/helper';

@Crud({
    model: {
        type: ProductDetail,
    },
    query: {
        join: {
            product: {
                eager: false,
            },
            stocks: {
                eager: false,
            },
            orders: {
                eager: false,
            },
            swatch: {
                eager: false,
            },
        },
    },
    routes: {
        exclude: ['deleteOneBase', 'updateOneBase'],
    },
})
@ApiUseTags('product-details')
@Controller('product-details')
@Roles(UserRole.Admin, UserRole.Moderator)
export class ProductDetailController implements CrudController<ProductDetail> {
    constructor(public service: ProductDetailService) { }

    get base(): CrudController<ProductDetail> {
        return this;
    }

    @Post(':id/updatePhoto')
    @ApiOperation({ description: 'Update Swatch photo by profileId', title: 'Update Swatch photo' })
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBearerAuth()
    @UseInterceptors(AnyFilesInterceptor({
        storage: diskStorage({
            destination: './photos',
            filename: (req, file, cb) => {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                return cb(null, `${randomName}${extname(file.originalname)}`);
            },
        }),
    }))
    // @ApiConsumes('multipart/form-data')
    @ApiImplicitFile({ name: '5', description: 'The sixth photo of product detail' })
    @ApiImplicitFile({ name: '4', description: 'The fifth photo of product detail' })
    @ApiImplicitFile({ name: '3', description: 'The fourth photo of product detail' })
    @ApiImplicitFile({ name: '2', description: 'The third photo of product detail' })
    @ApiImplicitFile({ name: '1', description: 'The second photo of product detail' })
    @ApiImplicitFile({ name: '0', description: 'The first photo of product detail' })
    @ApiImplicitParam({ name: 'id', required: true, description: 'Id of Product Detail' })
    async uploadPhoto(@Param('id') ProductDetailId, @UploadedFiles() files) {
        if (!files) {
            throw new BadRequestException('Must be have at least 1 file');
        }
        const productDetail = await this.service.findOne(ProductDetailId);
        if (!productDetail) {
            files.forEach(file => {
                deleteFile(file.path);
            });
            throw new NotFoundException('Product detail with id ' + ProductDetailId);
        } else {
            if (productDetail.images) {
                await Promise.all(files.map(async (file) => {
                    const result = await cloudinaryV2.uploader.upload(file.path);
                    const position = parseInt(file.fieldname, null);
                    deleteFile(file.path);
                    if (productDetail.images[position]) {
                        cloudinaryV2.uploader.destroy(getFileNameFromPath(productDetail.images[position]));
                    }
                    productDetail.images[position] = result.secure_url;
                }));
            } else {
                productDetail.images = [];
                await Promise.all(files.map(async (file) => {
                    const result = await cloudinaryV2.uploader.upload(file.path);
                    deleteFile(file.path);
                    productDetail.images.push(result.secure_url);
                }));
            }
            productDetail.save();
            return productDetail.images;
        }
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBearerAuth()
    @Override('createManyBase')
    createCategories(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: CreateManyDto<ProductDetail>,
    ) {
        return this.base.createManyBase(req, dto);
    }

    // @UseGuards(AuthGuard('jwt'), RolesGuard)
    // @ApiBearerAuth()
    @UseInterceptors(AnyFilesInterceptor({
        storage: diskStorage({
            destination: './photos',
            filename: (req, file, cb) => {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                return cb(null, `${randomName}${extname(file.originalname)}`);
            },
        }),
    }))
    @ApiConsumes('multipart/form-data')
    @ApiImplicitFile({ name: '5', description: 'The sixth photo of product detail' })
    @ApiImplicitFile({ name: '4', description: 'The fifth photo of product detail' })
    @ApiImplicitFile({ name: '3', description: 'The fourth photo of product detail' })
    @ApiImplicitFile({ name: '2', required: true, description: 'The third photo of product detail' })
    @ApiImplicitFile({ name: '1', required: true, description: 'The second photo of product detail' })
    @ApiImplicitFile({ name: '0', required: true, description: 'The first photo of product detail' })
    @ApiOperation({ description: 'Create one ProductDetail in FormData', title: 'Create one ProductDetail in FormData' })
    @Post('test')
    createProductDetail(
        @Body() dto: ProductDetail,
        @UploadedFiles() files,
    ) {
        files.forEach(file => {
            deleteFile(file.path);
        });
        dto.status = (dto.status + '').split(',').map( d => ProductStatus[d]);
        dto.productId = Number(dto.productId);
        return {dto, files};
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBearerAuth()
    @Override()
    createOne(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: ProductDetail,
    ) {
        return this.base.createOneBase(req, dto);
    }

    // @UseGuards(AuthGuard('jwt'), RolesGuard)
    // @ApiBearerAuth()
    // @Override('updateOneBase')
    // updateSwatch(
    //     @ParsedRequest() req: CrudRequest,
    //     @ParsedBody() dto: ProductDetail,
    // ) {
    //     return this.base.updateOneBase(req, dto);
    // }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBearerAuth()
    @Override('replaceOneBase')
    replaceSwatch(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: ProductDetail,
    ) {
        return this.base.updateOneBase(req, dto);
    }
}
