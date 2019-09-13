import { Controller, UseGuards } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { CrudController, Crud, ParsedRequest, ParsedBody, CrudRequest, Override, CreateManyDto } from '@nestjsx/crud';
import { Stock } from './stock.entity';
import { StockService } from './stock.service';
import { UserRole } from '../common/constants';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../guard/roles.guard';
import { Roles } from '../decorator/custom.decorator';

@Crud({
    model: {
        type: Stock,
    },
    query: {
        join: {
            productDetail: {
                eager: false,
            },
            purchaseDetails: {
                eager: false,
            },
        },
    },
    routes: {
        exclude: ['deleteOneBase', 'updateOneBase'],
    },
})
@ApiUseTags('stocks')
@Controller('stocks')
@Roles(UserRole.Admin, UserRole.Moderator)
export class StockController implements CrudController<Stock> {
    constructor(public service: StockService) { }

    get base(): CrudController<Stock> {
        return this;
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBearerAuth()
    @Override('createManyBase')
    createCategories(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: CreateManyDto<Stock>,
    ) {
        return this.base.createManyBase(req, dto);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBearerAuth()
    @Override()
    createOne(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: Stock,
    ) {
        return this.base.createOneBase(req, dto);
    }

    // @UseGuards(AuthGuard('jwt'), RolesGuard)
    // @ApiBearerAuth()
    // @Override('updateOneBase')
    // updateStock(
    //     @ParsedRequest() req: CrudRequest,
    //     @ParsedBody() dto: Stock,
    // ) {
    //     return this.base.updateOneBase(req, dto);
    // }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBearerAuth()
    @Override('replaceOneBase')
    replaceStock(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: Stock,
    ) {
        return this.base.updateOneBase(req, dto);
    }
}
