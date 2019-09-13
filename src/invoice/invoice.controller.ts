import { Controller, UseGuards } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { CrudController, Crud, ParsedRequest, ParsedBody, CrudRequest, Override, CreateManyDto } from '@nestjsx/crud';
import { Invoice } from './invoice.entity';
import { InvoiceService } from './invoice.service';
import { UserRole } from '../common/constants';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../guard/roles.guard';
import { Roles } from '../decorator/custom.decorator';
import { PermissionsGuard } from '../guard/permissions.guard';

@Crud({
    model: {
        type: Invoice,
    },
    query: {
        join: {
            productDetail: {
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
@ApiUseTags('invoices')
@Controller('invoices')
@Roles(UserRole.Admin)
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard, PermissionsGuard)
export class InvoiceController implements CrudController<Invoice> {
    constructor(public service: InvoiceService) { }

    get base(): CrudController<Invoice> {
        return this;
    }

    // @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Override('createManyBase')
    createCategories(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: CreateManyDto<Invoice>,
    ) {
        return this.base.createManyBase(req, dto);
    }

    // @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Override()
    createOne(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: Invoice,
    ) {
        return this.base.createOneBase(req, dto);
    }

    // @UseGuards(AuthGuard('jwt'), RolesGuard)
    // @ApiBearerAuth()
    // @Override('updateOneBase')
    // updateInvoice(
    //     @ParsedRequest() req: CrudRequest,
    //     @ParsedBody() dto: Invoice,
    // ) {
    //     return this.base.updateOneBase(req, dto);
    // }

    // @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Override('replaceOneBase')
    replaceInvoice(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: Invoice,
    ) {
        return this.base.updateOneBase(req, dto);
    }
}
