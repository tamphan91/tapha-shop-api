import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

export class LoginUserDTO {
    @ApiModelProperty({ example: 'tamphan91@gmail.com', description: 'The email of the User' })
    @IsEmail()
    readonly email: string;

    @ApiModelProperty({ example: '123456', description: 'The password of the User' })
    @IsString()
    readonly password: string;
}
