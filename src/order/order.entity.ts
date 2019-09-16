import { Base } from '../common/base.entity';
import { Entity, Column, ManyToOne, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { OrderStatus } from '../common/constants';
import { Address } from '../address/address.entity';
import { Profile } from '../profile/profile.entity';
import { OrderDetail } from '../order_detail/orderDetail.entity';
import { Invoice } from '../invoice/invoice.entity';

@Entity()
export class Order extends Base {
    @ApiModelProperty({ example: 1, description: 'id of profile' })
    @Column()
    profileId: number;

    @ApiModelProperty({ example: 1, description: 'id of address' })
    @Column()
    addressId: number;

    // @ApiModelProperty({ example: 1, description: 'id of product detail' })
    // @Column()
    // productDetailId: number;

    @OneToOne(type => Invoice, invoice => invoice.order)
    invoice: Invoice;

    @Column({
        type: 'enum',
        enum: OrderStatus,
        default: OrderStatus.Requested,
    })
    @ApiModelProperty({ example: OrderStatus.Requested, enum: OrderStatus })
    status: OrderStatus;

    // @ManyToOne(type => ProductDetail, productDetail => productDetail.orders)
    // productDetail: ProductDetail;

    @ManyToOne(type => Address, address => address.orders)// TODO validate address for profile
    @JoinColumn()
    address: Address;

    @ManyToOne(type => Profile, profile => profile.orders)
    @JoinColumn()
    profile: Profile;

    @OneToMany(type => OrderDetail, orderDetail => orderDetail.order, {nullable: true})
    OrderDetails: OrderDetail[];
}
