import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, 
      forbidNonWhitelisted: true, 
      transform: true
    }),
  );

    // configuracion de swagger
    const config = new DocumentBuilder()
    .setTitle('API usuarios challenge')
    .setDescription('Documentación de la API de usuarios para el challenge de NestJS para la empresa Global Think Technology')
    .setVersion('1.0')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); 


  await app.listen(process.env.PORT ?? 3000);
  console.log('🚀 Servidor corriendo en http://localhost:3000');
  console.log('📝 Documentacion de API en http://localhost:3000/api');
}
bootstrap();
