import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { customAlphabet } from 'nanoid';
import { from, map, Observable, of, switchMap, tap } from 'rxjs';
import { Url } from 'src/url/models/url.class';
import { UrlEntity } from 'src/url/models/url.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UrlService {

    constructor(
        @InjectRepository(UrlEntity)
            private readonly urlRepository: Repository<Url>,
        ) {}

        findOneByCode(code: string): Observable<Url> {
            return from(
                this.urlRepository.findOne({ urlCode: code }),
            )
        }

        getList(): Observable<Url[]> {

            return from(this.urlRepository.find()).pipe(

                map((url: Url[]) => {
                    return url;
                })
            )
            
        }


        doesUrlExist(shortUrl: string): Observable<boolean> {
            return from(this.urlRepository.findOne({ shortUrl })).pipe(
                switchMap((url: any) => {
                  return of(!!url);
                }),
            )
        }
        
        registerUrl(url: any): Observable<Url> {
            const { longUrl, customCode } = url;

            let shortCode: string;


            let newAddress: string;


            return from(this.doesUrlExist(shortCode)).pipe(

                tap((doesUrlExist: boolean) => {
                    if (doesUrlExist)
                      throw new HttpException(
                        'An url has already been created with this code. Please enter the new one.',
                        HttpStatus.BAD_REQUEST,
                    );
                }),

                tap(() => {

                    if (customCode) {

                        shortCode = customCode

                        if (!customCode.match(/^[0-9a-zA-Z]+$/)) {
                            throw new HttpException(
                                'Please enter alphanumeric value.',
                                HttpStatus.BAD_REQUEST,)
                        }

                    } else {

                        const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIKLMNOPQRSTVXYZ", 6);
                
                        shortCode = nanoid();

                    }
                    

                }),

                switchMap(() => {
        
                    
                    newAddress = process.env.Base_Url + shortCode

                    return from(
                        
                        this.urlRepository.save({
                            urlCode: shortCode,
                            longUrl,
                            shortUrl: newAddress
                        })

                    ).pipe(
                      map((url: Url) => {
                        return url;
                      })
                    );

                }),

            )

        }
    }