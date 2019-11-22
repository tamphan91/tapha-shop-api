import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ResetPassArgs {
    @ApiModelProperty({ example: '123456', description: 'The password of the User' })
    @IsString()
    readonly password: string;

}
