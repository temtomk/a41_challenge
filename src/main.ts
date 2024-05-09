import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RedocModule } from '@jozefazz/nestjs-redoc';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Api spec docs')
    .setDescription('For getting api spec docs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config, {});
  await RedocModule.setup('api-docs', app, document, {
    sortPropsAlphabetically: false,
  });

  await app.listen(3000);
}
bootstrap();
