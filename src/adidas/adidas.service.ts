import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { Adidas } from './interfaces/adidas.interface';
import { CreateAdidasDto } from './dto/create-adidas.dto';

@Injectable()
export class AdidasService {
    constructor(@Inject('SALE_MODEL') private readonly saleModel: Model<Adidas>) { }

    async createMany(createAdidasDtos: CreateAdidasDto[]) {
        return await this.saleModel.insertMany(createAdidasDtos);
    }

    async findAll(search = null, page = 0, gender = null, limits = parseInt(process.env.LIMIT_PAGE, null)): Promise<any> {
        const skips = limits * (page < 1 ? 0 : (page - 1));
        let query = null;
        if (search) {
            if (gender) {
                query = { name: { $regex: search, $options: 'i' }, gender};
            } else {
                query = { name: { $regex: search, $options: 'i' } };
            }
        } else {
            if (gender) {
                query = { gender};
            }
        }

        const items = await this.saleModel.find(query).skip(skips).limit(limits).exec();
        const total = await this.saleModel.countDocuments(query);
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
