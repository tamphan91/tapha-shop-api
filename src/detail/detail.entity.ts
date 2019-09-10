import { Base } from '../common/base.entity';
import { Entity, Column, ManyToOne} from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { ProductStatus, Discount } from '../common/constants';
import { IsOptional } from 'class-validator';
import { Product } from '../product/product.entity';

@Entity()
export class Detail extends Base {
    @ApiModelProperty({ example: ['url1', 'url2', 'url3'], description: 'The urls of details' })
    @Column('simple-array')
    images: string[];

    @Column({
        type: 'enum',
        enum: ProductStatus,
        default: [ProductStatus.New],
        array: true,
    })
    @ApiModelProperty({ enum: ProductStatus, example: ProductStatus.New })
    status: ProductStatus[];

    @Column({
        type: 'enum',
        enum: Discount,
        nullable: true,
    })
    @IsOptional()
    @ApiModelProperty({ enum: Discount, example: Discount.SALE10 })
    discountPercent: Discount;

    @ApiModelProperty({ example: 'details', description: 'details' })
    @Column()
    details: string;

    @ApiModelProperty({ example: 'shortDescription', description: 'shortDescription' })
    @Column()
    shortDescription: string;

    @ApiModelProperty({ example: 'materialAndCare', description: 'materialAndCare' })
    @Column()
    materialAndCare: string;

    @ManyToOne(type => Product, product => product.details, {nullable: true})
    product: Product;
}
