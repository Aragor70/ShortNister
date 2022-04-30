import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, NotFoundException, Render, Res } from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {

    let response = host.switchToHttp().getResponse();
    let status = (exception instanceof HttpException) ? exception.getStatus(): HttpStatus.INTERNAL_SERVER_ERROR;


    return response.view('views/404.hbs', { 
      headline: "Something's wrong here.",
      
    
    })


  }
}
