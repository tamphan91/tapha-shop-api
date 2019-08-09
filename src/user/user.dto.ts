import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

export class UserDTO {

    id: number;

    @ApiModelProperty({ example: 'tamphan@gmail.com', description: 'The email of the User' })
    @IsEmail()
    email: string;

    @ApiModelProperty({ example: '123', description: 'The password of the User' })
    @IsString()
    password: string;

}
