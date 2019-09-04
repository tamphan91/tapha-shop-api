import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Google } from './google.entity';
import { GoogleService } from './google.service';

@Module({
    imports: [TypeOrmModule.forFeature([Google])],
    providers: [GoogleService],
    exports: [GoogleService],
})
export class GoogleModule {}
