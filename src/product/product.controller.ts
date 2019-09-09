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
    routes: {
        exclude: ['deleteOneBase'],
    },
})
@ApiUseTags('Product')
@Controller('Product')
export class ProductController implements CrudController<Product> {
    constructor(public service: ProductService) { }

    get base(): CrudController<Product> {
        return this;
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBearerAuth()
    @Override('createManyBase')
    @Roles(UserRole.User, UserRole.Moderator)
    createProducts(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: CreateManyDto<Product>,
    ) {
        return this.base.createManyBase(req, dto);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBearerAuth()
    @Roles(UserRole.User, UserRole.Moderator)
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
    @Roles(UserRole.User, UserRole.Moderator)
    updateProduct(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: Product,
    ) {
        return this.base.updateOneBase(req, dto);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBearerAuth()
    @Override('replaceOneBase')
    @Roles(UserRole.Admin, UserRole.Moderator)
    replaceProduct(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: Product,
    ) {
        return this.base.updateOneBase(req, dto);
    }
}
