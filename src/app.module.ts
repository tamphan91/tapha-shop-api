import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import 'dotenv/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoModule } from './photo/photo.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ec2-174-129-227-128.compute-1.amazonaws.com',
      port: 5432,
      username: 'dcnemggtczuvnc',
      password: 'dd0f568d1aa0f976d1b206a8c1597c722c1d77bb492dc8fe95a9e5722378a480',
      database: 'd7meov6tdkbfae',
      // entities: ['./src/**/*.entity.ts", "./dist/**/*.entity.ts'],
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
      ssl: true,
    }),
    AuthModule, UsersModule, PhotoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
