import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api');
  await app.listen(3030);

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

  app.enableCors({
    origin: '*',
    allowedHeaders: '*',
  });
}
bootstrap();
