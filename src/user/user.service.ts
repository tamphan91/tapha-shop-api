import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Repository, InsertResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

// export type User = any;

@Injectable()
export class UserService extends TypeOrmCrudService<User> {
  // private readonly users: User[];

  constructor(@InjectRepository(User) repo) {
    super(repo);
  }

  // async findOne(username: string): Promise<User | undefined> {
  //   return this.userRepository.findOne({username});
  // }

  async findAll(conditions: any): Promise<User[]> {
    return await this.repo.find(conditions);
  }

  async initUser(email: string, password: string, profileId: number): Promise<InsertResult> {
    return await this.repo.insert({email, password, profileId});
  }
}
