import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Detail } from './detail.entity';
import { DetailController } from './detail.controller';
import { DetailService } from './detail.service';

@Module({
    imports: [TypeOrmModule.forFeature([Detail])],
    providers: [DetailService],
    controllers: [DetailController],
    exports: [DetailService],
})
export class DetailModule {}
