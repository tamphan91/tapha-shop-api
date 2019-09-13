import { ProductDetail } from './productDetail.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductDetailService extends TypeOrmCrudService<ProductDetail> {
  constructor(@InjectRepository(ProductDetail) repo) {
    super(repo);
  }
}
