import { Controller, UseGuards, BadRequestException } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { CrudController, Crud, ParsedRequest, ParsedBody, CrudRequest, Override, CreateManyDto } from '@nestjsx/crud';
import { Order } from './order.entity';
import { OrderService } from './order.service';
import { UserRole } from '../common/constants';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../guard/roles.guard';
import { Roles } from '../decorator/custom.decorator';
import { PermissionsGuard } from '../guard/permissions.guard';
import {getRepository} from 'typeorm';
import { Profile } from '../profile/profile.entity';

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
@Roles(UserRole.Admin)
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard, PermissionsGuard)
export class OrderController implements CrudController<Order> {
    constructor(public service: OrderService) { }

    get base(): CrudController<Order> {
        return this;
    }

    // @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Override('createManyBase')
    createOrders(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: CreateManyDto<Order>,
    ) {
        return this.base.createManyBase(req, dto);
    }

    // @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(UserRole.User, UserRole.Moderator)
    @Override()
    async createOne(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: Order,
    ) {
        const profile = await getRepository(Profile).findOne(dto.profileId, {relations: ['addresses']});
        if (!profile.addresses.some(p => p.id === dto.addressId)) {
            throw new BadRequestException(`AddressId with value ${dto.addressId} is invalid`);
        }
        return this.base.createOneBase(req, dto);
    }

    // @UseGuards(AuthGuard('jwt'), RolesGuard, PermissionsGuard)
    @ApiBearerAuth()
    @Override('getOneBase')
    @Roles(UserRole.User, UserRole.Moderator)
    getUser(
        @ParsedRequest() req: CrudRequest,
    ) {
        return this.base.getOneBase(req);
    }

    // @UseGuards(AuthGuard('jwt'), RolesGuard)
    // @Override('updateOneBase')
    // updateOrder(
    //     @ParsedRequest() req: CrudRequest,
    //     @ParsedBody() dto: Order,
    // ) {
    //     return this.base.updateOneBase(req, dto);
    // }

    // @UseGuards(AuthGuard('jwt'), RolesGuard, PermissionsGuard)
    @Roles(UserRole.Moderator)
    @Override('replaceOneBase')
    async replaceOrder(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: Order,
    ) {
        const profile = await getRepository(Profile).findOne(dto.profileId, {relations: ['addresses']});
        if (!profile.addresses.some(p => p.id === dto.addressId)) {
            throw new BadRequestException(`AddressId with value ${dto.addressId} is invalid`);
        }
        return this.base.updateOneBase(req, dto);
    }
}
