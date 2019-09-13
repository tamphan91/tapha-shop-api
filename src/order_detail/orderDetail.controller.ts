import { Controller, UseGuards } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { CrudController, Crud, ParsedRequest, ParsedBody, CrudRequest, Override, CreateManyDto } from '@nestjsx/crud';
import { OrderDetail } from './orderDetail.entity';
import { OrderDetailService } from './orderDetail.service';
import { UserRole } from '../common/constants';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../guard/roles.guard';
import { Roles } from '../decorator/custom.decorator';
import { PermissionsGuard } from '../guard/permissions.guard';
import { getRepository } from 'typeorm';
import { Stock } from '../stock/stock.entity';
import { async } from 'rxjs/internal/scheduler/async';

@Crud({
    model: {
        type: OrderDetail,
    },
    query: {
        join: {
            stock: {
                eager: false,
            },
            order: {
                eager: false,
            },
        },
    },
    routes: {
        exclude: ['deleteOneBase', 'updateOneBase', 'createManyBase'],
    },
})
@ApiUseTags('order-details')
@Controller('order-details')
@Roles(UserRole.Admin)
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard, PermissionsGuard)
export class OrderDetailController implements CrudController<OrderDetail> {
    constructor(public service: OrderDetailService) { }

    get base(): CrudController<OrderDetail> {
        return this;
    }

    // @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Override('createManyBase')
    createOrderDetails(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: CreateManyDto<OrderDetail>,
    ) {
        return this.base.createManyBase(req, dto);
    }

    // @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(UserRole.User)
    @Override()
    async createOne(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: OrderDetail,
    ) {
        const stock = await getRepository(Stock).findOne({id: dto.stockId}, {relations: ['productDetail', 'productDetail.product']});
        dto.amount = stock.productDetail.product.originalPrice;
        dto.discount = stock.productDetail.discountPercent;
        return this.base.createOneBase(req, dto);
    }

    // @UseGuards(AuthGuard('jwt'), RolesGuard)
    // @Override('updateOneBase')
    // updateOrderDetail(
    //     @ParsedRequest() req: CrudRequest,
    //     @ParsedBody() dto: OrderDetail,
    // ) {
    //     return this.base.updateOneBase(req, dto);
    // }

    // @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(UserRole.User)
    @Override('replaceOneBase')
    async replaceOrderDetail(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: OrderDetail,
    ) {
        const stock = await getRepository(Stock).findOne({id: dto.stockId}, {relations: ['productDetail', 'productDetail.product']});
        dto.amount = stock.productDetail.product.originalPrice;
        dto.discount = stock.productDetail.discountPercent;
        return this.base.updateOneBase(req, dto);
    }
}
