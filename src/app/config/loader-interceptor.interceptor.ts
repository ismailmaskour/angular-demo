import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
const TOKEN_HEADER_KEY = "Authorization";
@Injectable()
export class LoaderInterceptorInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Add your token logic here
    const token = getToken();

    let headers = request.headers.set(
      "Authorization",
      `Bearer ${token}`,
    )
    // Clone the request and add the token to the headers
    const modifiedRequest = request.clone({
      headers: headers
    });

    // Pass the modified request to the next interceptor or the backend
    return next.handle(modifiedRequest);

  }
}
function getToken() {
  return sessionStorage.getItem("AuthToken");
}

