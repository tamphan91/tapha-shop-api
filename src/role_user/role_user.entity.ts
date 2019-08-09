import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../role/role.entity';
import { User } from '../user/user.entity';
import { Base } from '../common/base.entity';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity()
export class RoleToUser extends Base {

    @ApiModelProperty({ example: 1, description: 'The roleId' })
    @Column()
    public roleId!: number;

    @ApiModelProperty({ example: 1, description: 'The userId' })
    @Column()
    public userId!: number;

    // @ApiModelProperty({ example: 1, description: 'The order number' })
    // public order: number;

    @ManyToOne(type => Role, role => role.roleToUsers)
    public role!: Role;

    @ManyToOne(type => User, user => user.roleToUsers)
    public user!: User;
}
