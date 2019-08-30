import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional, IsEmpty, IsDefined, IsNotEmpty } from 'class-validator';
import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { Base } from '../common/base.entity';
import { IsAlreadyExist } from '../validator/IsAlreadyExist.validator';
import { Profile } from '../profile/profile.entity';
import { CrudValidationGroups } from '@nestjsx/crud';
const { CREATE, UPDATE } = CrudValidationGroups;
import { Type, Exclude, Expose } from 'class-transformer';

@Entity()
export class User extends Base {

  @Column({
    type: 'text',
    unique: true,
    nullable: true,
  })
  @ApiModelProperty({ example: 'tamphan@gmail.com', description: 'The email of the User' })
  @IsEmail()
  @IsAlreadyExist({
    message: 'User $value already exists. Choose another name.',
  })
  @IsOptional({ groups: [UPDATE] })
  @IsDefined({ groups: [CREATE] })
  email: string;

  // @Exclude()
  @IsOptional({ groups: [UPDATE] })
  @IsDefined({ groups: [CREATE] })
  @Column('text', { nullable: true })
  @ApiModelProperty({ example: '123', description: 'The password of the User' })
  @IsString()
  password: string;

  // @Type((t) => Profile)
  @IsOptional({ groups: [UPDATE] })
  @IsDefined({ groups: [CREATE] })
  @ApiModelProperty({ example: 5, description: 'The profile of the User' })
  @OneToOne(type => Profile, profile => profile.user)
  @JoinColumn()
  profile: Profile;
}
