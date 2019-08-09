import { ApiModelProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';
import { Entity, Column, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { Base } from '../common/base.entity';
import { User } from '../user/user.entity';
import { UserRole } from '../common/constants';
import { RoleToUser } from '../role_user/role_user.entity';

@Entity()
export class Role extends Base {

  @Column({
    type: 'varchar',
    length: 9,
    unique: true,
  })
  @ApiModelProperty({ example: 'Admin', description: 'The name of the role', enum: ['Admin', 'Moderator', 'User'] })
  @IsIn(['Admin', 'Moderator', 'User'])
  name: string;

  // @ManyToMany(type => User, user => user.roles)
  // @JoinTable()
  // users: User[];

  @OneToMany((type) => RoleToUser, (roleToUser) => roleToUser.role)
  public roleToUsers!: RoleToUser[];

}
