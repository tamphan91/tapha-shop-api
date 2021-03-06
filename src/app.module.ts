import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ProfileController } from './profile/profile.controller';
import { ProfileModule } from './profile/profile.module';
import 'dotenv/config';
import { CategoryModule } from './category/category.module';
import { AddressModule } from './address/address.module';
import { ProductModule } from './product/product.module';
import { SwatchModule } from './swatch/swatch.module';
import { ProductDetailModule } from './product_detail/productDetail.module';
import { StockModule } from './stock/stock.module';
import { OrderModule } from './order/order.module';
import { OrderDetailModule } from './order_detail/orderDetail.module';
import { InvoiceModule } from './invoice/invoice.module';
import { MongooseModule } from '@nestjs/mongoose';
import { NikesModule } from './nike/nikes.module';
import { AdidasModule } from './adidas/adidas.module';
import { EventsModule } from './events/events.module';
import { ChatModule } from './chat/chat.module';
import { GraphQLModule } from '@nestjs/graphql';
import { RecipesModule } from './recipes/recipes.module';
import { NikeModule } from './nike-graphql/nike.module';
import { ConfigModule } from './config/config.module';
import { HandlebarsAdapter, MailerModule } from '@nest-modules/mailer';
import { ConfigService } from './config/config.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, null),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.DB_SYNCHRONIZE.toLocaleLowerCase() === 'true',
      logging: true,
      ssl: true,
    }),
    MailerModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        transport: configService.transport,
        defaults: {
          from: '"tapha-shop" <noreply@tapha-shop.com>',
        },
        template: {
          dir: __dirname + '/../templates',
          adapter: new HandlebarsAdapter(), // or new PugAdapter()
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
    // tslint:disable-next-line:max-line-length
    MongooseModule.forRoot('mongodb+srv://tamphan91:5ba7bay5ba@sale-wqeq8.mongodb.net/mydb?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }),
    AuthModule, UserModule, ProfileModule, CategoryModule, ProductModule, AddressModule, EventsModule, ChatModule,
    RecipesModule, NikeModule,
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
      introspection: true,
      playground: true,
    }),
    SwatchModule, ProductDetailModule, StockModule, OrderModule, OrderDetailModule, InvoiceModule, NikesModule, AdidasModule],
  controllers: [AppController, ProfileController],
  providers: [AppService],
})
export class AppModule { }
