import { AdidasService } from './adidas.service';
import { Post, Body, Get, Controller, Delete, Query, Res } from '@nestjs/common';
import { CreateAdidasDto } from './dto/create-adidas.dto';

@Controller('adidas')
export class AdidasController {
    constructor(private readonly adidasService: AdidasService) { }

    @Post()
    async createMany(@Body() createAdidasDto: CreateAdidasDto[]) {
        this.adidasService.createMany(createAdidasDto);
    }

    @Get('sale')
    async serveSaleNike(@Res() res, @Query('name') withName: string, @Query('page') page: number, @Query('gender') gender: string): Promise<any> {
        const result = await this.adidasService.findAll(withName, page, gender);
        res.send(result);
    }

    @Delete()
    async clean() {
        return this.adidasService.clean();
    }
}
