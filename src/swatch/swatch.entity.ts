import { Base } from '../common/base.entity';
import { Entity, Column, OneToMany} from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { ProductDetail } from '../product_detail/productDetail.entity';

@Entity()
export class Swatch extends Base {
    @ApiModelProperty({ example: 'blue', description: 'blue' })
    @Column()
    name: string;

    @Column('text', {nullable: true})
    image: string;

    @OneToMany(type => ProductDetail, productDetail => productDetail.swatch)
    productDetails: ProductDetail[];
}
