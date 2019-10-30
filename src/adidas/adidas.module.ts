import { Module } from '@nestjs/common';
import { AdidasController } from './adidas.controller';
import { AdidasService } from './adidas.service';
// import { MongooseModule } from '@nestjs/mongoose';
// import { NikeSchema } from './schemas/nike.schema';
import { DatabaseModule } from '../database/database.module';
import { adidasProviders } from './adidas.providers';

@Module({
    imports: [DatabaseModule],
    providers: [AdidasService, ...adidasProviders],
    controllers: [AdidasController],
    exports: [AdidasService],
})
export class AdidasModule {}
