import { Order } from './order.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderService extends TypeOrmCrudService<Order> {
  constructor(@InjectRepository(Order) repo) {
    super(repo);
  }
}
