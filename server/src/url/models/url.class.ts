import { IsEmail, IsUrl } from 'class-validator';

export class Url {
  


  id?: number;

  author?: string;

  urlCode?: string;

  @IsUrl()
  longUrl: string;
  
  @IsUrl()
  shortUrl: string;

  views?: string;

  lastVisit?: string;

  date?: Date;
}