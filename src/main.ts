import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import * as helmet from 'helmet';
// import * as csurf from 'csurf';
import * as rateLimit from 'express-rate-limit';
import { ProfileModule } from './profile/profile.module';
import { getRepository } from 'typeorm';
import { User } from './user/user.entity';
import { Profile } from './profile/profile.entity';
import { UserRole, Gender } from './common/constants';
import { CategoryModule } from './category/category.module';
import { AddressModule } from './address/address.module';
import { ProductModule } from './product/product.module';
import { SwatchModule } from './swatch/swatch.module';
import { ProductDetailModule } from './product_detail/productDetail.module';
import { StockModule } from './stock/stock.module';
import { OrderModule } from './order/order.module';
import { OrderDetailModule } from './order_detail/orderDetail.module';
import { InvoiceModule } from './invoice/invoice.module';
import { scheduleJob } from 'node-schedule';
import { launch } from 'puppeteer';
import { writeJSON, readdirSync, remove, ensureDirSync } from 'fs-extra';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });
    const port = process.env.PORT || 3000;
    const userRepository = getRepository(User);
    const adminUser = await userRepository.findOne({ email: 'tamphan91@gmail.com' });
    if (!adminUser) {
        const profileRepository = getRepository(Profile);
        // tslint:disable-next-line:max-line-length
        const adminProfileToSave = profileRepository.create({ firstName: 'tam', lastName: 'phan', gender: Gender.Male, dateOfBirth: '1991-10-04', roles: [UserRole.Admin, UserRole.Moderator, UserRole.User] });
        const adminProfileReturn = await profileRepository.save(adminProfileToSave);
        const adminUserToSave = userRepository.create({ email: 'tamphan91@gmail.com', password: '123', profileId: adminProfileReturn.id });
        await userRepository.save(adminUserToSave);
        Logger.log('Inited admin user successfull!');
    }
    // const stock = await getRepository(Stock).findOne({id: 1}, {relations: ['productDetail', 'productDetail.product']});
    // // tslint:disable-next-line:no-console
    // console.log('originalPrice: ', stock.productDetail.product.originalPrice);
    // // tslint:disable-next-line:no-console
    // console.log('discountPercent: ', stock.productDetail.discountPercent);

    let times = 1;
    // scheduleJob('* * * * *', () => {
    const atTimes = times++;
    Logger.log('Start crawl Nike Sale Job at ' + new Date() + ` - ${atTimes}`);
    launch({ args: ['--no-sandbox', '--unlimited-storage', '--full-memory-crash-report'] }).then(async browser => {
        const page = await browser.newPage();
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

            let productCards;
            // do {
            Logger.log('start', total);
                // await page.evaluate(async () => {
                //     await new Promise((resolve, reject) => {
                //         let totalHeight = (document.body.scrollHeight > 10000) ? (document.body.scrollHeight - 6000) : 0;
                //         const distance = 100;
                //         const timer = setInterval(() => {
                //             const scrollHeight = document.body.scrollHeight;
                //             window.scrollBy(0, distance);
                //             totalHeight += distance;

                //             if (totalHeight >= scrollHeight) {
                //                 clearInterval(timer);
                //                 resolve();
                //             }
                //         }, 150);
                //     });
                // });
            productCards = await page.$$('#Wall > div > div.results__body > div > main > section > div > div > .product-card__body');
            Logger.log('end', productCards.length);
            // } while (productCards.length < total);
            const products = [];
            for (const productCard of productCards) {
                const name = await productCard.$eval('.product-card__link-overlay', el => el.innerHTML);
                const priceReduced = await productCard.$eval('.css-i260wg', el => el.innerHTML);
                const priceOriginal = await productCard.$eval('.css-31z3ik.css-ndethb', el => el.innerHTML);
                const picture = await productCard.$eval('picture > img', el => el.getAttribute('src'));
                const href = await productCard.$eval('.product-card__link-overlay', el => el.getAttribute('href'));
                products.push({ name, priceReduced, priceOriginal, picture, href });
            }
            const path = process.env.NIKE_SALE_PATH;
            ensureDirSync(path);
            const directories = readdirSync(path);
            if (directories.length > 5) {
                const exceptTop5Files = directories.slice(0, directories.length - 5);
                exceptTop5Files.forEach(element => {
                    remove(path + '/' + element);
                });
            }
            writeJSON(path + '/' + new Date().getTime() + '.json', products);

            Logger.log('Done crawl Nike Sale Job at ' + new Date() + ` - ${atTimes}`);
        } catch (error) {
            Logger.log('error:', error);
        } finally {
            Logger.log('browser is closed:');
            await page.close();
            await browser.close();
        }
    });
    // });

    /**
     * createDocument(application, configurationOptions, extraOptions);
     *
     * createDocument method takes in an optional 3rd argument "extraOptions"
     * which is an object with "include" property where you can pass an Array
     * of Modules that you want to include in that Swagger Specification
     * E.g: CatsModule and DogsModule will have two separate Swagger Specifications which
     * will be exposed on two different SwaggerUI with two different endpoints.
     */

    const schema = process.env.SWAGGER_SCHEMA === 'https' ? 'https' : 'http';

    const options = new DocumentBuilder()
        .setTitle('Tapha api')
        .setDescription('The taphas API description')
        .setSchemes(schema)
        .setVersion('v36')
        .addBearerAuth()
        .build();

    const authDocument = SwaggerModule.createDocument(app, options, {
        include: [AuthModule, UserModule, ProfileModule, CategoryModule, ProductModule, AddressModule,
            SwatchModule, ProductDetailModule, StockModule, OrderModule, OrderDetailModule, InvoiceModule],
    });
    SwaggerModule.setup('api', app, authDocument);

    // const secondOptions = new DocumentBuilder()
    //   .setTitle('Roles example')
    //   .setDescription('The roles API description')
    //   .setVersion('1.0')
    //   .setSchemes(schema)
    //   .build();

    // const roleDocument = SwaggerModule.createDocument(app, secondOptions, {
    //   include: [RoleModule],
    // });
    // SwaggerModule.setup('api/roles', app, roleDocument);

    // const userOptions = new DocumentBuilder()
    //   .setTitle('Users example')
    //   .setDescription('The users API description')
    //   .setVersion('1.0')
    //   .setSchemes(schema)
    //   .build();

    // const userDocument = SwaggerModule.createDocument(app, userOptions, {
    //   include: [UserModule],
    // });
    // SwaggerModule.setup('api/users', app, userDocument);

    // const roleToUserOptions = new DocumentBuilder()
    //   .setTitle('RoleToUser example')
    //   .setDescription('The RoleToUser API description')
    //   .setSchemes(schema)
    //   .setVersion('1.0')
    //   .build();

    // const roleToUserDocument = SwaggerModule.createDocument(app, roleToUserOptions, {
    //   include: [RoleToUserModule],
    // });
    // SwaggerModule.setup('api/roleToUser', app, roleToUserDocument);

    app.use(helmet());
    app.use(
        rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 100, // limit each IP to 100 requests per windowMs
        }),
    );
    app.useGlobalPipes(new ValidationPipe());
    // app.use(csurf());
    await app.listen(port);
    Logger.log('The server is running in port ' + port, 'Bootstrap');
}
bootstrap();
