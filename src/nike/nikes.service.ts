import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { Nike } from './interfaces/nike.interface';
import { CreateNikeDto } from './dto/create-nike.dto';
// import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class NikesService {
    constructor(@Inject('SALE_MODEL') private readonly saleModel: Model<Nike>) { }

    async createMany(createNikeDtos: CreateNikeDto[]) {
        return await this.saleModel.insertMany(createNikeDtos);
    }

    async findAll(search = null, page = 0, gender: string, limits = parseInt(process.env.LIMIT_PAGE, null)): Promise<any> {
        const skips = limits * (page < 1 ? 0 : (page - 1));
        const items = await this.saleModel.find(search ? { name: { $regex: search, $options: 'i' } } : null)
                                            .where(gender ? {gender : { $regex: gender, $options: 'i' }} : {}).skip(skips).limit(limits).exec();
        const total = await this.saleModel.countDocuments(gender ? {gender : { $regex: gender, $options: 'i' }} : null);
        const dataReturn = {
            items,
            itemCount: items.length,
            total,
            pageCount: Math.ceil(total / limits),
        };
        return dataReturn;
    }

    async clean() {
        return await this.saleModel.deleteMany({});
    }
}
