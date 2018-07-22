import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse,
    HttpProgressEvent, HttpResponse, HttpUserEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable()
export class RequestInterceptorService implements HttpInterceptor {

    isRefreshingToken: boolean = false;
    tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    constructor(private authService: AuthService) {}

    addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
        if (this.authService.checkCredentials()) {
            return req.clone({ setHeaders: { Authorization: 'Bearer ' + token }});
        }
        return req;
    }

    intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {

        return next.handle(this.addToken(req, this.authService.getAuthToken()))
            .catch(error => {
                if (error instanceof HttpErrorResponse) {
                    switch (error.status) {
                        case 400:
                            return this.handle400Error(error);
                        case 401:
                            return this.handle401Error(req, next);
                        default:
                            console.log('ERROR');
                            console.log(error);
                            return this.handle400Error(error);
                    }
                } else {
                    return Observable.throw(error);
                }
            });
    }

    handle400Error(error) {
        if (error && error.status === 400 && error.error && error.error.error === 'invalid_grant') {
            // If we get a 400 and the error message is 'invalid_grant', the token is no longer valid so logout.
            return this.logoutUser();
        }

        return Observable.throw(error);
    }

    handle401Error(req: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshingToken) {
            this.isRefreshingToken = true;

            // Reset here so that the following requests wait until the token
            // comes back from the refreshToken call.
            this.tokenSubject.next(null);

            return this.authService.refreshToken()
                .switchMap((newToken: string) => {
                    if (newToken) {
                        this.tokenSubject.next(newToken);
                        return next.handle(this.addToken(req, newToken));
                    }

                    // If we don't get a new token, we are in trouble so logout.
                    return this.logoutUser();
                })
                .catch(error => {
                    // If there is an exception calling 'refreshToken', bad news so logout.
                    return this.logoutUser();
                })
                .finally(() => {
                    this.isRefreshingToken = false;
                });
        } else {
            return this.tokenSubject
                .filter(token => token != null)
                .take(1)
                .switchMap(token => {
                    return next.handle(this.addToken(req, token));
                });
        }
    }

    logoutUser() {
        // Route to the login page (implementation up to you)
        this.authService.logout();
        return Observable.throw('');
    }
}
