import { Stock } from './stock.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StockService extends TypeOrmCrudService<Stock> {
  constructor(@InjectRepository(Stock) repo) {
    super(repo);
  }
}
