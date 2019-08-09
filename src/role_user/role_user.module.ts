import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleToUser } from './role_user.entity';
import { RoleToUserService } from './role_user.service';
import { RoleToUserController } from './role_user.controller';

@Module({
    imports: [TypeOrmModule.forFeature([RoleToUser])],
    providers: [RoleToUserService],
    controllers: [RoleToUserController],
})
export class RoleToUserModule {}
