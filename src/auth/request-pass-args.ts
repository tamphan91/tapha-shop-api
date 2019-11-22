import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class RequestPassArgs {
    @ApiModelProperty({ example: 'tamphan91@gmail.com', description: 'The email of the User' })
    @IsEmail()
    readonly email: string;

}
