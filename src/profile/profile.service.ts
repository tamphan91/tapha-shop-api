import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Profile } from './profile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateResult } from 'typeorm';
import { UserRole } from '../common/constants';

@Injectable()
export class ProfileService extends TypeOrmCrudService<Profile> {
    constructor(@InjectRepository(Profile) repo) {
        super(repo);
    }

    async updatePhoto(photo: string, profileId: number): Promise<UpdateResult> {
        return await this.repo.update(profileId, {photo});
    }

    async updateRoles(roles: UserRole[], profileId: number): Promise<UpdateResult> {
        return await this.repo.update(profileId, {roles});
    }
}
