import { Controller, UseGuards } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { CrudController, Crud, ParsedRequest, ParsedBody, CrudRequest, Override, CreateManyDto } from '@nestjsx/crud';
import { Category } from './category.entity';
import { CategoryService } from './category.service';
import { UserRole } from '../common/constants';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../guard/roles.guard';
import { Roles } from '../decorator/custom.decorator';

@Crud({
    model: {
        type: Category,
    },
    query: {
        join: {
            parentCategory: {
                eager: false,
            },
            childCategories: {
                eager: false,
            },
        },
    },
    routes: {
        exclude: ['deleteOneBase'],
    },
})
@ApiUseTags('category')
@Controller('category')
export class CategoryController implements CrudController<Category> {
    constructor(public service: CategoryService) { }

    get base(): CrudController<Category> {
        return this;
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBearerAuth()
    @Override('createManyBase')
    @Roles(UserRole.User, UserRole.Moderator)
    createCategories(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: CreateManyDto<Category>,
    ) {
        return this.base.createManyBase(req, dto);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBearerAuth()
    @Roles(UserRole.User, UserRole.Moderator)
    @Override()
    createOne(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: Category,
    ) {
        return this.base.createOneBase(req, dto);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBearerAuth()
    @Override('updateOneBase')
    @Roles(UserRole.User, UserRole.Moderator)
    updateCategory(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: Category,
    ) {
        return this.base.updateOneBase(req, dto);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBearerAuth()
    @Override('replaceOneBase')
    @Roles(UserRole.Admin, UserRole.Moderator)
    replaceCategory(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: Category,
    ) {
        return this.base.updateOneBase(req, dto);
    }
}
