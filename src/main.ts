import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { RoleModule } from './role/role.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RoleToUserModule } from './role_user/role_user.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;

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
    .setTitle('Auth example')
    .setDescription('The cats API description')
    .setSchemes(schema)
    .setVersion('1.0')
    .build();

  const authDocument = SwaggerModule.createDocument(app, options, {
    include: [AuthModule],
  });
  SwaggerModule.setup('api', app, authDocument);

  const secondOptions = new DocumentBuilder()
    .setTitle('Roles example')
    .setDescription('The roles API description')
    .setVersion('1.0')
    .setSchemes(schema)
    .build();

  const roleDocument = SwaggerModule.createDocument(app, secondOptions, {
    include: [RoleModule],
  });
  SwaggerModule.setup('api/roles', app, roleDocument);

  const userOptions = new DocumentBuilder()
    .setTitle('Users example')
    .setDescription('The users API description')
    .setVersion('1.0')
    .setSchemes(schema)
    .build();

  const userDocument = SwaggerModule.createDocument(app, userOptions, {
    include: [UserModule],
  });
  SwaggerModule.setup('api/users', app, userDocument);

  const roleToUserOptions = new DocumentBuilder()
    .setTitle('RoleToUser example')
    .setDescription('The RoleToUser API description')
    .setSchemes(schema)
    .setVersion('1.0')
    .build();

  const roleToUserDocument = SwaggerModule.createDocument(app, roleToUserOptions, {
    include: [RoleToUserModule],
  });
  SwaggerModule.setup('api/role_to_user', app, roleToUserDocument);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
  Logger.log('The server is running in port ' + port, 'Bootstrap');
}
bootstrap();
