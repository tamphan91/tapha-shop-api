// import { ApiModelProperty } from '@nestjs/swagger';
// import { IsString, IsEmpty } from 'class-validator';
// import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// @Entity()
export class User {

//   @ApiModelProperty()
//   @PrimaryGeneratedColumn()
//   @IsEmpty()
  userId: number;

//   @Column('text')
//   @ApiModelProperty({ example: 'cz', description: 'The name of the User' })
//   @IsString()
  username: string;

//   @Column('text')
//   @ApiModelProperty({ exaApiModelPropertyApiModelPropertymple: '123', description: 'The password of the User' })
//   @IsString()
  password: string;
}
