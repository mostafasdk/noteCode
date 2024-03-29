import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { PopupService } from '../services/popup.service';

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {

  constructor(private popupService: PopupService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (typeof(error.error) === 'string') {
          this.popupService.pushPopup({
            message: error.error,
            type: 'error',
            autoCloseable: true
          })
        } else if (error.status >= 500) {
          this.popupService.pushPopup({
            message: 'Servor error.',
            type: 'error',
            autoCloseable: true
          })
        } else {
          this.popupService.pushPopup({
            message: error.message,
            type: 'error',
            autoCloseable: true
          })
        }

        return throwError(() => error);
      })
    );
  }
}
