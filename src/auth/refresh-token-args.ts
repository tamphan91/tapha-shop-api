import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RefreshTokenArgs {
    @ApiModelProperty({ example: 'abc.123.xyz', description: 'The token' })
    @IsString()
    readonly token: string;

}
