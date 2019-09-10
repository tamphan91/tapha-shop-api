import { Base } from '../common/base.entity';
import { Entity, Column, ManyToOne, OneToMany, JoinColumn, OneToOne } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { Gender } from '../common/constants';
import { Category } from '../category/category.entity';
import { Detail } from '../detail/detail.entity';

@Entity()
export class Product extends Base {
    @ApiModelProperty({ example: 'Jean', description: 'Jean' })
    @Column()
    name: string;

    @ApiModelProperty({ example: 'Jean', description: 'Jean' })
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

    @ApiModelProperty({ example: 5, description: 'The categoryId of the Product' })
    @IsNumber()
    categoryId: number;

    @OneToMany(type => Detail, category => category.product)
    @JoinColumn()
    details: Detail[];
}
