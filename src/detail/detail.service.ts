import { Detail } from './detail.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DetailService extends TypeOrmCrudService<Detail> {
  constructor(@InjectRepository(Detail) repo) {
    super(repo);
  }
}
