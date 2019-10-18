import { Controller, Get, Param, Res, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { readdirSync, ensureDirSync, readJsonSync } from 'fs-extra';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('photos/:fileId')
  async serveAvatar(@Param('fileId') fileId, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: 'photos' });
  }

  @Get('nike/sale')
  async serveSaleNike(@Res() res, @Query('name') withName: string, @Query('page') page: number): Promise<any> {
    const path = process.env.NIKE_SALE_PATH;
    ensureDirSync(path);
    const directories = readdirSync(path);
    // tslint:disable-next-line:no-console
    console.log('directories', directories);
    if (directories.length === 0) {
      res.send([]);
    } else {
      // tslint:disable-next-line:no-console
      console.log('directories[directories.length - 1]', directories[directories.length - 1]);
      // res.sendFile(directories[directories.length - 1], { root: path });
      let products = readJsonSync(path + '/' + directories[directories.length - 1]);
      const filterBy = str => products.filter(
        item => new RegExp('^' + str.replace(/\*/g, '.*') + '$').test(item.name.toLowerCase()),
      );
      products = withName ? filterBy(`*${withName.toLowerCase()}*`) : products;
      const paginate = (array, pageSize, pageNumber) => {
        --pageNumber; // because pages logically start with 1, but technically with 0
        return array.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize);
      };
      const items = paginate(products, process.env.LIMIT_PAGE, page ? (page < 1 ? 1 : page) : 1);
      const dataReturn = {
        items,
        itemCount: items.length,
        total: products.length,
        pageCount: Math.ceil(products.length / parseInt(process.env.LIMIT_PAGE, null)),
      };
      res.send(dataReturn);
    }
  }
}
