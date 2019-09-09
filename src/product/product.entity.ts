import { Base } from '../common/base.entity';
import { Entity, Column, ManyToOne, OneToMany, JoinColumn, OneToOne } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Discount, Gender, ProductStatus } from '../common/constants';
import { Category } from '../category/category.entity';

@Entity()
export class Product extends Base {
    @ApiModelProperty({ example: 'Jean', description: 'Jean' })
    @Column()
    name: string;

    @ApiModelProperty({ example: 'Jean', description: 'Jean' })
    @Column()
    originalPrice: number;

    @ApiModelProperty({ example: 'Jean', description: 'Jean' })
    @Column({nullable: true})
    @IsOptional()
    discountPercent: Discount;

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

    @ApiModelProperty({ example: 5, description: 'The categoryId of the Product' })
    @IsNumber()
    categoryId: number;

    @Column({
        type: 'enum',
        enum: ProductStatus,
        default: [ProductStatus.New],
        array: true,
    })
    status: ProductStatus[];

    @ApiModelProperty({ example: ['url1', 'url2', 'url3'], description: 'The urls of product' })
    @Column('simple-array')
    url: string[];
}
