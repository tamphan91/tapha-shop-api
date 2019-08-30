import { Base } from '../common/base.entity';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';
import { MyMaxDate } from '../validator/MyMaxDate.validator';
import { UserRole, Gender } from '../common/constants';
import { CrudValidationGroups } from '@nestjsx/crud';
const { UPDATE } = CrudValidationGroups;

export class UpdateProfileDTO extends Base {

    @ApiModelProperty({ example: 'tam', description: 'The User first name' })
    @IsString()
    @IsOptional({ groups: [UPDATE] })
    readonly firstName: string;

    @ApiModelProperty({ example: 'phan', description: 'The User last name' })
    @IsString()
    @IsOptional({ groups: [UPDATE] })
    readonly lastName: string;

    @ApiModelProperty({ example: '1991-08-20', description: 'The date of birth' })
    @MyMaxDate({
        message: 'Please enter a valid date of birth.',
    })
    @IsOptional({ groups: [UPDATE] })
    readonly dateOfBirth: string;

    @ApiModelProperty({ example: 'Male', enum: Gender })
    @IsOptional({ groups: [UPDATE] })
    readonly gender: Gender;

    readonly photo: string;

    @IsOptional({ groups: [UPDATE] })
    @ApiModelProperty({ enum: UserRole, example: ['Admin', 'Moderator', 'User'] })
    readonly roles: UserRole[];
}
