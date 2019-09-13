import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stock } from './stock.entity';
import { StockController } from './stock.controller';
import { StockService } from './stock.service';

@Module({
    imports: [TypeOrmModule.forFeature([Stock])],
    providers: [StockService],
    controllers: [StockController],
    exports: [StockService],
})
export class StockModule {}
