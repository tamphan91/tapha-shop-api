import { Controller, UseGuards } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { CrudController, Crud, ParsedRequest, ParsedBody, CrudRequest, Override, CreateManyDto } from '@nestjsx/crud';
import { Address } from './address.entity';
import { AddressService } from './address.service';
import { UserRole } from '../common/constants';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../guard/roles.guard';
import { Roles } from '../decorator/custom.decorator';
import { PermissionsGuard } from '../guard/permissions.guard';

@Crud({
    model: {
        type: Address,
    },
    query: {
        join: {
            profile: {
                eager: false,
            },
        },
    },
    routes: {
        exclude: ['deleteOneBase', 'updateOneBase'],
    },
})
@ApiUseTags('addresses')
@Controller('addresses')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard, PermissionsGuard)
export class AddressController implements CrudController<Address> {
    constructor(public service: AddressService) { }

    get base(): CrudController<Address> {
        return this;
    }

    @Roles(UserRole.Moderator)
    // @UseGuards(AuthGuard('jwt'), RolesGuard, PermissionsGuard)
    @Override('getManyBase')
    getAddresses(
        @ParsedRequest() req: CrudRequest,
    ) {
        return this.base.getManyBase(req);
    }

    // @UseGuards(AuthGuard('jwt'), RolesGuard, PermissionsGuard)
    @Override('createManyBase')
    createAddresses(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: CreateManyDto<Address>,
    ) {
        return this.base.createManyBase(req, dto);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(UserRole.User, UserRole.Moderator)
    @Override()
    createOne(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: Address,
    ) {
        return this.base.createOneBase(req, dto);
    }

    @Roles(UserRole.User, UserRole.Moderator)
    // @UseGuards(AuthGuard('jwt'), RolesGuard, PermissionsGuard)
    @Override('getOneBase')
    getAddress(
        @ParsedRequest() req: CrudRequest,
    ) {
        return this.base.getOneBase(req);
    }

    // @Roles(UserRole.User, UserRole.Moderator)
    // @UseGuards(AuthGuard('jwt'), RolesGuard, PermissionsGuard)
    // @Override('updateOneBase')
    // updateAddress(
    //     @ParsedRequest() req: CrudRequest,
    //     @ParsedBody() dto: Address,
    // ) {
    //     return this.base.updateOneBase(req, dto);
    // }

    @Roles(UserRole.User, UserRole.Moderator)
    // @UseGuards(AuthGuard('jwt'), RolesGuard, PermissionsGuard)
    @Override('replaceOneBase')
    replaceAddress(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: Address,
    ) {
        return this.base.updateOneBase(req, dto);
    }
}
