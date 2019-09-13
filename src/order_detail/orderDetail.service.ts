import { OrderDetail } from './orderDetail.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderDetailService extends TypeOrmCrudService<OrderDetail> {
  constructor(@InjectRepository(OrderDetail) repo) {
    super(repo);
  }
}
