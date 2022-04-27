import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouterModule } from 'nest-router';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { routes } from './routes';
import { UrlModule } from './url/url.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RouterModule.forRoutes(routes),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
      port: 5432,
      username: process.env.PSQL_USERNAME,
      password: process.env.PSQL_PASSWORD,
      database: process.env.PSQL_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    UrlModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
