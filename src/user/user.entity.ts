import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MaxDate, IsDateString } from 'class-validator';
import { Entity, Column, ManyToMany, OneToMany } from 'typeorm';
import { Base } from '../common/base.entity';
import { Role } from '../role/role.entity';
import { RoleToUser } from '../role_user/role_user.entity';
import { IsEmailAlreadyExist } from '../validator/IsUserAlreadyExist';
import { MyMaxDate } from '../validator/MyMaxDate';

@Entity()
export class User extends Base {

  @Column({
    type: 'text',
    unique: true,
  })
  @ApiModelProperty({ example: 'tamphan@gmail.com', description: 'The email of the User' })
  @IsEmail()
  @IsEmailAlreadyExist({
    message: 'User $value already exists. Choose another name.',
 })
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

  @Column('date', { nullable:  true})
  @ApiModelProperty({ example: '1991-08-20', description: 'The date of birth'})
  @MyMaxDate({
    message: 'Please enter a valid date of birth.',
 })
  dateOfBirth: Date;

  // @ApiModelProperty({ example: 'Moderator', enum: ['Admin', 'Moderator', 'User']})
  // @ManyToMany(type => Role, role => role.users)
  // roles: Role[];

  @OneToMany((type) => RoleToUser, (roleToUser) => roleToUser.user)
  public roleToUsers!: RoleToUser[];
}
