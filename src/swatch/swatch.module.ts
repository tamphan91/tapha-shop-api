import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Swatch } from './swatch.entity';
import { SwatchController } from './swatch.controller';
import { SwatchService } from './swatch.service';

@Module({
    imports: [TypeOrmModule.forFeature([Swatch])],
    providers: [SwatchService],
    controllers: [SwatchController],
    exports: [SwatchService],
})
export class SwatchModule {}
