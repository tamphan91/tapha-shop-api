import { Module } from '@nestjs/common';
import { NikeController } from './nikes.controller';
import { NikesService } from './nikes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { NikeSchema } from './schemas/nike.schema';

@Module({
    // imports: [DatabaseModule],
    imports: [MongooseModule.forFeature([{ name: 'NIKE', schema: NikeSchema }])],
    controllers: [NikeController],
    // providers: [NikesService, ...nikesProviders],
    providers: [NikesService],
    exports: [NikesService],
})
export class NikesModule {}
