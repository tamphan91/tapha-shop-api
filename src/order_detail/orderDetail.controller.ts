import { Controller, UseGuards } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { CrudController, Crud, ParsedRequest, ParsedBody, CrudRequest, Override, CreateManyDto } from '@nestjsx/crud';
import { OrderDetail } from './orderDetail.entity';
import { OrderDetailService } from './orderDetail.service';
import { UserRole } from '../common/constants';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../guard/roles.guard';
import { Roles } from '../decorator/custom.decorator';

@Crud({
    model: {
        type: OrderDetail,
    },
    query: {
        join: {
            stock: {
                eager: false,
            },
            purchase: {
                eager: false,
            },
        },
    },
    routes: {
        exclude: ['deleteOneBase', 'updateOneBase'],
    },
})
@ApiUseTags('order-details')
@Controller('order-details')
@Roles(UserRole.Admin, UserRole.Moderator)
@ApiBearerAuth()
export class OrderDetailController implements CrudController<OrderDetail> {
    constructor(public service: OrderDetailService) { }

    get base(): CrudController<OrderDetail> {
        return this;
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Override('createManyBase')
    createCategories(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: CreateManyDto<OrderDetail>,
    ) {
        return this.base.createManyBase(req, dto);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Override()
    createOne(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: OrderDetail,
    ) {
        return this.base.createOneBase(req, dto);
    }

    // @UseGuards(AuthGuard('jwt'), RolesGuard)
    // @Override('updateOneBase')
    // updatePurchase(
    //     @ParsedRequest() req: CrudRequest,
    //     @ParsedBody() dto: OrderDetail,
    // ) {
    //     return this.base.updateOneBase(req, dto);
    // }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Override('replaceOneBase')
    replacePurchase(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: OrderDetail,
    ) {
        return this.base.updateOneBase(req, dto);
    }
}
