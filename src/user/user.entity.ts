import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';
import { Entity, Column, ManyToMany, OneToMany } from 'typeorm';
import { Base } from '../common/base.entity';
import { Role } from '../role/role.entity';
import { RoleToUser } from '../role_user/role_user.entity';

@Entity()
export class User extends Base {

  @Column({
    type: 'text',
    unique: true,
  })
  @ApiModelProperty({ example: 'tamphan@gmail.com', description: 'The email of the User' })
  @IsEmail()
  email: string;

  @Column('text')
  @ApiModelProperty({ example: '123', description: 'The password of the User' })
  @IsString()
  password: string;

  @Column('text')
  @ApiModelProperty({ example: 'tam', description: 'The User first name' })
  @IsString()
  firstName: string;

  @Column('text')
  @ApiModelProperty({ example: 'phan', description: 'The User last name' })
  @IsString()
  lastName: string;

  // @ApiModelProperty({ example: 'Moderator', enum: ['Admin', 'Moderator', 'User']})
  // @ManyToMany(type => Role, role => role.users)
  // roles: Role[];

  @OneToMany((type) => RoleToUser, (roleToUser) => roleToUser.user)
  public roleToUsers!: RoleToUser[];
}
