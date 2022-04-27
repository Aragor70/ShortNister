import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { from, Observable, tap } from 'rxjs';
import { UrlService } from './url/services/url/url.service';

@Controller('')
export class AppController {
  constructor(
    private readonly urlService: UrlService
  ) {}


  @Get(':code')
  redirectToUrl(
    @Param('code') code: string,
    @Res() res: any,
  ): Observable<Response> {
    return from(this.urlService.findOneByCode(code)).pipe(

      tap((value: any) => {

        if (!value)
          return res.redirect(HttpStatus.PERMANENT_REDIRECT, process.env.Base_Url);

        return res.redirect(HttpStatus.PERMANENT_REDIRECT, value.longUrl);

      })
    );
  }
}
