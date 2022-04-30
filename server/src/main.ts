require('dotenv').config({ path: 'config/config.env' })

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import * as fs from 'fs';
import * as morgan from 'morgan';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './http-exception.filter';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { join } from 'path';

const logStream = fs.createWriteStream('api.log', {
  flags: 'a', // append
});

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(),);
  app.enableCors();
  //app.setGlobalPrefix('api');
  app.setViewEngine({
    engine: {
      handlebars: require('handlebars'),
    },
  });
  

  app.useGlobalPipes(new ValidationPipe());
  
  app.use(morgan('tiny', { stream: logStream }));

  app.useGlobalFilters(new HttpExceptionFilter)

  await app.listen(process.env.PORT || 5000);

  const server = await app.getHttpServer();
  const router = await server._events.request._router;

  const availableRoutes: [] = await router.stack
    .map((layer: any) => {
      if (layer.route) {
        return {
          route: {
            path: layer.route?.path,
            method: layer.route?.stack[0].method,
          },
        };
      }
    })
    .filter((item: any) => item !== undefined);
  console.log(availableRoutes);
  
}
bootstrap();
