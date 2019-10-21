import { NikesService } from './nikes.service';
import { Post, Body, Get, Controller, Delete, Query, Logger, Res } from '@nestjs/common';
import { CreateNikeDto } from './dto/create-nike.dto';

@Controller('nike')
export class NikeController {
    constructor(private readonly nikesService: NikesService) { }

    @Post()
    async createMany(@Body() createNikeDto: CreateNikeDto[]) {
        this.nikesService.createMany(createNikeDto);
    }

    @Get('sale')
    async serveSaleNike(@Res() res, @Query('name') withName: string, @Query('page') page: number, @Query('type') type: string): Promise<any> {

        const result = await this.nikesService.findAll(withName, page, type);
        res.send(result);
    }

    @Delete()
    async clean() {
        return this.nikesService.clean();
    }
}
