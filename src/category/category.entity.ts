import { Base } from '../common/base.entity';
import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { Product } from '../product/product.entity';

@Entity()
export class Category extends Base {
    @ApiModelProperty({ example: 'Jean', description: 'Jean' })
    @Column()
    name: string;

    @ApiModelProperty({ example: 'Jean', description: 'Jean' })
    @Column()
    description: string;

    @ApiModelProperty({ example: 'title1', description: 'title1' })
    @Column()
    title1: string;

    @ApiModelProperty({ example: 'title2', description: 'title2' })
    @Column()
    title2: string;

    // @ApiModelProperty({ example: 'url', description: 'url' })
    // @Column()
    @Column('text', {nullable: true})
    image: string;

    @ApiModelProperty({ example: 5, description: 'The parentCategoryId of the Category' })
    @IsNumber()
    @IsOptional()
    @Column({ nullable: true })
    parentCategoryId: number;

    @ManyToOne(type => Category, category => category.childCategories, {nullable: true})
    @JoinColumn()
    parentCategory: Category;

    @OneToMany(type => Category, category => category.parentCategory, {nullable: true})
    childCategories: Category[];

    @OneToMany(type => Product, product => product.category)
    products: Product[];
}
