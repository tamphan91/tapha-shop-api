import { Base } from '../common/base.entity';
import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { Profile } from '../profile/profile.entity';
import { Order } from '../order/order.entity';

@Entity()
export class Address extends Base {

    @ApiModelProperty({ example: 'street', description: 'street' })
    @Column()
    street: string;

    @ApiModelProperty({ example: 'street2', description: 'street2' })
    @Column()
    street2: string;

    @ApiModelProperty({ example: 'city', description: 'city' })
    @Column()
    city: string;

    @ApiModelProperty({ example: 'zipcode', description: 'zipcode' })
    @Column()
    zipcode: string;

    @ApiModelProperty({ example: 'state', description: 'state' })
    @Column()
    addressState: string;

    @ApiModelProperty({ example: 5, description: 'The profileId of the User' })
    @IsNumber()
    profileId: number;

    @ManyToOne(type => Profile, profile => profile.addresses)
    @JoinColumn()
    profile: Profile;

    @OneToMany(type => Order, order => order.address, {nullable: true})
    orders: Order[];
}
