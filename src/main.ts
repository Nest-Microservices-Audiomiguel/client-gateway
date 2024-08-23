import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config/envs';
import { Logger, ValidationPipe } from '@nestjs/common';
import { CustomRcpExceptionFilter } from './common/exceptions';

async function bootstrap() {
  const logger = new Logger('Main-Gateway');
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  app.useGlobalFilters(new CustomRcpExceptionFilter());

  await app.listen(envs.port);

  logger.log(`Gateway running on port: ${envs.port}`);
}
bootstrap();
