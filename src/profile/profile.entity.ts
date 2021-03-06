import { Base } from '../common/base.entity';
import { Column, OneToOne, Entity, OneToMany, JoinColumn } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsDefined, IsOptional } from 'class-validator';
import { MyMaxDate } from '../validator/MyMaxDate.validator';
import { User } from '../user/user.entity';
import { UserRole, Gender } from '../common/constants';
import { Expose } from 'class-transformer';
import { Address } from '../address/address.entity';
import { Order } from '../order/order.entity';

@Entity()
export class Profile extends Base {

    @Column('text')
    @ApiModelProperty({ example: 'tam', description: 'The User first name' })
    @IsString()
    firstName: string;

    @Column('text')
    @ApiModelProperty({ example: 'phan', description: 'The User last name' })
    @IsString()
    lastName: string;

    @Expose({toPlainOnly: true})
    get fullName(): string {
        return `${this.firstName || ''} ${this.lastName || ''}`;
    }

    // constructor(partial: Partial<Profile>) {
    //     super();
    //     Object.assign(this, partial);
    // }

    @Column('date', { nullable: true })
    @ApiModelProperty({ example: '1991-08-20', description: 'The date of birth (yyyy-mm-dd)' })
    @MyMaxDate({
        message: 'Please enter a valid date of birth.',
    })
    dateOfBirth: string;

    @Column({
        type: 'enum',
        enum: [Gender.Famale, Gender.Male, Gender.Other],
        nullable: true,
    })
    @IsString()
    @ApiModelProperty({example: Gender.Male, enum: [Gender.Famale, Gender.Male, Gender.Other] })
    gender: Gender;

    @Column('text', {nullable: true})
    // @ApiModelProperty({ example: 'abc.jpeg', description: 'The User photo' })
    // @IsString()
    photo: string;

    @Column('text', {nullable: true})
    @ApiModelProperty({ example: '0905254425', description: 'The User phone' })
    phone: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: [UserRole.User],
        array: true, // this property makes update profile always appears roles ???
    })
    // @ApiModelProperty({type: UserRole, enum: Object.keys(UserRole), example: ['Admin', 'Moderator', 'User'], isArray: true })
    roles: UserRole[];

    @OneToOne(type => User, user => user.profile) // specify inverse side as a second parameter
    user: User;

    @OneToMany(type => Address, address => address.profile) // specify inverse side as a second parameter
    addresses: Address[];

    @OneToMany(type => Order, order => order.profile, {nullable: true})
    orders: Order[];
}
