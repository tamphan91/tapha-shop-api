import { Base } from '../common/base.entity';
import { ApiModelProperty } from '@nestjs/swagger';
import { MyMaxDate } from '../validator/MyMaxDate.validator';
import { UserRole, Gender } from '../common/constants';
import { IsOptional } from 'class-validator';

export class UpdateProfileDTO extends Base {

    @ApiModelProperty({ example: 'tam', description: 'The User first name', required: false })
    readonly firstName: string;

    @ApiModelProperty({ example: 'phan', description: 'The User last name', required: false })
    readonly lastName: string;

    @ApiModelProperty({ example: '1991-08-20', description: 'The date of birth', required: false })
    @MyMaxDate({
        message: 'Please enter a valid date of birth.',
    })
    @IsOptional()
    readonly dateOfBirth: string;

    @ApiModelProperty({ enum: [Gender.Famale, Gender.Male, Gender.Other], required: false })
    gender: Gender;

    readonly photo: string;

    // tslint:disable-next-line:max-line-length
    // @ApiModelProperty({enum: Object.keys(UserRole), example: ['Admin', 'Moderator', 'User'], isArray: true, type: UserRole, uniqueItems: true, required: false })
    roles: UserRole[];
}
