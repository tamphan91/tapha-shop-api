import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Profile } from './profile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateResult } from 'typeorm';
import { UserRole, Gender } from '../common/constants';

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

    async initProfile(firstName: string, lastName: string, gender: Gender): Promise<number> {
        const result = await this.repo.insert({firstName, lastName, gender});
        // tslint:disable-next-line:no-console
        console.log('result', result);
        return result.identifiers[0].id;
    }
}
