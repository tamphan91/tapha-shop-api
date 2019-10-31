import { Controller, Get, Param, Res, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { scheduleJob } from 'node-schedule';
import { launch, devices } from 'puppeteer';
import { NikesService } from './nike/nikes.service';
import { Gender } from './common/constants';
import { AdidasService } from './adidas/adidas.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly nikeService: NikesService, private adidasService: AdidasService) {

    // // NIKE
    // scheduleJob('0-59/20 * * * *', () => {
    //   Logger.log('Start crawl Nike Sale Job at ' + new Date());
    //   // tslint:disable-next-line:max-line-length
    //   launch({ args: ['--no-sandbox', '--unlimited-storage', '--full-memory-crash-report', '--force-gpu-mem-available-mb'] }).then(async browser => {
    //     let productCards;
    //     const products = [];

    //     // MEN
    //     let page = await browser.newPage();
    //     try {

    //       await page.goto('https://nike.com/us');

    //       // click to show menu bar
    //       await page.waitFor('#MobileMenuToggle');
    //       await page.click('#MobileMenuToggle');

    //       // click Men button
    //       // tslint:disable-next-line:max-line-length
    //       await page.waitFor('#gen-nav-commerce-header > header > nav.ncss-container.bg-white > section.d-sm-b > div > div.l-mobile-nav.d-lg-h.pt2-sm.pb2-sm > nav > div > div.mobile.menu-panel > ul > li:nth-child(3)');
    //       // tslint:disable-next-line:max-line-length
    //       await page.click('#gen-nav-commerce-header > header > nav.ncss-container.bg-white > section.d-sm-b > div > div.l-mobile-nav.d-lg-h.pt2-sm.pb2-sm > nav > div > div.mobile.menu-panel > ul > li:nth-child(3)');

    //       // get href from Sale button
    //       // tslint:disable-next-line:max-line-length
    //       const salePageHref = await page.$eval('#gen-nav-commerce-header > header > nav.ncss-container.bg-white > section.d-sm-b > div > div.l-mobile-nav.d-lg-h.pt2-sm.pb2-sm > nav > div > div.mobile-menu-panel.is-active > ul > li:nth-child(6) > a', el => el.getAttribute('href'));
    //       await page.goto(salePageHref);
    //       await page.waitFor('#Wall > div > div.header-position.css-iqr4dm');

    //       // tslint:disable-next-line:max-line-length
    //       await page.waitFor('#Wall > div > div.categories.css-mzf2z2.is--mobile > div > div.simplebar-wrapper > div.simplebar-mask > div > div > a:nth-child(1) > div');
    //       // tslint:disable-next-line:max-line-length
    //       const countDiv = await page.$eval('#Wall > div > div.categories.css-mzf2z2.is--mobile > div > div.simplebar-wrapper > div.simplebar-mask > div > div > a:nth-child(1) > div', el => el.innerHTML);
    //       const total = countDiv.replace(/\(|\)/gi, '');
    //       // tslint:disable-next-line:max-line-length
    //       await page.click('#Wall > div > div.categories.css-mzf2z2.is--mobile > div > div.simplebar-wrapper > div.simplebar-mask > div > div > a:nth-child(1)');

    //       let times = 1;
    //       do {
    //         Logger.log('start', total);
    //         await page.evaluate(async () => {
    //           await new Promise((resolve, reject) => {
    //             let totalHeight = (document.body.scrollHeight > 10000) ? (document.body.scrollHeight - 6462) : 0;
    //             const distance = 100;
    //             const timer = setInterval(() => {
    //               const scrollHeight = document.body.scrollHeight;
    //               window.scrollBy(0, distance);
    //               totalHeight += distance;

    //               if (totalHeight >= scrollHeight) {
    //                 clearInterval(timer);
    //                 resolve();
    //               }
    //             }, 150);
    //           });
    //         });
    //         productCards = await page.$$('#Wall > div > div.results__body > div > main > section > div > div > .product-card__body');
    //         Logger.log('end', productCards.length);
    //       } while (productCards.length < total && 3 > times++);
    //       for (const productCard of productCards) {
    //         const name = await productCard.$eval('.product-card__link-overlay', el => el.innerHTML);
    //         const priceReduced = await productCard.$eval('.css-i260wg', el => el.innerHTML);
    //         const priceOriginal = await productCard.$eval('.css-31z3ik.css-ndethb', el => el.innerHTML);
    //         const picture = await productCard.$eval('picture > img', el => el.getAttribute('src'));
    //         const href = await productCard.$eval('.product-card__link-overlay', el => el.getAttribute('href'));
    //         const gender = Gender.Male;
    //         products.push({ name, priceReduced, priceOriginal, picture, href, gender });
    //       }

    //       Logger.log('Done crawl Men Nike Sale Job at ' + new Date());
    //     } catch (error) {
    //       Logger.log('error:', error);
    //     } finally {
    //       await page.close();
    //     }

    //     // WOMEN
    //     page = await browser.newPage();
    //     try {

    //       await page.goto('https://nike.com/us');

    //       // click to show menu bar
    //       await page.waitFor('#MobileMenuToggle');
    //       await page.click('#MobileMenuToggle');

    //       // click Women button
    //       // tslint:disable-next-line:max-line-length
    //       await page.waitFor('#gen-nav-commerce-header > header > nav.ncss-container.bg-white > section.d-sm-b > div > div.l-mobile-nav.d-lg-h.pt2-sm.pb2-sm > nav > div > div.mobile.menu-panel > ul > li:nth-child(4)');
    //       // tslint:disable-next-line:max-line-length
    //       await page.click('#gen-nav-commerce-header > header > nav.ncss-container.bg-white > section.d-sm-b > div > div.l-mobile-nav.d-lg-h.pt2-sm.pb2-sm > nav > div > div.mobile.menu-panel > ul > li:nth-child(4)');

    //       // get href from Sale button
    //       // tslint:disable-next-line:max-line-length
    //       const salePageHref = await page.$eval('#gen-nav-commerce-header > header > nav.ncss-container.bg-white > section.d-sm-b > div > div.l-mobile-nav.d-lg-h.pt2-sm.pb2-sm > nav > div > div.mobile-menu-panel.is-active > ul > li:nth-child(6) > a', el => el.getAttribute('href'));
    //       await page.goto(salePageHref);
    //       await page.waitFor('#Wall > div > div.header-position.css-iqr4dm');

    //       // tslint:disable-next-line:max-line-length
    //       await page.waitFor('#Wall > div > div.categories.css-mzf2z2.is--mobile > div > div.simplebar-wrapper > div.simplebar-mask > div > div > a:nth-child(1) > div');
    //       // tslint:disable-next-line:max-line-length
    //       const countDiv = await page.$eval('#Wall > div > div.categories.css-mzf2z2.is--mobile > div > div.simplebar-wrapper > div.simplebar-mask > div > div > a:nth-child(1) > div', el => el.innerHTML);
    //       const total = countDiv.replace(/\(|\)/gi, '');
    //       // tslint:disable-next-line:max-line-length
    //       await page.click('#Wall > div > div.categories.css-mzf2z2.is--mobile > div > div.simplebar-wrapper > div.simplebar-mask > div > div > a:nth-child(1)');

    //       // let productCards;
    //       let times = 1;
    //       do {
    //         Logger.log('start', total);
    //         await page.evaluate(async () => {
    //           await new Promise((resolve, reject) => {
    //             let totalHeight = (document.body.scrollHeight > 10000) ? (document.body.scrollHeight - 6000) : 0;
    //             const distance = 100;
    //             const timer = setInterval(() => {
    //               const scrollHeight = document.body.scrollHeight;
    //               window.scrollBy(0, distance);
    //               totalHeight += distance;

    //               if (totalHeight >= scrollHeight) {
    //                 clearInterval(timer);
    //                 resolve();
    //               }
    //             }, 150);
    //           });
    //         });
    //         productCards = await page.$$('#Wall > div > div.results__body > div > main > section > div > div > .product-card__body');
    //         Logger.log('end', productCards.length);
    //       } while (productCards.length < total && 3 > times++);
    //       for (const productCard of productCards) {
    //         const name = await productCard.$eval('.product-card__link-overlay', el => el.innerHTML);
    //         const priceReduced = await productCard.$eval('.css-i260wg', el => el.innerHTML);
    //         const priceOriginal = await productCard.$eval('.css-31z3ik.css-ndethb', el => el.innerHTML);
    //         const picture = await productCard.$eval('picture > img', el => el.getAttribute('src'));
    //         const href = await productCard.$eval('.product-card__link-overlay', el => el.getAttribute('href'));
    //         const gender = Gender.Famale;
    //         products.push({ name, priceReduced, priceOriginal, picture, href, gender });
    //       }

    //       await this.nikeService.clean();
    //       await this.nikeService.createMany(products);

    //       Logger.log('Done crawl Women Nike Sale Job at ' + new Date());
    //     } catch (error) {
    //       Logger.log('error:', error);
    //     } finally {
    //       await page.close();
    //     }

    //     Logger.log('browser is closed:');
    //     await browser.close();
    //   });
    // });

    // ADIDAS
    scheduleJob('*/5 * * * *', () => {
      Logger.log('Start crawl Adidas Sale Job at ' + new Date());
      // tslint:disable-next-line:max-line-length
      launch({ args: ['--no-sandbox', '--unlimited-storage', '--full-memory-crash-report', '--force-gpu-mem-available-mb'] }).then(async browser => {
        let productCards;
        const products = [];

        // MEN
        let page = await browser.newPage();
        try {
          await page.emulate(devices['iPhone X']);
          await page.goto('https://adidas.com/us');
          await page.waitFor(2000);
          // close choose location modal
          const modal = await page.$('#modal-root > div > div > button');
          if (modal) {
            await modal.click();
          }

          // check type web
          // tslint:disable-next-line:max-line-length
          if (await page.$('#app > div > div > div > div > div > div.header___3wNCY.gl-is-sticky > div.header-mobile___2zdY0 > div.left-items___3awh8')) {
            // click menu item
            // tslint:disable-next-line:max-line-length
            await page.click('#app > div > div > div > div > div > div.header___3wNCY.gl-is-sticky > div.header-mobile___2zdY0 > div.left-items___3awh8');
            await page.waitFor(2000);
            // click men menu
            // tslint:disable-next-line:max-line-length
            await page.click('#app > div > div.mobile-navigation___V6YHW.mobile-navigation-enter-done > div > div.items___2OELS.root-page___snWvC > div:nth-child(1)');
            await page.waitFor(2000);
            // click sale menu
            // tslint:disable-next-line:max-line-length
            await page.click('#app > div > div.mobile-navigation___V6YHW.mobile-navigation-enter-done > div:nth-child(2) > div.items___2OELS > div:nth-child(4)');
            await page.waitFor(2000);
            // click shoe menu
            // tslint:disable-next-line:max-line-length
            await page.click('#app > div > div.mobile-navigation___V6YHW.mobile-navigation-enter-done > div:nth-child(3) > div.items___2OELS > a:nth-child(1) > div');
            await page.waitFor(2000);

          } else {
            // click menu item
            // tslint:disable-next-line:max-line-length
            await page.click('#app > div > div > div > div > div > div.header___3wNCY.gl-is-sticky > div.header-mobile.header-mobile___2dQtt > div.mobile-toolbar___1uOy9 > button.mobile_menu_icon___39s4u');
            await page.waitFor(2000);
            // click men menu
            await page.click('#header-mobile_men');
            await page.waitFor(2000);
            // click sale menu
            await page.click('#mob_top_nav_men_sale');
            await page.waitFor(2000);
            // click shoe menu
            await page.click('#mob_top_nav_men_sale > ul > li:nth-child(1)');
            await page.waitFor(2000);

          }

          await page.evaluate(async () => {
            await new Promise((resolve, reject) => {
              let totalHeight = 0;
              const distance = 100;
              const timer = setInterval(() => {
                const scrollHeight = 7600;
                window.scrollBy(0, distance);
                totalHeight += distance;
                if (totalHeight >= scrollHeight) {
                  clearInterval(timer);
                  resolve();
                }
              }, 100);
            });
          });
          await page.waitFor(2000);
          productCards = await page.$$('.gl-product-card.glass-product-card___1PGiI');
          for (const productCard of productCards) {
            if ((await productCard.$$('.gl-product-card__details-main > div:nth-child(2) > span')).length === 2) {
              const name = await productCard.$eval('.gl-product-card__name.gl-label.gl-label--m', el => el.innerHTML);
              // tslint:disable-next-line:max-line-length
              const priceReduced = await productCard.$eval('.gl-product-card__details-main > div:nth-child(2) > span:nth-child(1)', el => el.innerHTML);
              // tslint:disable-next-line:max-line-length
              const priceOriginal = await productCard.$eval('.gl-product-card__details-main > div:nth-child(2) > span:nth-child(2)', el => el.innerHTML);
              const picture = await productCard.$eval('.gl-product-card__image', el => el.getAttribute('src'));
              const href = 'https://adidas.com' + await productCard.$eval('a', el => el.getAttribute('href'));
              const gender = Gender.Male;
              products.push({ name, priceReduced, priceOriginal, picture, href, gender });
            }
          }

          do {
            // tslint:disable-next-line:no-shadowed-variable
            const modal = await page.$('#modal-root > div > div > button');
            if (modal) {
              await modal.click();
            }
            // tslint:disable-next-line:max-line-length
            await page.click('#app > div > div > div > div > div.plp-page___1UWVZ > div > div:nth-child(3) > div > div > div.col-s-12.col-l-17.col-xl-18.no-gutters-s > div.container > div > div > div > div.pagination__control___3C268.pagination__control--next___329Qo > a');
            await page.evaluate(async () => {
              await new Promise((resolve, reject) => {
                let totalHeight = 0;
                const distance = 100;
                const timer = setInterval(() => {
                  const scrollHeight = 7600;
                  window.scrollBy(0, distance);
                  totalHeight += distance;
                  if (totalHeight >= scrollHeight) {
                    clearInterval(timer);
                    resolve();
                  }
                }, 100);
              });
            });
            await page.waitFor(2000);
            productCards = await page.$$('.gl-product-card.glass-product-card___1PGiI');
            for (const productCard of productCards) {
              if ((await productCard.$$('.gl-product-card__details-main > div:nth-child(2) > span')).length === 2) {
                const name = await productCard.$eval('.gl-product-card__name.gl-label.gl-label--m', el => el.innerHTML);
                // tslint:disable-next-line:max-line-length
                const priceReduced = await productCard.$eval('.gl-product-card__details-main > div:nth-child(2) > span:nth-child(1)', el => el.innerHTML);
                // tslint:disable-next-line:max-line-length
                const priceOriginal = await productCard.$eval('.gl-product-card__details-main > div:nth-child(2) > span:nth-child(2)', el => el.innerHTML);
                const picture = await productCard.$eval('.gl-product-card__image', el => el.getAttribute('src'));
                const href = 'https://adidas.com' + await productCard.$eval('a', el => el.getAttribute('href'));
                const gender = Gender.Male;
                products.push({ name, priceReduced, priceOriginal, picture, href, gender });
              }
            }
            // tslint:disable-next-line:max-line-length
          } while (await page.$('#app > div > div > div > div > div.plp-page___1UWVZ > div > div:nth-child(3) > div > div > div.col-s-12.col-l-17.col-xl-18.no-gutters-s > div.container > div > div > div > div.pagination__control___3C268.pagination__control--next___329Qo > a'));

          Logger.log('Done crawl Men Adidas Sale Job at ' + new Date());
        } catch (error) {
          Logger.log('error:', error);
        } finally {
          await page.close();
        }

        // WOMEN
        page = await browser.newPage();
        try {

          await page.goto('https://adidas.com/us');
          await page.waitFor(2000);
          // close choose location modal
          const modal = await page.$('#modal-root > div > div > button');
          if (modal) {
            await modal.click();
          }

          // check type web
          // tslint:disable-next-line:max-line-length
          if (await page.$('#app > div > div > div > div > div > div.header___3wNCY.gl-is-sticky > div.header-mobile___2zdY0 > div.left-items___3awh8')) {
            // click menu item
            // tslint:disable-next-line:max-line-length
            await page.click('#app > div > div > div > div > div > div.header___3wNCY.gl-is-sticky > div.header-mobile___2zdY0 > div.left-items___3awh8');
            await page.waitFor(2000);
            // click men menu
            // tslint:disable-next-line:max-line-length
            await page.click('#app > div > div.mobile-navigation___V6YHW.mobile-navigation-enter-done > div > div.items___2OELS.root-page___snWvC > div:nth-child(2)');
            await page.waitFor(2000);
            // click sale menu
            // tslint:disable-next-line:max-line-length
            await page.click('#app > div > div.mobile-navigation___V6YHW.mobile-navigation-enter-done > div:nth-child(2) > div.items___2OELS > div:nth-child(4)');
            await page.waitFor(2000);
            // click shoe menu
            // tslint:disable-next-line:max-line-length
            await page.click('#app > div > div.mobile-navigation___V6YHW.mobile-navigation-enter-done > div:nth-child(3) > div.items___2OELS > a:nth-child(1) > div');
            await page.waitFor(2000);

          } else {
            // click menu item
            // tslint:disable-next-line:max-line-length
            await page.click('#app > div > div > div > div > div > div.header___3wNCY.gl-is-sticky > div.header-mobile.header-mobile___2dQtt > div.mobile-toolbar___1uOy9 > button.mobile_menu_icon___39s4u');
            await page.waitFor(2000);
            // click men menu
            await page.click('#header-mobile_women');
            await page.waitFor(2000);
            // click sale menu
            await page.click('#mob_top_nav_women_sale');
            await page.waitFor(2000);
            // click shoe menu
            await page.click('#mob_top_nav_women_sale > ul > li:nth-child(1)');
            await page.waitFor(2000);

          }

          await page.evaluate(async () => {
            await new Promise((resolve, reject) => {
              let totalHeight = 0;
              const distance = 100;
              const timer = setInterval(() => {
                const scrollHeight = 7600;
                window.scrollBy(0, distance);
                totalHeight += distance;
                if (totalHeight >= scrollHeight) {
                  clearInterval(timer);
                  resolve();
                }
              }, 100);
            });
          });
          await page.waitFor(2000);
          productCards = await page.$$('.gl-product-card.glass-product-card___1PGiI');
          for (const productCard of productCards) {
            if ((await productCard.$$('.gl-product-card__details-main > div:nth-child(2) > span')).length === 2) {
              const name = await productCard.$eval('.gl-product-card__name.gl-label.gl-label--m', el => el.innerHTML);
              // tslint:disable-next-line:max-line-length
              const priceReduced = await productCard.$eval('.gl-product-card__details-main > div:nth-child(2) > span:nth-child(1)', el => el.innerHTML);
              // tslint:disable-next-line:max-line-length
              const priceOriginal = await productCard.$eval('.gl-product-card__details-main > div:nth-child(2) > span:nth-child(2)', el => el.innerHTML);
              const picture = await productCard.$eval('.gl-product-card__image', el => el.getAttribute('src'));
              const href = 'https://adidas.com' + await productCard.$eval('a', el => el.getAttribute('href'));
              const gender = Gender.Famale;
              products.push({ name, priceReduced, priceOriginal, picture, href, gender });
            }
          }

          do {
            // tslint:disable-next-line:no-shadowed-variable
            const modal = await page.$('#modal-root > div > div > button');
            if (modal) {
              await modal.click();
            }
            // tslint:disable-next-line:max-line-length
            await page.click('#app > div > div > div > div > div.plp-page___1UWVZ > div > div:nth-child(3) > div > div > div.col-s-12.col-l-17.col-xl-18.no-gutters-s > div.container > div > div > div > div.pagination__control___3C268.pagination__control--next___329Qo > a');
            await page.evaluate(async () => {
              await new Promise((resolve, reject) => {
                let totalHeight = 0;
                const distance = 100;
                const timer = setInterval(() => {
                  const scrollHeight = 7600;
                  window.scrollBy(0, distance);
                  totalHeight += distance;
                  if (totalHeight >= scrollHeight) {
                    clearInterval(timer);
                    resolve();
                  }
                }, 100);
              });
            });
            await page.waitFor(2000);
            productCards = await page.$$('.gl-product-card.glass-product-card___1PGiI');
            for (const productCard of productCards) {
              if ((await productCard.$$('.gl-product-card__details-main > div:nth-child(2) > span')).length === 2) {
                const name = await productCard.$eval('.gl-product-card__name.gl-label.gl-label--m', el => el.innerHTML);
                // tslint:disable-next-line:max-line-length
                const priceReduced = await productCard.$eval('.gl-product-card__details-main > div:nth-child(2) > span:nth-child(1)', el => el.innerHTML);
                // tslint:disable-next-line:max-line-length
                const priceOriginal = await productCard.$eval('.gl-product-card__details-main > div:nth-child(2) > span:nth-child(2)', el => el.innerHTML);
                const picture = await productCard.$eval('.gl-product-card__image', el => el.getAttribute('src'));
                const href = 'https://adidas.com' + await productCard.$eval('a', el => el.getAttribute('href'));
                const gender = Gender.Famale;
                products.push({ name, priceReduced, priceOriginal, picture, href, gender });
              }
            }
            // tslint:disable-next-line:max-line-length
          } while (await page.$('#app > div > div > div > div > div.plp-page___1UWVZ > div > div:nth-child(3) > div > div > div.col-s-12.col-l-17.col-xl-18.no-gutters-s > div.container > div > div > div > div.pagination__control___3C268.pagination__control--next___329Qo > a'));
          await this.adidasService.clean();
          await this.adidasService.createMany(products);
          Logger.log('Done crawl Women Adidas Sale Job at ' + new Date());
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
