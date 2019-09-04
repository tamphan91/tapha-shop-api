import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional, IsDefined, IsNumber } from 'class-validator';
import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { Base } from '../common/base.entity';
import { IsUserEmailAlreadyExist } from '../validator/IsAlreadyExist.validator';
import { Profile } from '../profile/profile.entity';
import { CrudValidationGroups } from '@nestjsx/crud';
const { CREATE, UPDATE } = CrudValidationGroups;

@Entity()
export class User extends Base {

  @Column({
    type: 'text',
    unique: true,
  })
  @ApiModelProperty({ example: 'tamphan@gmail.com', description: 'The email of the User' })
  @IsEmail()
  @IsUserEmailAlreadyExist({
    message: 'User $value already exists. Choose another name.',
  })
  email: string;

  @Column('text')
  @ApiModelProperty({ example: '123', description: 'The password of the User' })
  @IsString()
  password: string;

  @ApiModelProperty({ example: 5, description: 'The profileId of the User' })
  @Column({unique: true})
  @IsNumber()
  profileId: number;

  // @ApiModelProperty({ example: 5, description: 'The profile of the User' })
  @OneToOne(type => Profile, profile => profile.user)
  @JoinColumn()
  profile: Profile;
}
