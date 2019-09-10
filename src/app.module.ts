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
import { DetailModule } from './detail/detail.module';

@Module({
  imports: [
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
    AuthModule, UserModule, ProfileModule, CategoryModule, ProductModule, AddressModule, SwatchModule, DetailModule],
  controllers: [AppController, ProfileController],
  providers: [AppService],
})
export class AppModule {}
