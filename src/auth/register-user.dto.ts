import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';
import { IsUserEmailAlreadyExist } from '../validator/IsUserEmailAlreadyExist.validator';
import { Gender } from '../common/constants';

export class RegisterUserDTO {

    @ApiModelProperty({ example: 'tam', description: 'The User first name' })
    @IsString()
    firstName: string;

    @ApiModelProperty({ example: 'phan', description: 'The User last name' })
    @IsString()
    lastName: string;

    @IsString()
    @ApiModelProperty({example: Gender.Male, enum: [Gender.Famale, Gender.Male, Gender.Other] })
    gender: Gender;

    @ApiModelProperty({ example: 'tamphan91@gmail.com', description: 'The email of the User' })
    @IsEmail()
    @IsUserEmailAlreadyExist({
        message: 'User $value already exists. Choose another name.',
      })
    readonly email: string;

    @ApiModelProperty({ example: '123', description: 'The password of the User' })
    @IsString()
    readonly password: string;
}
