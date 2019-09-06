import { Base } from '../common/base.entity';
import { Column, OneToOne, Entity } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsDefined, IsOptional } from 'class-validator';
import { MyMaxDate } from '../validator/MyMaxDate.validator';
import { User } from '../user/user.entity';
import { UserRole, Gender } from '../common/constants';
import { Expose } from 'class-transformer';

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
        enum: Gender,
    })
    @IsString()
    @ApiModelProperty({ enum: Object.keys(Gender) })
    gender: Gender;

    @Column('text', {nullable: true})
    // @ApiModelProperty({ example: 'abc.jpeg', description: 'The User photo' })
    // @IsString()
    photo: string;

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
}
