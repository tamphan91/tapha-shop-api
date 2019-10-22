import { Module } from '@nestjs/common';
import { NikeController } from './nikes.controller';
import { NikesService } from './nikes.service';
// import { MongooseModule } from '@nestjs/mongoose';
// import { NikeSchema } from './schemas/nike.schema';
import { DatabaseModule } from '../database/database.module';
import { nikesProviders } from './nikes.providers';

@Module({
    imports: [DatabaseModule],
    providers: [NikesService, ...nikesProviders],
    // imports: [MongooseModule.forFeature([{ name: 'NIKE', schema: NikeSchema }])],
    // providers: [NikesService],
    controllers: [NikeController],
    exports: [NikesService],
})
export class NikesModule {}
