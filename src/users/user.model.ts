import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsEmpty } from 'class-validator';

export class User {

//   @ApiModelProperty()
  @IsEmpty()
  userId: number;

  @ApiModelProperty({ example: 'cz', description: 'The name of the User' })
  @IsString()
  username: string;

  @ApiModelProperty({ example: '123', description: 'The password of the User' })
  @IsString()
  password: string;

}
