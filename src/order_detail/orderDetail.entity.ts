import { Base } from '../common/base.entity';
import { Entity, Column, ManyToOne } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { Stock } from '../stock/stock.entity';
import { Order } from '../order/order.entity';

@Entity()
export class OrderDetail extends Base {
    @ApiModelProperty({ example: 1, description: 'id of purchase' })
    @Column()
    purchaseId: number;

    @ApiModelProperty({ example: 1, description: 'stock of purchase' })
    @Column()
    stockId: number;

    @ApiModelProperty({ example: 1, description: 'quantity of purchases' })
    @Column()
    quantity: number;

    @ManyToOne(type => Stock, stock => stock.OrderDetails)
    stock: Stock;

    @ManyToOne(type => Order, purchase => purchase.OrderDetails)
    order: Order;
}
