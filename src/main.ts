import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './middleware/logger.middleware';
import * as express from 'express';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { AnyExceptionFilter } from './filter/any-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.json()); // application/json
  app.use(express.urlencoded({ extended: true })); // application/x-www-form-urlencoded
  // 
  app.use(logger);
  // 使用全局拦截器打印出参
  app.useGlobalInterceptors(new TransformInterceptor());
  // 
  app.useGlobalFilters(new AnyExceptionFilter());
  // 过滤出来http异常
  app.useGlobalFilters(new HttpExceptionFilter());
  app.setGlobalPrefix('dt')
  await app.listen(3000);
}
bootstrap();
