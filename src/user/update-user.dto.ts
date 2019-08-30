import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Profile } from '../profile/profile.entity';

export class UpdateUserDTO {

    @ApiModelProperty({ example: '123', description: 'The password of the User' })
    @IsString()
    readonly password: string;

    @ApiModelProperty({ example: 5, description: 'The profile of the User' })
    readonly profile: Profile;
}
