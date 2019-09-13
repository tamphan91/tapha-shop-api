import { Base } from '../common/base.entity';
import { Entity, Column, ManyToOne, OneToMany, JoinColumn, OneToOne } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { Gender } from '../common/constants';
import { Category } from '../category/category.entity';
import { ProductDetail } from '../product_detail/productDetail.entity';

@Entity()
export class Product extends Base {
    @ApiModelProperty({ example: 'Hollister Epic Flex Super Skinny Jeans', description: 'Name of product' })
    @Column()
    name: string;

    @ApiModelProperty({ example: 44, description: 'Original price of product' })
    @Column()
    originalPrice: number;

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

    @ApiModelProperty({ example: 1, description: 'The categoryId of the Product' })// validate childrenCategory of this category is null - todo
    @IsNumber()
    categoryId: number;

    @OneToMany(type => ProductDetail, detail => detail.product)
    @JoinColumn()
    details: ProductDetail[];
}
