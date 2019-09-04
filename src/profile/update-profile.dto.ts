import { Base } from '../common/base.entity';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { MyMaxDate } from '../validator/MyMaxDate.validator';
import { UserRole, Gender } from '../common/constants';

export class UpdateProfileDTO extends Base {

    @ApiModelProperty({ example: 'tam', description: 'The User first name' })
    readonly firstName: string;

    @ApiModelProperty({ example: 'phan', description: 'The User last name' })
    readonly lastName: string;

    @ApiModelProperty({ example: '1991-08-20', description: 'The date of birth' })
    @MyMaxDate({
        message: 'Please enter a valid date of birth.',
    })
    readonly dateOfBirth: string;

    @ApiModelProperty({ example: 'Male', enum: Gender })
    readonly gender: Gender;

    readonly photo: string;

    @ApiModelProperty({ enum: UserRole, example: ['Admin', 'Moderator', 'User'] })
    readonly roles: UserRole[];
}
