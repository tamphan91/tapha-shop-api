import { Controller, Get, Param, Res, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { scheduleJob } from 'node-schedule';
import { launch } from 'puppeteer';
import { NikesService } from './nike/nikes.service';
import { Gender } from './common/constants';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly nikeService: NikesService) {
    scheduleJob('*/7 * * * *', () => {
      Logger.log('Start crawl Nike Sale Job at ' + new Date());
      // tslint:disable-next-line:max-line-length
      launch({ args: ['--no-sandbox', '--unlimited-storage', '--full-memory-crash-report', '--force-gpu-mem-available-mb'] }).then(async browser => {
        let page = await browser.newPage();
        let productCards;
        const products = [];
        try {

          await page.goto('https://nike.com/us');

          // click to show menu bar
          await page.waitFor('#MobileMenuToggle');
          await page.click('#MobileMenuToggle');

          // click Men button
          // tslint:disable-next-line:max-line-length
          await page.waitFor('#gen-nav-commerce-header > header > nav.ncss-container.bg-white > section.d-sm-b > div > div.l-mobile-nav.d-lg-h.pt2-sm.pb2-sm > nav > div > div.mobile.menu-panel > ul > li:nth-child(3)');
          // tslint:disable-next-line:max-line-length
          await page.click('#gen-nav-commerce-header > header > nav.ncss-container.bg-white > section.d-sm-b > div > div.l-mobile-nav.d-lg-h.pt2-sm.pb2-sm > nav > div > div.mobile.menu-panel > ul > li:nth-child(3)');

          // get href from Sale button
          // tslint:disable-next-line:max-line-length
          const salePageHref = await page.$eval('#gen-nav-commerce-header > header > nav.ncss-container.bg-white > section.d-sm-b > div > div.l-mobile-nav.d-lg-h.pt2-sm.pb2-sm > nav > div > div.mobile-menu-panel.is-active > ul > li:nth-child(6) > a', el => el.getAttribute('href'));
          await page.goto(salePageHref);
          await page.waitFor('#Wall > div > div.header-position.css-iqr4dm');

          // tslint:disable-next-line:max-line-length
          await page.waitFor('#Wall > div > div.categories.css-mzf2z2.is--mobile > div > div.simplebar-wrapper > div.simplebar-mask > div > div > a:nth-child(1) > div');
          // tslint:disable-next-line:max-line-length
          const countDiv = await page.$eval('#Wall > div > div.categories.css-mzf2z2.is--mobile > div > div.simplebar-wrapper > div.simplebar-mask > div > div > a:nth-child(1) > div', el => el.innerHTML);
          const total = countDiv.replace(/\(|\)/gi, '');
          // tslint:disable-next-line:max-line-length
          await page.click('#Wall > div > div.categories.css-mzf2z2.is--mobile > div > div.simplebar-wrapper > div.simplebar-mask > div > div > a:nth-child(1)');

          let times = 1;
          do {
            Logger.log('start', total);
            await page.evaluate(async () => {
              await new Promise((resolve, reject) => {
                let totalHeight = (document.body.scrollHeight > 10000) ? (document.body.scrollHeight - 6000) : 0;
                const distance = 100;
                const timer = setInterval(() => {
                  const scrollHeight = document.body.scrollHeight;
                  window.scrollBy(0, distance);
                  totalHeight += distance;

                  if (totalHeight >= scrollHeight) {
                    clearInterval(timer);
                    resolve();
                  }
                }, 150);
              });
            });
            productCards = await page.$$('#Wall > div > div.results__body > div > main > section > div > div > .product-card__body');
            Logger.log('end', productCards.length);
          } while (productCards.length < total && 3 > times++);
          for (const productCard of productCards) {
            const name = await productCard.$eval('.product-card__link-overlay', el => el.innerHTML);
            const priceReduced = await productCard.$eval('.css-i260wg', el => el.innerHTML);
            const priceOriginal = await productCard.$eval('.css-31z3ik.css-ndethb', el => el.innerHTML);
            const picture = await productCard.$eval('picture > img', el => el.getAttribute('src'));
            const href = await productCard.$eval('.product-card__link-overlay', el => el.getAttribute('href'));
            const gender = Gender.Male;
            products.push({ name, priceReduced, priceOriginal, picture, href, gender });
          }

          Logger.log('Done crawl Men Nike Sale Job at ' + new Date());
        } catch (error) {
          Logger.log('error:', error);
        } finally {
          await page.close();
        }

        page = await browser.newPage();
        try {

          await page.goto('https://nike.com/us');

          // click to show menu bar
          await page.waitFor('#MobileMenuToggle');
          await page.click('#MobileMenuToggle');

          // click Women button
          // tslint:disable-next-line:max-line-length
          await page.waitFor('#gen-nav-commerce-header > header > nav.ncss-container.bg-white > section.d-sm-b > div > div.l-mobile-nav.d-lg-h.pt2-sm.pb2-sm > nav > div > div.mobile.menu-panel > ul > li:nth-child(4)');
          // tslint:disable-next-line:max-line-length
          await page.click('#gen-nav-commerce-header > header > nav.ncss-container.bg-white > section.d-sm-b > div > div.l-mobile-nav.d-lg-h.pt2-sm.pb2-sm > nav > div > div.mobile.menu-panel > ul > li:nth-child(4)');

          // get href from Sale button
          // tslint:disable-next-line:max-line-length
          const salePageHref = await page.$eval('#gen-nav-commerce-header > header > nav.ncss-container.bg-white > section.d-sm-b > div > div.l-mobile-nav.d-lg-h.pt2-sm.pb2-sm > nav > div > div.mobile-menu-panel.is-active > ul > li:nth-child(6) > a', el => el.getAttribute('href'));
          await page.goto(salePageHref);
          await page.waitFor('#Wall > div > div.header-position.css-iqr4dm');

          // tslint:disable-next-line:max-line-length
          await page.waitFor('#Wall > div > div.categories.css-mzf2z2.is--mobile > div > div.simplebar-wrapper > div.simplebar-mask > div > div > a:nth-child(1) > div');
          // tslint:disable-next-line:max-line-length
          const countDiv = await page.$eval('#Wall > div > div.categories.css-mzf2z2.is--mobile > div > div.simplebar-wrapper > div.simplebar-mask > div > div > a:nth-child(1) > div', el => el.innerHTML);
          const total = countDiv.replace(/\(|\)/gi, '');
          // tslint:disable-next-line:max-line-length
          await page.click('#Wall > div > div.categories.css-mzf2z2.is--mobile > div > div.simplebar-wrapper > div.simplebar-mask > div > div > a:nth-child(1)');

          // let productCards;
          let times = 1;
          do {
            Logger.log('start', total);
            await page.evaluate(async () => {
              await new Promise((resolve, reject) => {
                let totalHeight = (document.body.scrollHeight > 10000) ? (document.body.scrollHeight - 6000) : 0;
                const distance = 100;
                const timer = setInterval(() => {
                  const scrollHeight = document.body.scrollHeight;
                  window.scrollBy(0, distance);
                  totalHeight += distance;

                  if (totalHeight >= scrollHeight) {
                    clearInterval(timer);
                    resolve();
                  }
                }, 150);
              });
            });
            productCards = await page.$$('#Wall > div > div.results__body > div > main > section > div > div > .product-card__body');
            Logger.log('end', productCards.length);
          } while (productCards.length < total && 3 > times++);
          for (const productCard of productCards) {
            const name = await productCard.$eval('.product-card__link-overlay', el => el.innerHTML);
            const priceReduced = await productCard.$eval('.css-i260wg', el => el.innerHTML);
            const priceOriginal = await productCard.$eval('.css-31z3ik.css-ndethb', el => el.innerHTML);
            const picture = await productCard.$eval('picture > img', el => el.getAttribute('src'));
            const href = await productCard.$eval('.product-card__link-overlay', el => el.getAttribute('href'));
            const gender = Gender.Famale;
            products.push({ name, priceReduced, priceOriginal, picture, href, gender });
          }

          await this.nikeService.clean();
          await this.nikeService.createMany(products);

          Logger.log('Done crawl Women Nike Sale Job at ' + new Date());
        } catch (error) {
          Logger.log('error:', error);
        } finally {
          await page.close();
        }

        Logger.log('browser is closed:');
        await browser.close();
      });
    });
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('photos/:fileId')
  async serveAvatar(@Param('fileId') fileId, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: 'photos' });
  }
}
