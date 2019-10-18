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
  async serveSaleNike(@Res() res, @Query('name') withName: string): Promise<any> {
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
      const products = readJsonSync(path + '/' + directories[directories.length - 1]);
      const filterBy = str => products.filter(
        item => new RegExp('^' + str.replace(/\*/g, '.*') + '$').test(item.name.toLowerCase()),
      );
      res.send(withName ? filterBy(`*${withName.toLowerCase()}*`) : products);
    }
  }
}
