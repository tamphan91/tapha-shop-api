import { Base } from '../common/base.entity';
import { Entity, Column, ManyToOne, OneToMany, JoinColumn, Index } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { Gender, Currency } from '../common/constants';
import { Category } from '../category/category.entity';
import { ProductDetail } from '../product_detail/productDetail.entity';
import { CheckCategory } from '../validator/CheckCategory.validator';

@Entity()
@Index(['name', 'gender'], {unique: true})
export class Product extends Base {
    @ApiModelProperty({ example: 'Hollister Epic Flex Super Skinny Jeans', description: 'Name of product' })
    @Column()
    name: string;

    @ApiModelProperty({ example: 44, description: 'Original price of product' })
    @Column()
    originalPrice: number;

    @ApiModelProperty({ example: Currency.USD, description: 'Currency of product' })
    @Column({
        type: 'enum',
        enum: Currency,
    })
    currency: Currency;

    @Column({
        type: 'enum',
        enum: Gender,
    })
    @IsString()
    @ApiModelProperty({ enum: Object.keys(Gender) })
    gender: Gender;

    @ManyToOne(type => Category, category => category.products)
    @JoinColumn()
    category: Category;

    @CheckCategory({message: 'Cannot choose this category'})
    @ApiModelProperty({ example: 1, description: 'The categoryId of the Product' })
    @IsNumber()
    categoryId: number;

    @OneToMany(type => ProductDetail, detail => detail.product)
    @JoinColumn()
    details: ProductDetail[];
}
