import { Base } from '../common/base.entity';
import { Entity, Column, Index, ManyToOne, OneToMany } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { PrimaryTopSize, PrimaryBottomSize, SecondarySize, Gender } from '../common/constants';
import { ProductDetail } from '../product_detail/productDetail.entity';
import { OrderDetail } from '../order_detail/orderDetail.entity';

@Entity()
@Index(['productDetailId', 'primarySize', 'secondarySize'], {unique: true})
export class Stock extends Base {
    @ApiModelProperty({ example: 1, description: 'id of product detail' })
    @Column()
    productDetailId: number;

    @Column({
        type: 'enum',
        enum: Object.values(PrimaryTopSize).concat(Object.values(PrimaryBottomSize)),
    })
    // tslint:disable-next-line:max-line-length
    @ApiModelProperty({ enum:  Object.values(PrimaryTopSize).concat(Object.values(PrimaryBottomSize)), example: PrimaryTopSize.L, description: 'primary size of product detail' })
    primarySize: PrimaryTopSize | PrimaryBottomSize;

    @Column({
        type: 'enum',
        enum: SecondarySize,
        nullable: true,
    })
    @ApiModelProperty({ enum:  SecondarySize, example: null, description: 'primary size of product detail' })
    secondarySize: SecondarySize;

    // @Column({
    //     type: 'enum',
    //     enum: Gender,
    // })
    // @ApiModelProperty({ enum:  Gender, example: Gender.Male, description: 'gender of product detail' })
    // gender: Gender;

    @Column()
    @ApiModelProperty({ example: 10, description: 'The mount of product detail in stock' })
    inStock: number;

    // @ManyToOne(type => ProductDetail, productDetail => productDetail.stocks, {nullable: true})
    @ManyToOne(type => ProductDetail, productDetail => productDetail.stocks)
    productDetail: ProductDetail;

    @OneToMany(type => OrderDetail, orderDetail => orderDetail.order, {nullable: true})
    OrderDetails: OrderDetail[];
}
