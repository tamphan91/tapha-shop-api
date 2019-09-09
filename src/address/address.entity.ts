import { Base } from '../common/base.entity';
import { Entity, Column, JoinColumn, OneToOne } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { Profile } from '../profile/profile.entity';

@Entity()
export class Address extends Base {

    @ApiModelProperty({ example: 'address1', description: 'address1' })
    @Column()
    address1: string;

    @ApiModelProperty({ example: 'address2', description: 'address2' })
    @Column()
    address2: string;

    @ApiModelProperty({ example: 5, description: 'The profileId of the User' })
    @Column({ unique: true })
    @IsNumber()
    profileId: number;

    @OneToOne(type => Profile)
    @JoinColumn()
    profile: Profile;
}
