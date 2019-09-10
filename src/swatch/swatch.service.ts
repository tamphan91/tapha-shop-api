import { Swatch } from './swatch.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SwatchService extends TypeOrmCrudService<Swatch> {
  constructor(@InjectRepository(Swatch) repo) {
    super(repo);
  }
}
