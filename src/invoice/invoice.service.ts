import { Invoice } from './invoice.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InvoiceService extends TypeOrmCrudService<Invoice> {
  constructor(@InjectRepository(Invoice) repo) {
    super(repo);
  }
}
