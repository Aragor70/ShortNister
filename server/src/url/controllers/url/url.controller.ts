import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Req, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { from, Observable } from 'rxjs';
import { Url } from 'src/url/models/url.class';
import { UrlEntity } from 'src/url/models/url.entity';
import { UrlService } from 'src/url/services/url/url.service';
import { Repository } from 'typeorm';

@Controller('url')
export class UrlController {
  constructor(
    @InjectRepository(UrlEntity)
    private readonly urlRepository: Repository<UrlEntity>,
    private urlService: UrlService,  
  ) {}

  @Get('')
  getTopThree(): Observable<Url[]> {
    return this.urlService.getList();
  }

  @Get(':code')
  findOneByCode(@Param('code') code: string): Observable<Url> {
    return this.urlService.findOneByCode(code);
  }

  @Post('')
  register(@Body() url: any, @Req() req: Request): Observable<Url> {
    return this.urlService.registerUrl(url, req);
  }
}