import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
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

  // async findAll(): Promise<User[]> {
  //   return await this.userRepository.find();
  // }
}
