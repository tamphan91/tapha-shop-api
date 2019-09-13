import { Base } from '../common/base.entity';
import { Entity, Column, ManyToOne, OneToMany} from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { ProductStatus, Discount } from '../common/constants';
import { IsOptional, IsNumber } from 'class-validator';
import { Product } from '../product/product.entity';
import { Stock } from '../stock/stock.entity';
import { Swatch } from '../swatch/swatch.entity';
import { Order } from '../order/order.entity';
import { isNumber } from 'util';

@Entity()
export class ProductDetail extends Base {
    // @ApiModelProperty({ example: ['url1', 'url2', 'url3'], description: 'The urls of detail', isArray: true })
    @Column('simple-array', {nullable: true})
    images: string[];

    @Column({
        type: 'enum',
        enum: ProductStatus,
        default: [ProductStatus.New],
        array: true,
    })
    // tslint:disable-next-line:max-line-length
    @ApiModelProperty({type: String, example: [ProductStatus.New], description: 'Example: Sale,New,Limited. Available values : ' + Object.keys(ProductStatus)})
    status: ProductStatus[];

    @Column({
        type: 'enum',
        enum: Discount,
        nullable: true,
    })
    @IsOptional()
    // tslint:disable-next-line:max-line-length
    @ApiModelProperty({ enum: Object.keys(Discount).filter(key => isNaN(Number(Discount[key]))), example: null, nullable: true, required: false, type: String })
    discountPercent: Discount;

    @ApiModelProperty({ example: 'details', description: 'details' })
    @Column()
    details: string;

    @ApiModelProperty({ example: 'shortDescription', description: 'shortDescription' })
    @Column()
    shortDescription: string;

    // tslint:disable-next-line:max-line-length
    @ApiModelProperty({ example: 'materialAndCare', description: 'materialAndCare'})
    @Column()
    materialAndCare: string;

    @Column()
    @ApiModelProperty({ example: 1, description: 'ProductId of product'})
    productId: number;

    @ManyToOne(type => Product, product => product.details)
    product: Product;

    @OneToMany(type => Stock, stock => stock.productDetail, {nullable: true})
    stocks: Stock[];

    // @OneToMany(type => Order, order => order.productDetail, {nullable: true})
    // orders: Order[];

    @ManyToOne(type => Swatch, swatch => swatch.productDetails, {nullable: true})
    swatch: Swatch;
}
