import { Base } from '../common/base.entity';
import { Entity, Column, Index, ManyToOne, OneToMany } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { PrimaryTopSize, PrimaryBottomSize, SecondarySize, Gender } from '../common/constants';
import { ProductDetail } from '../product_detail/productDetail.entity';
import { OrderDetail } from '../order_detail/orderDetail.entity';

@Entity()
@Index(['productDetailId', 'primarySize', 'secondarySize', , 'gender'], {unique: true})
export class Stock extends Base {
    @ApiModelProperty({ example: 'blue', description: 'blue' })
    @Column()
    productDetailId: number;

    @Column({
        enum: [PrimaryTopSize, PrimaryBottomSize],
    })
    primarySize: PrimaryTopSize | PrimaryBottomSize;

    @Column({
        enum: SecondarySize,
        nullable: true,
    })
    secondarySize: SecondarySize;

    @Column({
        enum: Gender,
    })
    gender: Gender;

    @Column()
    inStock: number;

    @ManyToOne(type => ProductDetail, productDetail => productDetail.stocks, {nullable: true})
    productDetail: ProductDetail;

    @OneToMany(type => OrderDetail, orderDetail => orderDetail.order, {nullable: true})
    OrderDetails: OrderDetail[];
}
