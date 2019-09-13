import { Controller, UseGuards } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { CrudController, Crud, ParsedRequest, ParsedBody, CrudRequest, Override, CreateManyDto } from '@nestjsx/crud';
import { Order } from './order.entity';
import { OrderService } from './order.service';
import { UserRole } from '../common/constants';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../guard/roles.guard';
import { Roles } from '../decorator/custom.decorator';

@Crud({
    model: {
        type: Order,
    },
    query: {
        join: {
            profile: {
                eager: false,
            },
            productDetail: {
                eager: false,
            },
            address: {
                eager: false,
            },
            orderDetails: {
                eager: false,
            },
        },
    },
    routes: {
        exclude: ['deleteOneBase', 'updateOneBase'],
    },
})
@ApiUseTags('orders')
@Controller('orders')
@Roles(UserRole.Admin, UserRole.Moderator)
@ApiBearerAuth()
export class OrderController implements CrudController<Order> {
    constructor(public service: OrderService) { }

    get base(): CrudController<Order> {
        return this;
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Override('createManyBase')
    createCategories(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: CreateManyDto<Order>,
    ) {
        return this.base.createManyBase(req, dto);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Override()
    createOne(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: Order,
    ) {
        return this.base.createOneBase(req, dto);
    }

    // @UseGuards(AuthGuard('jwt'), RolesGuard)
    // @Override('updateOneBase')
    // updateOrder(
    //     @ParsedRequest() req: CrudRequest,
    //     @ParsedBody() dto: Order,
    // ) {
    //     return this.base.updateOneBase(req, dto);
    // }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Override('replaceOneBase')
    replaceOrder(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: Order,
    ) {
        return this.base.updateOneBase(req, dto);
    }
}
