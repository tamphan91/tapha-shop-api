import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Nike } from './interfaces/nike.interface';
import { CreateNikeDto } from './dto/create-nike.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class NikesService {
    constructor(@InjectModel('NIKE') private readonly nikeModel: Model<Nike>) { }

    async createMany(createNikeDtos: CreateNikeDto[]) {
        return await this.nikeModel.insertMany(createNikeDtos);
    }

    async findAll(search = null, page = 0, type: string, limits = parseInt(process.env.LIMIT_PAGE, null)): Promise<any> {
        const skips = limits * (page < 1 ? 0 : (page - 1));
        const items = await this.nikeModel.find(search ? { name: { $regex: search, $options: 'i' } } : null)
                                            .where(type ? { type: type.toUpperCase() } : {}).skip(skips).limit(limits).exec();
        const total = await this.nikeModel.estimatedDocumentCount();
        const dataReturn = {
            items,
            itemCount: items.length,
            total,
            pageCount: Math.ceil(total / limits),
        };
        return dataReturn;
    }

    async clean() {
        return await this.nikeModel.deleteMany({});
    }
}
