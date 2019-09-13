import { Base } from '../common/base.entity';
import { Entity, Column, Index, ManyToOne, OneToMany } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { OrderStatus } from '../common/constants';
import { ProductDetail } from '../product_detail/productDetail.entity';
import { Address } from '../address/address.entity';
import { Profile } from '../profile/profile.entity';
import { OrderDetail } from '../order_detail/orderDetail.entity';

@Entity()
export class Order extends Base {
    @ApiModelProperty({ example: '1', description: 'id of profile' })
    @Column()
    profileId: number;

    @ApiModelProperty({ example: '1', description: 'id of address' })
    @Column()
    addressId: number;

    @ApiModelProperty({ example: '1', description: 'id of product detail' })
    @Column()
    productDetailId: number;

    @Column({
        enum: OrderStatus,
        default: OrderStatus.Requested,
    })
    // @ApiModelProperty({ example: OrderStatus.Requested, enum: OrderStatus })
    status: OrderStatus;

    @ManyToOne(type => ProductDetail, productDetail => productDetail.orders)
    productDetail: ProductDetail;

    @ManyToOne(type => Address, address => address.orders)
    address: Address;

    @ManyToOne(type => Profile, profile => profile.orders)
    profile: Profile;

    @OneToMany(type => OrderDetail, orderDetail => orderDetail.order, {nullable: true})
    OrderDetails: OrderDetail[];
}
