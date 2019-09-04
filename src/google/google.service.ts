import { Injectable } from '@nestjs/common';
import { Google } from './google.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class GoogleService extends TypeOrmCrudService<Google> {

  constructor(@InjectRepository(Google) repo) {
    super(repo);
  }
}
