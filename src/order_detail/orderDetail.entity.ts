import { Base } from '../common/base.entity';
import { Entity, Column, ManyToOne } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { Stock } from '../stock/stock.entity';
import { Order } from '../order/order.entity';
import { Currency } from '../common/constants';

@Entity()
export class OrderDetail extends Base {
    @ApiModelProperty({ example: 1, description: 'id of order' })
    @Column()
    orderId: number;

    @ApiModelProperty({ example: 1, description: 'id of stock' })
    @Column()
    stockId: number;

    @ApiModelProperty({ example: 1, description: 'quantity of order' })
    @Column()
    quantity: number;

    // @ApiModelProperty({ example: 44, description: 'amount of order' })
    // auto insert from ogrinal price of product
    @Column()
    amount: number;

    // auto insert from discount of product detail
    @Column({nullable: true})
    discount: number;

    // TODO get from product
    // @ApiModelProperty({ enum: Currency, description: 'currency of order', example: Currency.USD })
    @Column()
    currency: Currency;

    @ManyToOne(type => Stock, stock => stock.OrderDetails)
    stock: Stock;

    @ManyToOne(type => Order, order => order.OrderDetails)
    order: Order;
}
