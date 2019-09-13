import { Base } from '../common/base.entity';
import { Entity, Column, OneToOne, JoinColumn} from 'typeorm';
import { InvoiceStatus } from '../common/constants';
import { Order } from '../order/order.entity';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity()
export class Invoice extends Base {
    @Column({
        enum: InvoiceStatus,
        default: InvoiceStatus.Open,
    })
    @ApiModelProperty({ example: InvoiceStatus.Open, enum: InvoiceStatus })
    status: InvoiceStatus;

    @ApiModelProperty({ example: 1, description: 'id of orderDetail' })
    @Column()
    orderId: number;

    @OneToOne(type => Order, order => order.invoice)
    @JoinColumn()
    order: Order;
}
