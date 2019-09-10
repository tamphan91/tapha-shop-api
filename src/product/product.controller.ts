import { Controller, UseGuards } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { CrudController, Crud, ParsedRequest, ParsedBody, CrudRequest, Override, CreateManyDto } from '@nestjsx/crud';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import { UserRole } from '../common/constants';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../guard/roles.guard';
import { Roles } from '../decorator/custom.decorator';

@Crud({
    model: {
        type: Product,
    },
    query: {
        join: {
            category: {
                eager: false,
            },
            details: {
                eager: false,
            },
        },
    },
    routes: {
        exclude: ['deleteOneBase'],
    },
})
@ApiUseTags('products')
@Controller('products')
@Roles(UserRole.Admin, UserRole.Moderator)
export class ProductController implements CrudController<Product> {
    constructor(public service: ProductService) { }

    get base(): CrudController<Product> {
        return this;
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBearerAuth()
    @Override('createManyBase')
    createProducts(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: CreateManyDto<Product>,
    ) {
        return this.base.createManyBase(req, dto);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBearerAuth()
    @Override()
    createOne(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: Product,
    ) {
        return this.base.createOneBase(req, dto);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBearerAuth()
    @Override('updateOneBase')
    updateProduct(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: Product,
    ) {
        return this.base.updateOneBase(req, dto);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBearerAuth()
    @Override('replaceOneBase')
    replaceProduct(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: Product,
    ) {
        return this.base.updateOneBase(req, dto);
    }
}
