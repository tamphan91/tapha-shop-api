import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleToUser } from './role_user.entity';
import {TypeOrmCrudService} from '@nestjsx/crud-typeorm';

@Injectable()
export class RoleToUserService extends TypeOrmCrudService<RoleToUser> {
   constructor(@InjectRepository(RoleToUser) repo) {
        super(repo);
   }
}
