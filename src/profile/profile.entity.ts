import { Base } from '../common/base.entity';
import { Column, OneToOne, Entity } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEmpty } from 'class-validator';
import { MyMaxDate } from '../validator/MyMaxDate.validator';
import { User } from '../user/user.entity';
import { UserRole, Gender } from '../common/constants';
import { CrudValidationGroups } from '@nestjsx/crud';
import { Expose } from 'class-transformer';
const { CREATE, UPDATE } = CrudValidationGroups;

@Entity()
export class Profile extends Base {

    @Column('text')
    @ApiModelProperty({ example: 'tam', description: 'The User first name' })
    @IsString()
    @IsOptional({ groups: [UPDATE] })
    firstName: string;

    @Column('text')
    @ApiModelProperty({ example: 'phan', description: 'The User last name' })
    @IsString()
    @IsOptional({ groups: [UPDATE] })
    lastName: string;

    @Expose({toPlainOnly: true})
    get fullName(): string {
        return `${this.firstName || ''} ${this.lastName || ''}`;
    }

    constructor(partial: Partial<Profile>) {
        super();
        Object.assign(this, partial);
    }

    @Column('date', { nullable: true })
    @ApiModelProperty({ example: '1991-08-20', description: 'The date of birth' })
    @MyMaxDate({
        message: 'Please enter a valid date of birth.',
    })
    @IsOptional({ groups: [UPDATE] })
    dateOfBirth: string;

    @Column({
        type: 'enum',
        enum: Gender,
    })
    @IsOptional({ groups: [UPDATE] })
    @ApiModelProperty({ enum: Gender })
    gender: Gender;

    @IsOptional({ groups: [UPDATE] })
    @Column({ nullable: true })
    photo: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: [UserRole.User],
        array: true,
    })
    @IsOptional({ groups: [UPDATE] })
    @ApiModelProperty({ enum: UserRole, example: ['Admin', 'Moderator', 'User'] })
    roles: UserRole[];

    @OneToOne(type => User, user => user.profile) // specify inverse side as a second parameter
    user: User;
}
