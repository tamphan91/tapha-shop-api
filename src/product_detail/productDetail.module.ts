import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductDetail } from './productDetail.entity';
import { ProductDetailController } from './productDetail.controller';
import { ProductDetailService } from './productDetail.service';

@Module({
    imports: [TypeOrmModule.forFeature([ProductDetail])],
    providers: [ProductDetailService],
    controllers: [ProductDetailController],
    exports: [ProductDetailService],
})
export class ProductDetailModule {}
