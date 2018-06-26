import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

/**
 * token interceptor
 * to implement http header with token
 * in all http requests
 */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    intercept( request: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
        if ( localStorage.getItem('auth') !== null ) {
            // JSON.parse error handling
            let auth;
            try {
                // Get the auth token
                auth = JSON.parse(localStorage.getItem('auth'));
            } catch (e) {
                auth = null;
                console.log('Problem with auth');
                return next.handle(request);
            }
            // Clone the request and replace the original headers with
            // cloned headers, updated with the authorization.
            request = request.clone({
                setHeaders: {
                    Authorization: auth['token']
                }
            });
        }
        // send cloned request with header
        return next.handle( request );
    }
}
