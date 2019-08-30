import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Profile } from './profile.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProfileService extends TypeOrmCrudService<Profile> {
    constructor(@InjectRepository(Profile) repo) {
        super(repo);
    }
}
