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

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const port = process.env.PORT || 3000;
  const userRepository = getRepository(User);
  const adminUser = await userRepository.findOne({email: 'tamphan91@gmail.com'});
  if (!adminUser) {
    const profileRepository = getRepository(Profile);
    // tslint:disable-next-line:max-line-length
    const adminProfileToSave = profileRepository.create({firstName: 'tam', lastName: 'phan', gender: Gender.Male, dateOfBirth: '1991-10-04', roles: [UserRole.Admin, UserRole.Moderator, UserRole.User]});
    const adminProfileReturn = await profileRepository.save(adminProfileToSave);
    const adminUserToSave  = userRepository.create({email: 'tamphan91@gmail.com', password: '123', profileId: adminProfileReturn.id});
    await userRepository.save(adminUserToSave);
    Logger.log('Inited admin user successfull!');
  }
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
    .setTitle('Tapha example')
    .setDescription('The taphas API description')
    .setSchemes(schema)
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const authDocument = SwaggerModule.createDocument(app, options, {
    include: [AuthModule, UserModule, ProfileModule],
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
