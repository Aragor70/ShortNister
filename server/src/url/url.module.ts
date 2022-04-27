import { Module } from '@nestjs/common';
import { UrlService } from './services/url/url.service';
import { UrlController } from './controllers/url/url.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlEntity } from './models/url.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
        UrlEntity
    ])
],
  providers: [UrlService],
  controllers: [UrlController],
  exports: [UrlService]
})
export class UrlModule {}
