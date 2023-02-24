import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { produitsWS } from '../../resource/produit.data';

@Injectable()
export class BackendInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.method === 'GET' && request.url === 'produits') {
      return of(new HttpResponse({ status: 200, body: produitsWS }));
    }
    return next.handle(request);
  }
}
