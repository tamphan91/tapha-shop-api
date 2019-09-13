import { Base } from '../common/base.entity';
import { Entity, Column} from 'typeorm';
import { InvoiceStatus } from '../common/constants';

@Entity()
export class Invoice extends Base {
    @Column({
        enum: InvoiceStatus,
        default: InvoiceStatus.Draft,
    })
    // @ApiModelProperty({ example: OrderStatus.Requested, enum: OrderStatus })
    status: InvoiceStatus;
}
