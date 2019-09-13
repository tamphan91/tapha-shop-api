import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetail } from './orderDetail.entity';
import { OrderDetailController } from './orderDetail.controller';
import { OrderDetailService } from './orderDetail.service';

@Module({
    imports: [TypeOrmModule.forFeature([OrderDetail])],
    providers: [OrderDetailService],
    controllers: [OrderDetailController],
    exports: [OrderDetailService],
})
export class OrderDetailModule {}
